import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../../services/api";
import type { PropertyData } from "../../interfaces/property-data";

const CLOUDINARY_CLOUD_NAME = "dqud4llho";
const CLOUDINARY_UPLOAD_PRESET = "teste-up-img";

type PropertyFormState = {
  name: string;
  description: string;
  type: string;
  value: string;
  area: string;
  bedrooms: string;
  address: string;
  city: string;
  state: string;
};

type FormErrors = Partial<
  Record<keyof PropertyFormState | "imageUrls" | "submit", string>
>;

interface UsePropertyFormProps {
  initialData?: PropertyData | null;
  onSave: () => void;
}

const emptyForm: PropertyFormState = {
  name: "",
  description: "",
  type: "CASA",
  value: "",
  area: "",
  bedrooms: "",
  address: "",
  city: "",
  state: "",
};

export const usePropertyForm = ({
  initialData,
  onSave,
}: UsePropertyFormProps) => {
  const isEditing = !!initialData;

  const [form, setForm] = useState<PropertyFormState>(emptyForm);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name ?? "",
        description: initialData.description ?? "",
        type: initialData.type ?? "CASA",
        value: String(initialData.value ?? ""),
        area: String(initialData.area ?? ""),
        bedrooms: String(initialData.bedrooms ?? ""),
        address: initialData.address ?? "",
        city: initialData.city ?? "",
        state: initialData.state ?? "",
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
      setForm(emptyForm);
      setImageUrls([]);
    }
    setErrors({});
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >,
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined, submit: undefined }));
  };

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

        if (!res.ok) throw new Error("Falha no upload da imagem");

        const data = await res.json();
        uploaded.push(data.secure_url as string);
      }

      setImageUrls((prev) => [...prev, ...uploaded]);
      setErrors((prev) => ({ ...prev, imageUrls: undefined }));
    } catch (err) {
      console.error("Erro no upload:", err);
      setErrors((prev) => ({
        ...prev,
        imageUrls: "Falha ao enviar imagem. Tente novamente.",
      }));
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name || form.name.length < 10)
      newErrors.name = "Nome deve ter no mínimo 10 caracteres.";
    if (!form.description) newErrors.description = "Descrição é obrigatória.";
    if (!form.type) newErrors.type = "Tipo é obrigatório.";
    if (!form.value || Number(form.value) <= 0)
      newErrors.value = "Valor deve ser positivo.";
    if (!form.area || Number(form.area) <= 0)
      newErrors.area = "Área deve ser positiva.";
    if (!form.bedrooms || Number(form.bedrooms) <= 0)
      newErrors.bedrooms = "Quartos deve ser positivo.";
    if (!form.address) newErrors.address = "Endereço é obrigatório.";
    if (!form.city) newErrors.city = "Cidade é obrigatória.";
    if (!form.state) newErrors.state = "Estado é obrigatório.";
    if (imageUrls.length === 0)
      newErrors.imageUrls = "Adicione ao menos uma imagem.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      type: form.type,
      value: parseFloat(form.value),
      area: parseInt(form.area, 10),
      bedrooms: parseInt(form.bedrooms, 10),
      address: form.address.trim(),
      city: form.city.trim(),
      state: form.state.trim().toUpperCase(),
      imageUrls: imageUrls.join(","),
    };

    console.log("[PropertyForm] Enviando payload:", payload);

    setIsSaving(true);
    try {
      if (isEditing) {
        await api.put(`/api/property/${initialData!.id}`, payload);
      } else {
        await api.post("/api/property", payload);
      }
      onSave();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const serverMessage =
          err.response?.data?.message ??
          err.response?.data?.error ??
          JSON.stringify(err.response?.data);
        console.error("[PropertyForm] Erro 400 do servidor:", serverMessage);
        setErrors((prev) => ({
          ...prev,
          submit: `Erro ao salvar: ${serverMessage}`,
        }));
      } else {
        console.error("[PropertyForm] Erro inesperado:", err);
        setErrors((prev) => ({
          ...prev,
          submit: "Erro inesperado. Tente novamente.",
        }));
      }
    } finally {
      setIsSaving(false);
    }
  };

  return {
    form,
    imageUrls,
    isUploading,
    isSaving,
    errors,
    handleChange,
    handleImageUpload,
    handleRemoveImage,
    handleSubmit,
  };
};
