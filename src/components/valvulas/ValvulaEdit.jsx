import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../estilo.css';

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
            navigate('/valvula');  // Redirigir a la página de lista de válvulas o la página deseada
        } catch (error) {
            console.error('Error al actualizar la válvula:', error);
        }
    };

    const cancelarEdicion = () => {
        navigate(-1);  // Regresar a la página anterior si el usuario cancela
    };

    useEffect(() => {
        obtenerValvula();
    }, []);

    return (
        <div className="form-container">
            <h2>Editar Válvula</h2>
            <form onSubmit={actualizarValvula}>
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
                    placeholder="Ubicación"
                    value={ubicacion}
                    onChange={(e) => setUbicacion(e.target.value)}
                    required
                    className="form-input"
                />
                <input
                    type="text"
                    placeholder="Estado"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
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
                    <button type="submit" className="submit-btn">Actualizar</button>
                    <button type="button" onClick={cancelarEdicion} className="cancel-btn">Cancelar</button>
                </div>
            </form>
        </div>

    );
};

export default ValvulaEdit;
