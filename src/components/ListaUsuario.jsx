import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Drawer, AppBar, Toolbar, Typography, IconButton, Avatar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, TextField } from '@mui/material';
import { People, Speed, Opacity, ToggleOn, BarChart, Logout, Add, Delete, Edit } from '@mui/icons-material';
import UploadExcel from './UploadExcel';
import { CloudUpload } from '@mui/icons-material';
import './estilo.css';

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
                <ListItemButton onClick={handleLogout} sx={{ color: '#fff' }}>
                    <ListItemIcon><Logout sx={{ color: '#fff' }} /></ListItemIcon>
                    <ListItemText primary="Salir" />
                </ListItemButton>
            </List>
        </Box>
    </Drawer>
);

const ListaUsuario = () => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [usuarios, setUsuarios] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchName, setSearchName] = useState('');
    const [searchRole, setSearchRole] = useState('');
    const usuariosPorPagina = 10;

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

    useEffect(() => {
        axios.get("http://localhost:3000/api/usuarios/")
            .then(response => setUsuarios(response.data))
            .catch(error => console.error("Error al obtener usuarios:", error));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('usuario');
        navigate('/');
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/api/usuarios/${id}`)
            .then(() => {
                setUsuarios(usuarios.filter(usuario => usuario.id !== id));
                alert("Usuario eliminado correctamente");
            })
            .catch(error => console.error("Error al eliminar usuario:", error));
    };

    const handleSearchNameChange = (e) => setSearchName(e.target.value);
    const handleSearchRoleChange = (e) => setSearchRole(e.target.value);

    const filteredUsuarios = usuarios.filter(usuario => {
        const matchesName = usuario.nombre.toLowerCase().includes(searchName.toLowerCase());
        const matchesRole = usuario.rol.toLowerCase().includes(searchRole.toLowerCase());
        return matchesName && matchesRole;
    });

    const indexOfLastUser = currentPage * usuariosPorPagina;
    const indexOfFirstUser = indexOfLastUser - usuariosPorPagina;
    const currentUsuarios = filteredUsuarios.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsuarios.length / usuariosPorPagina);

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
                <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>Lista de Usuarios</Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <TextField
                    label="Buscar por Nombre"
                    variant="outlined"
                    value={searchName}
                    onChange={handleSearchNameChange}
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
                    label="Buscar por Rol"
                    variant="outlined"
                    value={searchRole}
                    onChange={handleSearchRoleChange}
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
                    onUploadSuccess={() => axios.get("http://localhost:3000/api/usuarios/").then(response => setUsuarios(response.data))}
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
                                <TableCell sx={{ color: '#fff' }}>Nombre</TableCell>
                                <TableCell sx={{ color: '#fff' }}>Correo</TableCell>
                                <TableCell sx={{ color: '#fff' }}>Rol</TableCell>
                                <TableCell sx={{ color: '#fff' }}>Fecha de Nacimiento</TableCell>
                                <TableCell sx={{ color: '#fff' }}>Sexo</TableCell>
                                <TableCell sx={{ color: '#fff' }}>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentUsuarios.map(usuario => (
                                <TableRow key={usuario.id}>
                                    <TableCell sx={{ color: '#fff' }}>{usuario.id}</TableCell>
                                    <TableCell sx={{ color: '#fff' }}>{usuario.nombre}</TableCell>
                                    <TableCell sx={{ color: '#fff' }}>{usuario.correo}</TableCell>
                                    <TableCell sx={{ color: '#fff' }}>{usuario.rol}</TableCell>
                                    <TableCell sx={{ color: '#fff' }}>{new Date(usuario.fecha_nacimiento).toLocaleDateString()}</TableCell>
                                    <TableCell sx={{ color: '#fff' }}>{usuario.sexo}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                            <IconButton color="primary" component={Link} to={`/editUsuarios/${usuario.id}`}>
                                                <Edit sx={{ color: '#fff' }} />
                                            </IconButton>
                                            <IconButton color="error" onClick={() => handleDelete(usuario.id)}>
                                                <Delete sx={{ color: '#fff' }} />
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
                    to="/nuevoU"
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
                    Nuevo Usuario
                </Button>
            </Box>
        </Box>
    );
};

export default ListaUsuario;
