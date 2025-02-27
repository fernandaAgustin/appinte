import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import UploadExcel from './UploadExcel';
import { AppBar, Drawer, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Avatar, Typography, Toolbar, Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination, Button, TextField, Paper } from '@mui/material';
import { People, Speed, Opacity, ToggleOn, BarChart, Logout, Edit, Delete, Add, CloudUpload } from '@mui/icons-material';
import '../estilo.css';

const drawerWidth = 240;

const Sidebar = ({ usuario, handleLogout }) => (
    <Drawer
        variant="permanent"
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            backgroundColor: '#212121', // Fondo gris oscuro
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                backgroundColor: '#212121', // Fondo gris oscuro
                color: '#fff', // Texto blanco
            },
        }}
    >
        <Toolbar />
        <Box sx={{ overflow: 'auto', color: '#fff' }}>
            <List>
                <ListItem>
                    <Avatar src={`http://localhost:3000/uploads/${usuario.foto}`} alt={usuario.nombre} />
                </ListItem>
                <ListItem>
                    <Typography variant="h6" sx={{ color: '#fff' }}>{usuario.nombre}</Typography>
                </ListItem>
                <ListItemButton component={Link} to="/perfil" sx={{ color: '#fff' }}>
                    <ListItemIcon><People sx={{ color: '#fff' }} /></ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
                <ListItemButton component={Link} to="/usuarios" sx={{ color: '#fff' }}>
                    <ListItemIcon><People sx={{ color: '#fff' }} /></ListItemIcon>
                    <ListItemText primary="Administrar Usuarios" />
                </ListItemButton>
                <ListItemButton component={Link} to="/sensores" sx={{ color: '#fff' }}>
                    <ListItemIcon><Speed sx={{ color: '#fff' }} /></ListItemIcon>
                    <ListItemText primary="Administrar Sensores" />
                </ListItemButton>
                <ListItemButton component={Link} to="/riego" sx={{ color: '#fff' }}>
                    <ListItemIcon><Opacity sx={{ color: '#fff' }} /></ListItemIcon>
                    <ListItemText primary="Administrar Riego" />
                </ListItemButton>
                <ListItemButton component={Link} to="/valvula" sx={{ color: '#fff' }}>
                    <ListItemIcon><ToggleOn sx={{ color: '#fff' }} /></ListItemIcon>
                    <ListItemText primary="Administrar Válvulas" />
                </ListItemButton>
                <ListItemButton component={Link} to="/estadisticas" sx={{ color: '#fff' }}>
                    <ListItemIcon><BarChart sx={{ color: '#fff' }} /></ListItemIcon>
                    <ListItemText primary="Ver estadísticas" />
                </ListItemButton>
                <ListItemButton onClick={handleLogout} sx={{ color: '#fff' }}>
                    <ListItemIcon><Logout sx={{ color: '#fff' }} /></ListItemIcon>
                    <ListItemText primary="Salir" />
                </ListItemButton>
            </List>
        </Box>
    </Drawer>
);

