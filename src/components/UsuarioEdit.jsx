import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/FormularioRegistro.css";

const UsuarioEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: "",
        correo: "",
        password: "", // Contraseña vacía por defecto
        rol: "Usuario",
        fecha_nacimiento: "",
        sexo: "Masculino",
        foto: null, // Foto no editable
    });
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Obtener los datos del usuario al cargar el formulario
    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/usuarios/${id}`)
            .then((response) => {
                const userData = response.data;

                // Asegurarse de que la fecha esté en formato YYYY-MM-DD
                if (userData.fecha_nacimiento) {
                    userData.fecha_nacimiento = new Date(userData.fecha_nacimiento)
                        .toISOString()
                        .split("T")[0];
                }

                setFormData({
                    nombre: userData.nombre,
                    correo: userData.correo,
                    password: "", // No mostrar la contraseña actual
                    rol: userData.rol,
                    fecha_nacimiento: userData.fecha_nacimiento,
                    sexo: userData.sexo,
                    foto: userData.foto, // Mostrar foto actual (no editable)
                });
            })
            .catch((error) => console.error(error));
    }, [id]);

    const handleChange = (e) => {
        setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const handleCancel = () => {
        navigate(-1); // Redirige a la página anterior
    };

    const isPasswordValid = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
        return regex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar que todos los campos obligatorios estén completos
        if (!formData.nombre || !formData.correo || !formData.fecha_nacimiento || !formData.sexo || !formData.rol) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        // Validar la contraseña solo si se ha introducido una nueva
        if (formData.password && !isPasswordValid(formData.password)) {
            setError("La contraseña debe tener al menos 10 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos.");
            return;
        }

        setError(""); // Limpiar mensaje de error
        setSuccessMessage(""); // Limpiar mensaje de éxito

        // Crear un nuevo objeto FormData
        const formDataToSend = new FormData();

        // Asegurarse de no enviar la contraseña si no se ha cambiado
        Object.entries(formData).forEach(([key, value]) => {
            if (key !== "foto") { // No agregar el campo foto
                formDataToSend.append(key, value);
            }
        });

        try {
            const response = await axios.put(`http://localhost:3000/api/usuarios/${id}`, formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setSuccessMessage(response.data.message);
            navigate(-1);// Redirige después de la actualización
        } catch (error) {
            setError(error.response ? error.response.data.error : "Error al actualizar usuario");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md border-2 border-gray-300">
                <h2 className="text-2xl font-bold mb-4 text-center">Editar Usuario</h2>
                {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-2">{error}</div>}
                {successMessage && <div className="bg-green-100 text-green-700 p-2 rounded mb-2">{successMessage}</div>}

                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-2"
                />
                <input
                    type="email"
                    name="correo"
                    placeholder="Correo"
                    value={formData.correo}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-2"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña (dejar vacía para no cambiar)"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-2"
                />
                <input
                    type="date"
                    name="fecha_nacimiento"
                    value={formData.fecha_nacimiento}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-2"
                />
                <select
                    name="sexo"
                    value={formData.sexo}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-2"
                >
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                </select>
                <select
                    name="rol"
                    value={formData.rol}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-4"
                >
                    <option value="Administrador">Administrador</option>
                    <option value="Usuario">Usuario</option>
                    <option value="Sistema">Sistema</option>
                </select>

                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                    >
                        Actualizar
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition"
                    >
                        Cancelar
                    </button>
                </div>
            </form>

            <style jsx>{`
                                .form-container {
                    background-color: #1D1D1D;
                    padding: 20px;
                    border-radius: 15px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                }

                .form-container h2 {
                    text-align: center;
                    color: #99b0e2;
                    font-size: 1.8rem;
                    margin-bottom: 20px;
                }

                /* Estilo de los inputs */
                .form-input {
                    background-color: #333;
                    color: white;
                    border: 1px solid #444;
                    padding: 12px;
                    margin-bottom: 15px;
                    border-radius: 8px;
                    width: 100%;
                    font-size: 14px;
                    transition: background-color 0.3s ease;
                }

                .form-input:focus {
                    background-color: #444;
                    outline: none;
                }

                /* Estilo de los botones */
                .form-buttons {
                    display: flex;
                    justify-content: space-between;
                    gap: 10px;
                }

                .submit-btn, .cancel-btn {
                    background-color: #2C3E50;
                    color: white;
                    padding: 12px 18px;
                    border-radius: 8px;
                    font-size: 14px;
                    cursor: pointer;
                    transition: background-color 0.3s ease, transform 0.3s ease;
                    width: 48%;
                }

                .submit-btn:hover, .cancel-btn:hover {
                    background-color: #34495E;
                    transform: scale(1.05);
                }

                .cancel-btn {
                    background-color: #072441;
                }

                .cancel-btn:hover {
                    background-color: #2b8ec0;
                }

                /* Mensajes de error y éxito */
                .error-message, .success-message {
                    text-align: center;
                    padding: 10px;
                    margin-bottom: 10px;
                    border-radius: 5px;
                    font-size: 14px;
                }

                .error-message {
                    background-color: #e74c3c;
                    color: white;
                }

                .success-message {
                    background-color: #2ecc71;
                    color: white;
                }
            `}</style>
        </div>
    );
};

export default UsuarioEdit;
