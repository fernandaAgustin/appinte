// src/components/Sidebar.jsx
import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Avatar, Typography, Box, Toolbar } from '@mui/material';
import { People, Speed, Opacity, ToggleOn, BarChart, Logout } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = ({ usuario, handleLogout }) => (
    <Drawer
        variant="permanent"
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                backgroundColor: '#212121',
                color: '#fff',
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

export default Sidebar;
