import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Box, CircularProgress, InputAdornment } from "@mui/material";
import { AccountCircle, Email, Lock, Cake, Male, Female, Person } from "@mui/icons-material";
import { Fade } from '@mui/material';

const UsuarioEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: "",
        correo: "",
        password: "",
        rol: "Usuario",
        fecha_nacimiento: "",
        sexo: "Masculino",
        foto: null,
    });
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:3000/api/usuarios/${id}`)
            .then((response) => {
                const userData = response.data;

                if (userData.fecha_nacimiento) {
                    userData.fecha_nacimiento = new Date(userData.fecha_nacimiento)
                        .toISOString()
                        .split("T")[0];
                }

                setFormData({
                    nombre: userData.nombre,
                    correo: userData.correo,
                    password: "",
                    rol: userData.rol,
                    fecha_nacimiento: userData.fecha_nacimiento,
                    sexo: userData.sexo,
                    foto: userData.foto,
                });
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, [id]);

    const handleChange = (e) => {
        setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const handleCancel = () => {
<<<<<<< HEAD
        navigate(-1);
=======
        navigate(-1); // Redirige a la página anterior
>>>>>>> dfe6f50d8f1790ae81823ba127caadcd9d52de9e
    };

    const isPasswordValid = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
        return regex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.nombre || !formData.correo || !formData.fecha_nacimiento || !formData.sexo || !formData.rol) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        if (formData.password && !isPasswordValid(formData.password)) {
            setError("La contraseña debe tener al menos 10 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos.");
            return;
        }

        setError("");
        setSuccessMessage("");

        const formDataToSend = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (key !== "foto") {
                formDataToSend.append(key, value);
            }
        });

        setLoading(true);
        try {
            const response = await axios.put(`http://localhost:3000/api/usuarios/${id}`, formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setSuccessMessage(response.data.message);
<<<<<<< HEAD
            navigate(-1);
=======
            navigate(-1);// Redirige después de la actualización
>>>>>>> dfe6f50d8f1790ae81823ba127caadcd9d52de9e
        } catch (error) {
            setError(error.response ? error.response.data.error : "Error al actualizar usuario");
        } finally {
            setLoading(false);
        }
    };

    return (
<<<<<<< HEAD
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            <Fade in={true} timeout={1000}>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        backgroundColor: 'white',
                        padding: 4,
                        borderRadius: 2,
                        boxShadow: 3,
                        width: '100%',
                        maxWidth: 400,
                        transition: 'transform 0.5s ease',
                        '&:hover': {
                            transform: 'scale(1.05)',
                        },
                    }}
=======
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
>>>>>>> dfe6f50d8f1790ae81823ba127caadcd9d52de9e
                >
                    <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Editar Usuario</h2>
                    {error && <Box sx={{ backgroundColor: '#f8d7da', color: '#721c24', padding: 2, marginBottom: 2, borderRadius: 1 }}>{error}</Box>}
                    {successMessage && <Box sx={{ backgroundColor: '#d4edda', color: '#155724', padding: 2, marginBottom: 2, borderRadius: 1 }}>{successMessage}</Box>}

<<<<<<< HEAD
                    <TextField
                        label="Nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        fullWidth
                        required
                        sx={{ marginBottom: 2 }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><AccountCircle /></InputAdornment>,
                        }}
                    />

                    <TextField
                        label="Correo"
                        name="correo"
                        type="email"
                        value={formData.correo}
                        onChange={handleChange}
                        fullWidth
                        required
                        sx={{ marginBottom: 2 }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><Email /></InputAdornment>,
                        }}
                    />

                    <TextField
                        label="Contraseña (dejar vacía para no cambiar)"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><Lock /></InputAdornment>,
                        }}
                    />

                    <TextField
                        label="Fecha de Nacimiento"
                        name="fecha_nacimiento"
                        type="date"
                        value={formData.fecha_nacimiento}
                        onChange={handleChange}
                        fullWidth
                        required
                        sx={{ marginBottom: 2 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><Cake /></InputAdornment>,
                        }}
                    />

                    <FormControl fullWidth required sx={{ marginBottom: 2 }}>
                        <InputLabel>Sexo</InputLabel>
                        <Select
                            name="sexo"
                            value={formData.sexo}
                            onChange={handleChange}
                        >
                            <MenuItem value="Masculino"><Male /> Masculino</MenuItem>
                            <MenuItem value="Femenino"><Female /> Femenino</MenuItem>
                            <MenuItem value="Otro"><Person /> Otro</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth required sx={{ marginBottom: 2 }}>
                        <InputLabel>Rol</InputLabel>
                        <Select
                            name="rol"
                            value={formData.rol}
                            onChange={handleChange}
                        >
                            <MenuItem value="Administrador">Administrador</MenuItem>
                            <MenuItem value="Usuario">Usuario</MenuItem>
                            <MenuItem value="Sistema">Sistema</MenuItem>
                        </Select>
                    </FormControl>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Actualizar'}
                        </Button>
                        <Button
                            type="button"
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            onClick={handleCancel}
                            disabled={loading}
                        >
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </Fade>
        </Box>
=======
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
>>>>>>> dfe6f50d8f1790ae81823ba127caadcd9d52de9e
    );
};

export default UsuarioEdit;
