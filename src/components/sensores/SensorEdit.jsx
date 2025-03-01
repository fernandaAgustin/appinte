import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../estilo.css'

const SensorEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [tipo, setTipo] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [fechaInstalacion, setFechaInstalacion] = useState('');

    const obtenerSensor = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/sensores/${id}`);
            const sensor = response.data;
            setNombre(sensor.nombre);
            setTipo(sensor.tipo);
            setUbicacion(sensor.ubicacion);

            // Verifica si la fecha existe y conviértela al formato adecuado
            if (sensor.fecha_instalacion) {
                const fecha = new Date(sensor.fecha_instalacion).toISOString().split('T')[0];
                setFechaInstalacion(fecha);
            } else {
                setFechaInstalacion('');
            }
        } catch (error) {
            console.error('Error al obtener el sensor:', error);
        }
    };

    const actualizarSensor = async (e) => {
        e.preventDefault();
        const datosActualizados = {
            nombre,
            tipo,
            ubicacion,
            fecha_instalacion: fechaInstalacion || null,
        };

        try {
            await axios.put(`http://localhost:3000/api/sensores/${id}`, datosActualizados);
            alert('Sensor actualizado con éxito');
            navigate(-1); // Regresa a la página anterior
        } catch (error) {
            console.error('Error al actualizar el sensor:', error);
        }
    };

    useEffect(() => {
        obtenerSensor();
    }, []);

    return (
        <div className="form-container">
            <h2>Editar Sensor</h2>
            <form onSubmit={actualizarSensor}>
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
                    className="form-input"
                />
                <input
                    type="date"
                    value={fechaInstalacion}
                    onChange={(e) => setFechaInstalacion(e.target.value)}
                    className="form-input"
                />
                <div className="form-buttons">
                    <button type="submit" className="submit-btn">Actualizar</button>
                    <button type="button" onClick={() => navigate(-1)} className="cancel-btn">Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default SensorEdit;
