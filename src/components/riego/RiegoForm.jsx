import React, { useState } from 'react';
import axios from 'axios';
import '../estilo.css'

const RiegoForm = () => {
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
            setValvulaId('');
            setCantidadAgua('');
            setDuracion('');
            setFechaRiego('');
        } catch (error) {
            console.error('Error al crear el riego:', error);
        }
    };

    return (
        <form onSubmit={crearRiego}>
            <h2>Crear Riego</h2>
            <input
                type="text"
                placeholder="Válvula ID"
                value={valvulaId}
                onChange={(e) => setValvulaId(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Cantidad de Agua (L)"
                value={cantidadAgua}
                onChange={(e) => setCantidadAgua(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Duración (min)"
                value={duracion}
                onChange={(e) => setDuracion(e.target.value)}
                required
            />
            <input
                type="date"
                value={fechaRiego}
                onChange={(e) => setFechaRiego(e.target.value)}
                required
            />
            <button type="submit">Crear</button>
        </form>
    );
};

export default RiegoForm;
