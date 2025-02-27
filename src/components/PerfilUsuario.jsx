import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Avatar, Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Paper } from "@mui/material";
import { People, Speed, Edit, Logout, Email, Cake, Wc, Person, ToggleOn, BarChart, Opacity } from "@mui/icons-material";
import ListaUsuario from "./ListaUsuario";

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
                    <Box sx={{ display: 'flex' }}>
                        <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
                            <Toolbar>
                                <Typography variant="h6" noWrap component="div">
                                    Dashboard de Usuario
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
                                },
                            }}
                        >
                            <Toolbar />
                            <Box sx={{ overflow: 'auto', p: 2 }}>
                                <List>
                                    <ListItem sx={{ justifyContent: 'center' }}>
                                        <Avatar src={`http://localhost:3000/uploads/${usuario.foto}`} alt={usuario.nombre} sx={{ width: 80, height: 80 }} />
                                    </ListItem>
                                    <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                                        <ListItem>
                                            <ListItemIcon><Person /></ListItemIcon>
                                            <Typography variant="subtitle1">{usuario.nombre}</Typography>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon><Email /></ListItemIcon>
                                            <Typography variant="body2">{usuario.correo}</Typography>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon><Wc /></ListItemIcon>
                                            <Typography variant="body2">{usuario.sexo}</Typography>
                                        </ListItem>
                                    </Paper>
                                    <ListItemButton component="a" href="/">
                                        <ListItemIcon><People /></ListItemIcon>
                                        <ListItemText primary="Mis sistemas" />
                                    </ListItemButton>
                                    <ListItemButton component="a" href="/">
                                        <ListItemIcon><Speed /></ListItemIcon>
                                        <ListItemText primary="Añadir nuevo sistema" />
                                    </ListItemButton>
                                    <ListItemButton component="a" href="/">
                                        <ListItemIcon><Edit /></ListItemIcon>
                                        <ListItemText primary="Editar mi perfil" />
                                    </ListItemButton>
                                    <ListItemButton onClick={handleLogout}>
                                        <ListItemIcon><Logout /></ListItemIcon>
                                        <ListItemText primary="Salir" />
                                    </ListItemButton>
                                </List>
                            </Box>
                        </Drawer>
                        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                            <Toolbar />
                            <Typography variant="h4">Bienvenido, {usuario.nombre}</Typography>
                        </Box>
                    </Box>
                );
            case "Administrador":
                return (
                    <Box sx={{ display: 'flex' }}>
                        <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
                            <Toolbar>
                                <Typography variant="h6" noWrap component="div">
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
                                },
                            }}
                        >
                            <Toolbar />
                            <Box sx={{ overflow: 'auto' }}>
                                <List>
                                    <ListItem>
                                        <Avatar src={`http://localhost:3000/uploads/${usuario.foto}`} alt={usuario.nombre} />
                                    </ListItem>
                                    <ListItem>
                                        <Typography>{usuario.nombre}</Typography>
                                    </ListItem>
                                    <ListItemButton component="a" href="/usuarios">
                                        <ListItemIcon><People /></ListItemIcon>
                                        <ListItemText primary="Administrar Usuarios" />
                                    </ListItemButton>
                                    <ListItemButton component="a" href="/sensores">
                                        <ListItemIcon><Speed /></ListItemIcon>
                                        <ListItemText primary="Administrar Sensores" />
                                    </ListItemButton>
                                    <ListItemButton component="a" href="/riego">
                                        <ListItemIcon><Opacity /></ListItemIcon>
                                        <ListItemText primary="Administrar Riego" />
                                    </ListItemButton>
                                    <ListItemButton component="a" href="/valvula">
                                        <ListItemIcon><ToggleOn /></ListItemIcon>
                                        <ListItemText primary="Administrar Válvulas" />
                                    </ListItemButton>
                                    <ListItemButton>
                                        <ListItemIcon><BarChart /></ListItemIcon>
                                        <ListItemText primary="Ver estadísticas" />
                                    </ListItemButton>
                                    <ListItemButton onClick={handleLogout}>
                                        <ListItemIcon><Logout /></ListItemIcon>
                                        <ListItemText primary="Salir" />
                                    </ListItemButton>
                                </List>
                            </Box>
                        </Drawer>
                        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                            <Toolbar />
                            <Typography variant="h4">Bienvenido, Administrador {usuario.nombre}</Typography>
                            
                        </Box>
                    </Box>
                );

            case "Sistema":
                return (
                    <Box sx={{ display: 'flex' }}>
                        <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
                            <Toolbar>
                                <Typography variant="h6" noWrap component="div">
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
                                },
                            }}
                        >
                            <Toolbar />
                            <Box sx={{ overflow: 'auto', p: 2 }}>
                                <List>
                                    <ListItem sx={{ justifyContent: 'center' }}>
                                        <Avatar src={`http://localhost:3000/uploads/${usuario.foto}`} alt={usuario.nombre} sx={{ width: 80, height: 80 }} />
                                    </ListItem>
                                    <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                                        <ListItem>
                                            <ListItemIcon><Person /></ListItemIcon>
                                            <Typography variant="subtitle1">{usuario.nombre}</Typography>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon><Email /></ListItemIcon>
                                            <Typography variant="body2">{usuario.correo}</Typography>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon><Wc /></ListItemIcon>
                                            <Typography variant="body2">{usuario.sexo}</Typography>
                                        </ListItem>
                                    </Paper>
                                    <ListItemButton component="a" href="/">
                                        <ListItemIcon><ToggleOn /></ListItemIcon>
                                        <ListItemText primary="Configuraciones de riego" />
                                    </ListItemButton>
                                    <ListItemButton component="a" href="/">
                                        <ListItemIcon><BarChart /></ListItemIcon>
                                        <ListItemText primary="Notificación de sensores" />
                                    </ListItemButton>
                                    <ListItemButton component="a" href="/riego">
                                        <ListItemIcon><Opacity /></ListItemIcon>
                                        <ListItemText primary="Videos de Apoyo" />
                                    </ListItemButton>
                                    <ListItemButton onClick={handleLogout}>
                                        <ListItemIcon><Logout /></ListItemIcon>
                                        <ListItemText primary="Salir" />
                                    </ListItemButton>
                                </List>
                            </Box>
                        </Drawer>
                        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                            <Toolbar />
                            <Typography variant="h4">Bienvenido, Administrador {usuario.nombre}</Typography>
                        </Box>
                    </Box>
                );
            default:
                return <p className="error">Rol no reconocido</p>;
        }
    };
    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            {renderProfileContent()}
        </Box>
    );
};

export default PerfilUsuario;
