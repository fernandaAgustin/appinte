import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate
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
    );
};

export default SensorForm;
