import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 1️⃣ Importa useNavigate
import '../estilo.css'

const ValvulaForm = () => {
    const navigate = useNavigate(); // 2️⃣ Define el hook
    const [nombre, setNombre] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [estado, setEstado] = useState('');
    const [fechaInstalacion, setFechaInstalacion] = useState('');

    const crearValvula = async (e) => {
        e.preventDefault();
        const nuevaValvula = {
            nombre,
            ubicacion,
            estado,
            fecha_instalacion: fechaInstalacion
        };

        try {
            await axios.post('http://localhost:3000/api/valvulas', nuevaValvula);
            alert('Válvula creada con éxito');
            setNombre('');
            setUbicacion('');
            setEstado('');
            setFechaInstalacion('');
            navigate('/valvula'); // 3️⃣ Redirige a "/valvula"
        } catch (error) {
            console.error('Error al crear la válvula:', error);
        }
    };

    return (
        <form onSubmit={crearValvula}>
            <h2>Crear Válvula</h2>
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
            <button type="submit">Crear</button>
        </form>
    );
};

export default ValvulaForm;

