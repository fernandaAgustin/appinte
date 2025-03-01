import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../estilo.css'

const RiegoEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [valvulaId, setValvulaId] = useState('');
    const [cantidadAgua, setCantidadAgua] = useState('');
    const [duracion, setDuracion] = useState('');
    const [fechaRiego, setFechaRiego] = useState('');

    const obtenerRiego = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/riegos/${id}`);
            const riego = response.data;

            // Convertir fecha al formato YYYY-MM-DD
            const fechaFormateada = riego.fecha_riego.split('T')[0]; 

            setValvulaId(riego.valvula_id);
            setCantidadAgua(riego.cantidad_agua);
            setDuracion(riego.duracion);
            setFechaRiego(fechaFormateada);
        } catch (error) {
            console.error('Error al obtener el riego:', error);
        }
    };

    const actualizarRiego = async (e) => {
        e.preventDefault();
        const datosActualizados = {
            valvula_id: valvulaId,
            cantidad_agua: cantidadAgua,
            duracion: duracion,
            fecha_riego: fechaRiego
        };

        try {
            await axios.put(`http://localhost:3000/api/riegos/${id}`, datosActualizados);
            alert('Riego actualizado con éxito');
            // Regresa a la página anterior
            navigate(-1);
        } catch (error) {
            console.error('Error al actualizar el riego:', error);
        }
    };

    useEffect(() => {
        obtenerRiego();
    }, []);

    return (
        <form onSubmit={actualizarRiego} className="form-container">
            <h2>Editar Riego</h2>
            <input
                type="text"
                placeholder="Válvula ID"
                value={valvulaId}
                onChange={(e) => setValvulaId(e.target.value)}
                required
                className="form-input"
            />
            <input
                type="number"
                placeholder="Cantidad de Agua (L)"
                value={cantidadAgua}
                onChange={(e) => setCantidadAgua(e.target.value)}
                required
                className="form-input"
            />
            <input
                type="number"
                placeholder="Duración (min)"
                value={duracion}
                onChange={(e) => setDuracion(e.target.value)}
                required
                className="form-input"
            />
            <input
                type="date"
                value={fechaRiego}
                onChange={(e) => setFechaRiego(e.target.value)}
                required
                className="form-input"
            />
            <div className="form-buttons">
                <button type="submit" className="submit-btn">Actualizar</button>
                <button type="button" onClick={() => navigate(-1)} className="cancel-btn">Cancelar</button>
            </div>
        </form>

    );
};

export default RiegoEdit;
