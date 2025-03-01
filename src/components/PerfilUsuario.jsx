import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  Divider
} from "@mui/material";
import { Person, Email, Wc, Edit, Logout, People, Speed, Opacity, ToggleOn } from "@mui/icons-material";
import '../css/PerfilUsuario.css';

const drawerWidth = 240;

const PerfilUsuario = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const datosUsuario = localStorage.getItem("usuario");
    if (datosUsuario) {
      try {
        const usuarioParseado = JSON.parse(datosUsuario);
        setUsuario(usuarioParseado);
      } catch (error) {
        console.error("Error al parsear usuario:", error);
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!usuario) {
    return <p className="cargando">Cargando...</p>;
  }

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  const renderProfileContent = () => {
    switch (usuario.rol) {
      case "Usuario":
        return (
          <Box sx={{ display: 'flex', backgroundColor: '#fafafa', color: '#333', minHeight: '100vh' }}>
            <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, backgroundColor: '#1e1e1e' }}>
              <Toolbar>
                <Typography variant="h6" noWrap component="div" sx={{ color: '#fff' }}>
                  Perfil de Usuario
                </Typography>
              </Toolbar>
            </AppBar>
            <Drawer
              variant="permanent"
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
                  backgroundColor: '#1e1e1e',
                  color: 'white'
                },
              }}
            >
              <Toolbar />
              <Box sx={{ overflow: 'auto', p: 2 }}>
                <List>
                  <ListItem sx={{ justifyContent: 'center' }}>
                    <Avatar src={`http://localhost:3000/uploads/${usuario.foto}`} alt={usuario.nombre} sx={{ width: 100, height: 100 }} />
                  </ListItem>
                  <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: '#2c2c2c', borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ color: 'white' }}>{usuario.nombre}</Typography>
                    <Typography variant="body2" sx={{ color: 'white', marginTop: '8px' }}>{usuario.correo}</Typography>
                    <Typography variant="body2" sx={{ color: 'white', marginTop: '8px' }}>{usuario.sexo}</Typography>
                  </Paper>
                  <Divider sx={{ marginTop: 2 }} />
                  <ListItemButton component="a" href={`/editUsuarios/${usuario.id}`}>
                    <ListItemIcon><Edit sx={{ color: 'white' }} /></ListItemIcon>
                    <ListItemText primary="Editar mi perfil" sx={{ color: 'white' }} />
                  </ListItemButton>
                  <ListItemButton onClick={handleLogout}>
                    <ListItemIcon><Logout sx={{ color: 'white' }} /></ListItemIcon>
                    <ListItemText primary="Cerrar sesión" sx={{ color: 'white' }} />
                  </ListItemButton>
                </List>
              </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, color: 'black' }}>
              <Toolbar />
              <Typography variant="h4">Bienvenido, {usuario.nombre}</Typography>
            </Box>
          </Box>
        );

      case "Administrador":
        return (
          <Box sx={{ display: 'flex', color: '#333', minHeight: '100vh' }}>
            <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, backgroundColor: '#1e1e1e' }}>
              <Toolbar>
                <Typography variant="h6" noWrap component="div" sx={{ color: '#fff' }}>
                  Administrador
                </Typography>
              </Toolbar>
            </AppBar>
            <Drawer
              variant="permanent"
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
                  backgroundColor: '#1e1e1e',
                  color: 'white'
                },
              }}
            >
              <Toolbar />
              <Box sx={{ overflow: 'auto' }}>
                <List>
                  <ListItem sx={{ justifyContent: 'center' }}>
                    <Avatar src={`http://localhost:3000/uploads/${usuario.foto}`} alt={usuario.nombre} sx={{ width: 100, height: 100 }} />
                  </ListItem>
                  <ListItem sx={{ justifyContent: 'center' }}>
                    <Typography sx={{ color: 'white', fontWeight: 'bold' }}>{usuario.nombre}</Typography>
                  </ListItem>
                  <ListItemButton component="a" href="/usuarios">
                    <ListItemIcon><People sx={{ color: 'white' }} /></ListItemIcon>
                    <ListItemText primary="Administrar Usuarios" sx={{ color: 'white' }} />
                  </ListItemButton>
                  <ListItemButton component="a" href="/sensores">
                    <ListItemIcon><Speed sx={{ color: 'white' }} /></ListItemIcon>
                    <ListItemText primary="Administrar Sensores" sx={{ color: 'white' }} />
                  </ListItemButton>
                  <ListItemButton component="a" href="/riego">
                    <ListItemIcon><Opacity sx={{ color: 'white' }} /></ListItemIcon>
                    <ListItemText primary="Administrar Riego" sx={{ color: 'white' }} />
                  </ListItemButton>
                  <ListItemButton component="a" href="/valvula">
                    <ListItemIcon><ToggleOn sx={{ color: 'white' }} /></ListItemIcon>
                    <ListItemText primary="Administrar Válvulas" sx={{ color: 'white' }} />
                  </ListItemButton>
                  <ListItemButton onClick={handleLogout}>
                    <ListItemIcon><Logout sx={{ color: 'white' }} /></ListItemIcon>
                    <ListItemText primary="Cerrar sesión" sx={{ color: 'white' }} />
                  </ListItemButton>
                </List>
              </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, color: 'black' }}>
              <Toolbar />
              <Typography variant="h4">Bienvenido, Administrador {usuario.nombre}</Typography>
            </Box>
          </Box>
        );

      case "Sistema":
        return (
          <Box sx={{ display: 'flex', backgroundColor: '#fafafa', color: '#333', minHeight: '100vh' }}>
            <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, backgroundColor: '#1e1e1e' }}>
              <Toolbar>
                <Typography variant="h6" noWrap component="div" sx={{ color: '#fff' }}>
                  Dashboard de Supervisor del Sistema de Riego
                </Typography>
              </Toolbar>
            </AppBar>
            <Drawer
              variant="permanent"
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
                  backgroundColor: '#1e1e1e',
                  color: 'white'
                },
              }}
            >
              <Toolbar />
              <Box sx={{ overflow: 'auto', p: 2 }}>
                <List>
                  <ListItem sx={{ justifyContent: 'center' }}>
                    <Avatar src={`http://localhost:3000/uploads/${usuario.foto}`} alt={usuario.nombre} sx={{ width: 100, height: 100 }} />
                  </ListItem>
                  <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: '#2c2c2c', borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ color: 'white' }}>{usuario.nombre}</Typography>
                    <Typography variant="body2" sx={{ color: 'white', marginTop: '8px' }}>{usuario.correo}</Typography>
                    <Typography variant="body2" sx={{ color: 'white', marginTop: '8px' }}>{usuario.sexo}</Typography>
                  </Paper>
                  <Divider sx={{ marginTop: 2 }} />
                  <ListItemButton component="a" href={`/editUsuarios/${usuario.id}`}>
                    <ListItemIcon><Edit sx={{ color: 'white' }} /></ListItemIcon>
                    <ListItemText primary="Editar perfil" sx={{ color: 'white' }} />
                  </ListItemButton>
                  <ListItemButton onClick={handleLogout}>
                    <ListItemIcon><Logout sx={{ color: 'white' }} /></ListItemIcon>
                    <ListItemText primary="Cerrar sesión" sx={{ color: 'white' }} />
                  </ListItemButton>
                </List>
              </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, color: 'black' }}>
              <Toolbar />
              <Typography variant="h4">Bienvenido, Supervisor del Sistema {usuario.nombre}</Typography>
            </Box>
          </Box>
        );

      default:
        return <p className="error" style={{ color: 'white' }}>Rol no reconocido</p>;
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3, backgroundColor: '#fafafa' }}>
      {renderProfileContent()}
    </Box>
  );
};

export default PerfilUsuario;
