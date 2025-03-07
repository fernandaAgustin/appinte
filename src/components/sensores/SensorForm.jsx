import React, { useState } from 'react';
import axios from 'axios';
<<<<<<< HEAD
import { TextField, Button, Container, Typography, IconButton } from '@mui/material';
import { ArrowBack, Person as PersonIcon, DeviceHub as DeviceHubIcon, LocationOn as LocationOnIcon } from '@mui/icons-material';
import { Zoom } from '@mui/material';
=======
import { useNavigate } from 'react-router-dom';  // Importar useNavigate
>>>>>>> dfe6f50d8f1790ae81823ba127caadcd9d52de9e
import '../estilo.css';

const SensorForm = () => {
    const [nombre, setNombre] = useState('');
    const [tipo, setTipo] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [fechaInstalacion, setFechaInstalacion] = useState('');
    const navigate = useNavigate();  // Usar useNavigate para redirigir

    const crearSensor = async (e) => {
        e.preventDefault();
        const nuevoSensor = {
            nombre,
            tipo,
            ubicacion,
            fecha_instalacion: fechaInstalacion
        };

        try {
            await axios.post('http://localhost:3000/api/sensores', nuevoSensor);
            alert('Sensor creado con éxito');
            navigate(-1); // Regresar a la página anterior después de crear el sensor
        } catch (error) {
            console.error('Error al crear el sensor:', error);
        }
    };

    const cancelarFormulario = () => {
        navigate(-1); // Regresar a la página anterior cuando se cancela
    };

    return (
<<<<<<< HEAD
        <Zoom in={true} timeout={500}>
            <Container 
                component="main" 
                maxWidth="xs" 
                sx={{ 
                    mt: 8, 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo blanco con opacidad
                    padding: 3, 
                    borderRadius: 2 
                }}
            >
                <Typography variant="h4" align="center" gutterBottom>
                    Agregar Sensor
                </Typography>
                <form onSubmit={crearSensor}>
                    <TextField
                        label="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        fullWidth
                        required
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                            startAdornment: <PersonIcon />
                        }}
                    />
                    <TextField
                        label="Tipo"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        fullWidth
                        required
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                            startAdornment: <DeviceHubIcon />
                        }}
                    />
                    <TextField
                        label="Ubicación"
                        value={ubicacion}
                        onChange={(e) => setUbicacion(e.target.value)}
                        fullWidth
                        required
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                            startAdornment: <LocationOnIcon />
                        }}
                    />
                    <TextField
                        label="Fecha de Instalación"
                        value={fechaInstalacion}
                        onChange={(e) => setFechaInstalacion(e.target.value)}
                        fullWidth
                        required
                        variant="outlined"
                        margin="normal"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Guardar
                    </Button>
                </form>
                <IconButton
                    href="/sensores"
                    sx={{
                        mt: 2,
                        color: 'primary.main',
                        position: 'absolute',
                        top: 20,
                        left: 20
                    }}
                >
                    <ArrowBack />
                </IconButton>
            </Container>
        </Zoom>
=======
        <div className="form-container">
            <h2>Agregar Sensor</h2>
            <form onSubmit={crearSensor}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    className="form-input"
                />
                <input
                    type="text"
                    placeholder="Tipo"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    required
                    className="form-input"
                />
                <input
                    type="text"
                    placeholder="Ubicación"
                    value={ubicacion}
                    onChange={(e) => setUbicacion(e.target.value)}
                    required
                    className="form-input"
                />
                <input
                    type="date"
                    value={fechaInstalacion}
                    onChange={(e) => setFechaInstalacion(e.target.value)}
                    required
                    className="form-input"
                />
                <div className="form-buttons">
                    <button type="submit" className="submit-btn">Guardar</button>
                    <button type="button" onClick={cancelarFormulario} className="cancel-btn">Cancelar</button>
                </div>
            </form>
        </div>
>>>>>>> dfe6f50d8f1790ae81823ba127caadcd9d52de9e
    );
};

export default SensorForm;
