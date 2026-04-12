import {
  Avatar,
  Typography,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import {useState} from "react";

export default function AvatarIcon() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();
  const { user, logout } = useUser();

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    navigate("/perfil");
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate("/login");
  };

  return (
    <div>
        <Avatar
        alt={user?.name ?? "Usuário"}
        src="/static/images/avatar/1.jpg"
        onClick={handleAvatarClick}
        sx={{ cursor: "pointer" }}
      />
 
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{
          paper: {
            elevation: 3,
            sx: { mt: 1, minWidth: 180, borderRadius: 2 },
          },
        }}
      >
        {user?.name && (
          <>
            <MenuItem disabled sx={{ opacity: "1 !important" }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {user.name}
              </Typography>
            </MenuItem>
            <Divider />
          </>
        )}
 
        <MenuItem onClick={handleProfile}>
          Meu perfil
        </MenuItem>
 
        <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
          Sair
        </MenuItem>
      </Menu>
    </div>
  );
}
