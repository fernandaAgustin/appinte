import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Toolbar, Typography, Avatar, IconButton, Divider } from "@mui/material";
import { Edit, Logout, People, Speed, Opacity, ToggleOn } from "@mui/icons-material";
import backgroundImage from "../img/fondo.jpeg";
import UserStats from '../components/UserStats';
import ValvulaGraficas from "./valvulas/ValvulaGraficas";
import RiegoGrafico from "./riego/RiegoGrafico";
import SensorCharts from "./sensores/SensorCharts"; 
import axios from 'axios'; // Si aún no está importado
import Dashboard from './Dashboard';

const drawerWidth = 240;

const PerfilUsuario = () => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [usuarios, setUsuarios] = useState([]);
    const [valvulas, setValvulas] = useState([]);
    const [riegos, setRiegos] = useState([]);

    useEffect(() => {
        const datosUsuario = localStorage.getItem("usuario");
        if (datosUsuario) {
            try {
                const usuarioParseado = JSON.parse(datosUsuario);
                setUsuario(usuarioParseado);
            } catch (error) {
                console.error("Error al parsear usuario:", error);
                navigate("/"); // Redirigir al login si ocurre un error
            }
        } else {
            navigate("/"); // Redirigir al login si no hay datos de usuario
        }

        // Función para obtener los usuarios
        const fetchUsuarios = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/usuarios");
                const data = await response.json();
                setUsuarios(data);  // Guarda la lista de usuarios
            } catch (error) {
                console.error("Error al obtener usuarios:", error);
            }
        };

        // Función para obtener las válvulas
        const fetchValvulas = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/valvulas/");
                const data = await response.json();
                setValvulas(data);
            } catch (error) {
                console.error("Error al obtener válvulas:", error);
            }
        };

        // Función para obtener riegos
        const fetchRiegos = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/riegos'); // Cambié `axios.fetch` por `axios.get`
                const data = await response.data;
                setRiegos(data);
            } catch (error) {
                console.error('Error al obtener los riegos:', error);
            }
        };
        //funcion para sensores
        const fetchSensores = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/sensores");
                setSensores(response.data);
            } catch (error) {
                console.error("Error al obtener sensores:", error);
            }
        };

        fetchUsuarios();
        fetchValvulas();
        fetchRiegos();
        fetchSensores();

    }, [navigate]);

    if (!usuario) {
        return <p className="cargando">Cargando...</p>;
    }

    const handleLogout = () => {
        localStorage.removeItem('usuario');
        navigate('/');
    };

    const renderProfileContent = () => {
        // Verificamos el rol de usuario antes de proceder
        if (!usuario || !usuario.rol) {
            return <Typography variant="h6" sx={{ color: 'red' }}>Rol no válido. Redirigiendo...</Typography>;
        }

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
                        <Drawer variant="permanent" sx={{ width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#1e1e1e', color: 'white' } }}>
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
                            <Toolbar sx={{ color: 'green', backgroundColor: '#042425' }}>
                                <Typography variant="h7" noWrap component="div" sx={{ color: 'white' }}>
                                    Administrador
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <Drawer variant="permanent" sx={{ width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed", backgroundRepeat: "no-repeat", color: 'white' } }}>
                            <Toolbar />
                            <Box sx={{  }}>
                                <List>
                                    <ListItem sx={{ justifyContent: 'center' }}>
                                        <Avatar src={`http://localhost:3000/uploads/${usuario.foto}`} alt={usuario.nombre} sx={{ width: 80, height: 80 }} />
                                    </ListItem>
                                    <ListItem sx={{ justifyContent: 'center' }}>
                                        <Typography sx={{ color: 'white', fontWeight: 'bold',  }}>{usuario.nombre}</Typography>
                                    </ListItem>
                                    <ListItemButton component="a" href="/usuarios" sx={{ '&:hover': { transform: 'scale(1.15)', transition: 'transform 0.3s ease-in-out', backgroundColor: 'rgba(255, 255, 255, 0.28)' } }}>
                                        <ListItemIcon><People sx={{ color: 'white' }} /></ListItemIcon>
                                        <ListItemText primary="Administrar Usuarios" sx={{ color: 'white' }} />
                                    </ListItemButton>
                                    <ListItemButton component="a" href="/sensores" sx={{ '&:hover': { transform: 'scale(1.15)', transition: 'transform 0.3s ease-in-out', backgroundColor: 'rgba(255, 255, 255, 0.28)' } }}>
                                        <ListItemIcon><Speed sx={{ color: 'white' }} /></ListItemIcon>
                                        <ListItemText primary="Administrar Sensores" sx={{ color: 'white' }} />
                                    </ListItemButton>
                                    <ListItemButton component="a" href="/riego" sx={{ '&:hover': { transform: 'scale(1.15)', transition: 'transform 0.3s ease-in-out', backgroundColor: 'rgba(255, 255, 255, 0.28)' } }}>
                                        <ListItemIcon><Opacity sx={{ color: 'white' }} /></ListItemIcon>
                                        <ListItemText primary="Administrar Riego" sx={{ color: 'white' }} />
                                    </ListItemButton>
                                    <ListItemButton component="a" href="/valvula" sx={{ '&:hover': { transform: 'scale(1.15)', transition: 'transform 0.3s ease-in-out', backgroundColor: 'rgba(255, 255, 255, 0.28)' } }}>
                                        <ListItemIcon><ToggleOn sx={{ color: 'white' }} /></ListItemIcon>
                                        <ListItemText primary="Administrar Válvulas" sx={{ color: 'white' }} />
                                    </ListItemButton>
                                    <ListItemButton onClick={handleLogout} sx={{ '&:hover': { transform: 'scale(1.15)', transition: 'transform 0.3s ease-in-out', backgroundColor: 'rgba(255, 255, 255, 0.28)' } }}>
                                        <ListItemIcon><Logout sx={{ color: 'white' }} /></ListItemIcon>
                                        <ListItemText primary="Cerrar sesión" sx={{ color: 'white' }} />
                                    </ListItemButton>
                                </List>
                            </Box>
                        </Drawer>
                        <Box component="main" sx={{ flexGrow: 1, p: 3, color: 'black', width: 1100 }}>
                            <Toolbar />
                            <Typography variant="h4">Bienvenido, Administrador {usuario.nombre}</Typography>
                            <UserStats usuarios={usuarios} />
                            <ValvulaGraficas valvulas={valvulas} />
                            <RiegoGrafico riegos={riegos} />
                            

                            
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