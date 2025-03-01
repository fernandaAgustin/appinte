import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 1️⃣ Importa useNavigate
import '../estilo.css';

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

    const cancelarFormulario = () => {
        navigate(-1); // Redirige a la página anterior cuando se cancela
    };

    return (
        <div className="form-container">
            <h2>Crear Válvula</h2>
            <form onSubmit={crearValvula}>
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
                    <button type="submit" className="submit-btn">Crear</button>
                    <button type="button" onClick={cancelarFormulario} className="cancel-btn">Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default ValvulaForm;
