import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../estilo.css'

const ValvulaEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [estado, setEstado] = useState('');
    const [fechaInstalacion, setFechaInstalacion] = useState('');

    const obtenerValvula = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/valvulas/${id}`);
            const valvula = response.data;
            setNombre(valvula.nombre);
            setUbicacion(valvula.ubicacion);
            setEstado(valvula.estado);

            // Convertir timestamp a formato YYYY-MM-DD
            if (valvula.fecha_instalacion) {
                const fecha = new Date(valvula.fecha_instalacion).toISOString().split('T')[0];
                setFechaInstalacion(fecha);
            }
        } catch (error) {
            console.error('Error al obtener la válvula:', error);
        }
    };

    const actualizarValvula = async (e) => {
        e.preventDefault();
        const datosActualizados = {
            nombre,
            ubicacion,
            estado,
            fecha_instalacion: fechaInstalacion || null,
        };

        try {
            await axios.put(`http://localhost:3000/api/valvulas/${id}`, datosActualizados);
            alert('Válvula actualizada con éxito');
            navigate('/valvula');
        } catch (error) {
            console.error('Error al actualizar la válvula:', error);
        }
    };

    useEffect(() => {
        obtenerValvula();
    }, []);

    return (
        <form onSubmit={actualizarValvula}>
            <h2>Editar Válvula</h2>
            <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Ubicación"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Estado"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                required
            />
            <input
                type="date"
                value={fechaInstalacion}
                onChange={(e) => setFechaInstalacion(e.target.value)}
                required
            />
            <button type="submit">Actualizar</button>
        </form>
    );
};

export default ValvulaEdit;