const RiegoList = () => {
    const [usuario, setUsuario] = useState(null);
    const [riegos, setRiegos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const riegosPorPagina = 10;
    const navigate = useNavigate();
    const [busquedaValvula, setBusquedaValvula] = useState('');
    const [busquedaFecha, setBusquedaFecha] = useState('');

    useEffect(() => {
        const datosUsuario = localStorage.getItem('usuario');
        if (datosUsuario) {
            try {
                setUsuario(JSON.parse(datosUsuario));
            } catch (error) {
                console.error('Error al parsear usuario:', error);
                navigate('/');
            }
        } else {
            navigate('/');
        }
    }, [navigate]);

    const obtenerRiegos = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/riegos');
            setRiegos(response.data);
        } catch (error) {
            console.error('Error al obtener los riegos:', error);
        }
    };

    const eliminarRiego = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/riegos/${id}`);
            obtenerRiegos();
            alert("Riego eliminado correctamente");
        } catch (error) {
            console.error('Error al eliminar el riego:', error);
        }
    };

    const redirigirEdicion = (id) => {
        navigate(`/editar-riego/${id}`);
    };

    const handleLogout = () => {
        localStorage.removeItem('usuario');
        navigate('/');
    };

    useEffect(() => {
        obtenerRiegos();
    }, []);

    const riegosFiltrados = riegos.filter((riego) =>
        (busquedaValvula === '' || riego.valvula_id.toString().includes(busquedaValvula)) &&
        (busquedaFecha === '' || new Date(riego.fecha_riego).toLocaleDateString().includes(busquedaFecha))
    );

    const indexOfLastRiego = currentPage * riegosPorPagina;
    const indexOfFirstRiego = indexOfLastRiego - riegosPorPagina;
    const currentRiegos = riegosFiltrados.slice(indexOfFirstRiego, indexOfLastRiego);
    const totalPages = Math.ceil(riegosFiltrados.length / riegosPorPagina);

    if (!usuario) return <p>Cargando...</p>;

    return (
        <Box sx={{ display: 'flex', backgroundColor: '#121212' }}>
            <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, backgroundColor: '#333' }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ color: '#fff' }}>
                        Dashboard de Administrador
                    </Typography>
                </Toolbar>
            </AppBar>
            <Sidebar usuario={usuario} handleLogout={handleLogout} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    mt: 8,
                    maxHeight: 'calc(100vh - 64px)',
                    overflowY: 'auto',
                    backgroundColor: '#121212', // Fondo oscuro
                    color: '#fff' // Texto blanco
                }}
            >
                <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>Lista de Riegos</Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <TextField
                        label="Buscar por Válvula"
                        variant="outlined"
                        value={busquedaValvula}
                        onChange={(e) => setBusquedaValvula(e.target.value)}
                        sx={{
                            mr: 2,
                            backgroundColor: '#2C3E50', // Un tono gris oscuro
                            color: '#fff', // Letra blanca
                            width: '300px',
                            borderRadius: '8px',
                            '& .MuiInputBase-root': {
                                color: '#fff', // Color de la letra en el input
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#34495E', // Color de borde más claro
                            },
                            '& .MuiInputLabel-root': {
                                color: '#B0BEC5', // Color claro para la etiqueta
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#1ABC9C', // Color del borde al pasar el mouse
                            },
                        }}
                    />
                    <TextField
                        label="Buscar por Fecha"
                        variant="outlined"
                        value={busquedaFecha}
                        onChange={(e) => setBusquedaFecha(e.target.value)}
                        sx={{
                            backgroundColor: '#2C3E50', // Un tono gris oscuro
                            color: '#fff', // Letra blanca
                            width: '300px',
                            borderRadius: '8px',
                            '& .MuiInputBase-root': {
                                color: '#fff', // Color de la letra en el input
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#34495E', // Color de borde más claro
                            },
                            '& .MuiInputLabel-root': {
                                color: '#B0BEC5', // Color claro para la etiqueta
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#1ABC9C', // Color del borde al pasar el mouse
                            },
                        }}
                    />
                </Box>

                {/* Botón de Subir Excel */}
                <UploadExcel
                    onUploadSuccess={obtenerRiegos}
                    sx={{
                        mt: 2,
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                        '& .MuiButton-root': {
                            backgroundColor: '#2C3E50', // Un tono gris oscuro
                            color: '#fff',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            '&:hover': {
                                backgroundColor: '#34495E', // Un gris más oscuro al hacer hover
                            },
                        },
                    }}
                >
                    <CloudUpload sx={{ mr: 1 }} /> Subir Excel
                </UploadExcel>

                {/* Tabla sin scroll */}
                <TableContainer
                    component={Paper}
                    sx={{
                        mt: 2,
                        backgroundColor: '#1E1E1E',
                        minHeight: '400px',  // Definimos una altura mínima para la tabla
                        maxHeight: 'calc(100vh - 250px)', // Asegura que no crezca más allá de un límite
                        overflowY: 'auto',  // Agrega desplazamiento solo si es necesario
                    }}
                >
                    <Table sx={{ backgroundColor: '#1E1E1E', color: '#fff' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: '#fff' }}>ID</TableCell>
                                <TableCell sx={{ color: '#fff' }}>Válvula</TableCell>
                                <TableCell sx={{ color: '#fff' }}>Cantidad de Agua (L)</TableCell>
                                <TableCell sx={{ color: '#fff' }}>Duración (min)</TableCell>
                                <TableCell sx={{ color: '#fff' }}>Fecha</TableCell>
                                <TableCell sx={{ color: '#fff' }}>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentRiegos.map((riego) => (
                                <TableRow key={riego.id}>
                                    <TableCell sx={{ color: '#fff' }}>{riego.id}</TableCell>
                                    <TableCell sx={{ color: '#fff' }}>{riego.valvula_id}</TableCell>
                                    <TableCell sx={{ color: '#fff' }}>{riego.cantidad_agua}</TableCell>
                                    <TableCell sx={{ color: '#fff' }}>{riego.duracion}</TableCell>
                                    <TableCell sx={{ color: '#fff' }}>{new Date(riego.fecha_riego).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <IconButton color="primary" onClick={() => redirigirEdicion(riego.id)}>
                                                <Edit />
                                            </IconButton>
                                            <IconButton color="error" onClick={() => eliminarRiego(riego.id)}>
                                                <Delete />
                                            </IconButton>
                                        </Box>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(e, value) => setCurrentPage(value)}
                    sx={{
                        mt: 4, // Added margin-top for better spacing
                        display: 'flex',
                        justifyContent: 'center', // Center the pagination
                        alignItems: 'center',
                        backgroundColor: '#2C3E50',
                        color: '#fff',
                        borderRadius: '8px',
                        '& .MuiPaginationItem-root': {
                            backgroundColor: '#34495E',
                            color: '#fff',
                            borderRadius: '8px',
                            padding: '10px 20px', // Increase padding for a better button size
                            '&:hover': {
                                backgroundColor: '#1ABC9C',
                            },
                        },
                    }}
                />

                <Button
                    variant="contained"
                    startIcon={<Add />}
                    component={Link}
                    to="/nuevo-riego"
                    sx={{
                        mt: 4, // Added margin-top for better spacing
                        backgroundColor: '#2C3E50',
                        color: '#fff',
                        padding: '12px 24px', // Increased padding for better button size
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        '&:hover': {
                            backgroundColor: '#34495E',
                        },
                    }}
                >
                    Nuevo Riego
                </Button>
            </Box>
        </Box>
    );
};

export default RiegoList;