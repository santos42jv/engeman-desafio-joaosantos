import { useState, useEffect } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { api } from "../../services/api";
import type { PropertyData } from "../../interfaces/property-data";

const CLOUDINARY_CLOUD_NAME = "dqud4llho";
const CLOUDINARY_UPLOAD_PRESET = "teste-up-img";

const propertySchema = z.object({
  name: z
    .string()
    .min(10, "Nome deve ter no mínimo 10 caracteres.")
    .max(100, "Nome deve ter no máximo 100 caracteres."),
  description: z.string().min(1, "Descrição é obrigatória."),
  type: z.string().min(1, "Tipo é obrigatório."),
  value: z.coerce.number().positive("Valor deve ser positivo."),
  area: z.coerce.number().positive("Área deve ser positiva."),
  bedrooms: z.coerce.number().positive("Quartos deve ser positivo."),
  address: z.string().min(1, "Endereço é obrigatório."),
  city: z.string().min(1, "Cidade é obrigatória."),
  state: z
    .string()
    .min(2, "UF é obrigatório.")
    .max(2, "Use a sigla do estado (ex: SP)."),
});

export type PropertyFormData = z.infer<typeof propertySchema>;

interface UsePropertyFormProps {
  initialData?: PropertyData | null;
  onSave: () => void;
}

export const usePropertyForm = ({
  initialData,
  onSave,
}: UsePropertyFormProps) => {
  const isEditing = !!initialData;

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema) as Resolver<PropertyFormData>,
    defaultValues: {
      type: "CASA",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        description: initialData.description,
        type: initialData.type,
        value: initialData.value,
        area: initialData.area,
        bedrooms: initialData.bedrooms,
        address: initialData.address,
        city: initialData.city,
        state: initialData.state,
      });
      setImageUrls(
        initialData.imageUrls
          ? initialData.imageUrls
              .split(",")
              .map((u) => u.trim())
              .filter(Boolean)
          : [],
      );
    } else {
      reset({ type: "CASA" });
      setImageUrls([]);
    }
    setImageError(null);
    setSubmitError(null);
  }, [initialData, reset]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    setIsUploading(true);
    const uploaded: string[] = [];

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          { method: "POST", body: formData },
        );

        if (!res.ok) throw new Error("Falha no upload");
        const data = await res.json();
        uploaded.push(data.secure_url as string);
      }

      setImageUrls((prev) => [...prev, ...uploaded]);
      setImageError(null);
    } catch (err) {
      console.error("Erro no upload:", err);
      setImageError("Falha ao enviar imagem. Tente novamente.");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: PropertyFormData) => {
    if (imageUrls.length === 0) {
      setImageError("Adicione ao menos uma imagem.");
      return;
    }

    setSubmitError(null);
    setIsSaving(true);

    const payload = {
      ...data,
      state: data.state.toUpperCase(),
      imageUrls: imageUrls.join(","),
    };

    try {
      if (isEditing) {
        await api.put(`/api/property/${initialData!.id}`, payload);
      } else {
        await api.post("/api/property", payload);
      }
      onSave();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const msg =
          err.response?.data?.message ??
          err.response?.data?.error ??
          "Erro ao salvar. Tente novamente.";
        setSubmitError(msg);
      } else {
        setSubmitError("Erro inesperado. Tente novamente.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  return {
    register,
    errors,
    handleSubmit: handleSubmit(onSubmit),
    imageUrls,
    isUploading,
    isSaving,
    imageError,
    submitError,
    handleImageUpload,
    handleRemoveImage,
  };
};
