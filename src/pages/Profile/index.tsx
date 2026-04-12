import { TextField, Button, Alert, Skeleton, Typography } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlineOutlined";

import { useProfile } from "./useProfile";
import {
  ProfileSection,
  ProfileCard,
  ProfileCardHeader,
  ProfileAvatar,
  ProfileName,
  ProfileEmail,
  ProfileRoleBadge,
  ProfileDivider,
  ProfileFormContainer,
  ProfileFormTitle,
} from "./style";

export default function Profile() {
  const {
    user,
    isLoading,
    name,
    setName,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    formError,
    successMessage,
    isUpdating,
    handleSubmit,
  } = useProfile();

  const initials = user?.name
    ? user.name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0].toUpperCase())
        .join("")
    : "";

  return (
    <ProfileSection>
      <ProfileCard>
        <ProfileCardHeader>
          {isLoading ? (
            <>
              <Skeleton variant="circular" width={72} height={72} />
              <Skeleton width={160} height={24} />
              <Skeleton width={200} height={18} />
            </>
          ) : (
            <>
              <ProfileAvatar>{initials || <PersonOutlineIcon />}</ProfileAvatar>
              <ProfileName>{user?.name}</ProfileName>
              <ProfileEmail>{user?.email}</ProfileEmail>
              <ProfileRoleBadge>{user?.role}</ProfileRoleBadge>
            </>
          )}
        </ProfileCardHeader>

        <ProfileDivider />

        <ProfileFormContainer onSubmit={handleSubmit}>
          <ProfileFormTitle>Atualizar perfil</ProfileFormTitle>

          <Typography variant="body2" color="text.secondary" sx={{ mt: -0.5 }}>
            Preencha apenas os campos que deseja alterar.
          </Typography>

          <TextField
            label="Novo nome"
            size="small"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={user?.name ?? ""}
            disabled={isLoading}
          />

          <TextField
            label="Nova senha"
            type="password"
            size="small"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />

          <TextField
            label="Confirmar nova senha"
            type="password"
            size="small"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading || !password}
          />

          {formError && <Alert severity="error">{formError}</Alert>}
          {successMessage && <Alert severity="success">{successMessage}</Alert>}

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isUpdating || isLoading}
            sx={{ mt: 0.5 }}
          >
            {isUpdating ? "Salvando..." : "Salvar alterações"}
          </Button>
        </ProfileFormContainer>
      </ProfileCard>
    </ProfileSection>
  );
}
