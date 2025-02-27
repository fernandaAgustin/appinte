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
        navigate("/usuarios"); // Redirige a la página principal
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
            setTimeout(() => navigate("/usuarios"), 2000); // Redirige después de la actualización
        } catch (error) {
            setError(error.response ? error.response.data.error : "Error al actualizar usuario");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
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
        </div>
    );
};

export default UsuarioEdit;
