import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../estilo.css';

const RiegoForm = () => {
    const navigate = useNavigate();
    const [valvulaId, setValvulaId] = useState('');
    const [cantidadAgua, setCantidadAgua] = useState('');
    const [duracion, setDuracion] = useState('');
    const [fechaRiego, setFechaRiego] = useState('');

    const crearRiego = async (e) => {
        e.preventDefault();
        const nuevoRiego = {
            valvula_id: valvulaId,
            cantidad_agua: cantidadAgua,
            duracion: duracion,
            fecha_riego: fechaRiego
        };

        try {
            await axios.post('http://localhost:3000/api/riegos', nuevoRiego);
            alert('Riego creado con éxito');
            navigate(-1); // Regresa a la página anterior
        } catch (error) {
            console.error('Error al crear el riego:', error);
        }
    };

    return (
        <form onSubmit={crearRiego} className="form-container">
            <h2>Crear Riego</h2>
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
                <button type="submit" className="submit-btn">Crear</button>
                <button type="button" onClick={() => navigate(-1)} className="cancel-btn">Cancelar</button>
            </div>
        </form>
    );
};

export default RiegoForm;
