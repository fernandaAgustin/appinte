import React, { useState } from 'react';
import axios from 'axios';
import '../estilo.css'

const SensorForm = () => {
    const [nombre, setNombre] = useState('');
    const [tipo, setTipo] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [fechaInstalacion, setFechaInstalacion] = useState('');

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
            setNombre('');
            setTipo('');
            setUbicacion('');
            setFechaInstalacion('');
        } catch (error) {
            console.error('Error al crear el sensor:', error);
        }
    };

    return (
        <form onSubmit={crearSensor}>
            <h2>Agregar Sensor</h2>
            <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Tipo"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
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
                type="date"
                value={fechaInstalacion}
                onChange={(e) => setFechaInstalacion(e.target.value)}
                required
            />
            <button type="submit">Guardar</button>
        </form>
    );
};

export default SensorForm;
