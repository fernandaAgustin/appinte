import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { TextField, Button, Box, Typography, Grid, Alert, Zoom, InputAdornment, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { Person, Email, Lock, PersonAdd, CalendarToday, Male, Female, AccountCircle } from "@mui/icons-material";
=======
>>>>>>> dfe6f50d8f1790ae81823ba127caadcd9d52de9e

const NewUsuario = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: "",
        correo: "",
        password: "",
        rol: "Usuario",
        foto: null,
        fecha_nacimiento: "",
        sexo: "Masculino",
    });
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const handleFileChange = (e) => {
        setFormData((prevState) => ({ ...prevState, foto: e.target.files[0] }));
    };

    const handleCancel = () => {
        navigate(-1); // Regresa a la página anterior
    };

    const isPasswordValid = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
        return regex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.nombre || !formData.correo || !formData.password || !formData.fecha_nacimiento || !formData.sexo || !formData.foto || !formData.rol) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        if (!isPasswordValid(formData.password)) {
            setError("La contraseña debe tener al menos 10 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos.");
            return;
        }

        setError("");
        setSuccessMessage("");

        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => formDataToSend.append(key, value));

        try {
            const response = await axios.post("http://localhost:3000/api/usuarios", formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setSuccessMessage(response.data.message);
            setFormData({
                nombre: "",
                correo: "",
                password: "",
                rol: "Usuario",
                foto: null,
                fecha_nacimiento: "",
                sexo: "Masculino",
            });
        } catch (error) {
            setError(error.response ? error.response.data.error : "Error al registrar usuario");
        }
    };

    return (
<<<<<<< HEAD
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage: "url('https://example.com/your-background-image.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                padding: 1,
                "::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    zIndex: 2,
                },
            }}
        >
            <Zoom in={true} timeout={1000}>
                <Box
                    sx={{
                        position: "relative",
                        zIndex: 3,
                        width: { xs: "100%", sm: "80%", md: "60%" },
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        padding: 3,
                        borderRadius: 3,
                        backdropFilter: "blur(10px)",
                    }}
                >
                    <Typography variant="h5" gutterBottom textAlign="center" sx={{ color: "#0F2F24" }}>
                        Registro de Usuario
                    </Typography>

                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}

                    <form onSubmit={handleSubmit}>
                        <Box display="grid" gridTemplateColumns="1fr" gap={2} sx={{ marginBottom: 2 }}>
                            <TextField
                                fullWidth
                                label="Nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                name="nombre"
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Person />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Correo"
                                value={formData.correo}
                                onChange={handleChange}
                                name="correo"
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Contraseña"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                name="password"
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Fecha de Nacimiento"
                                type="date"
                                value={formData.fecha_nacimiento}
                                onChange={handleChange}
                                name="fecha_nacimiento"
                                required
                                InputLabelProps={{ shrink: true }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CalendarToday />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <input
                                type="file"
                                name="foto"
                                onChange={handleFileChange}
                                required
                                style={{ display: "none" }}
                                id="foto"
                            />
                            <label htmlFor="foto">
                                <Button variant="contained" component="span" fullWidth>
                                    Subir Foto
                                </Button>
                            </label>
                            <FormControl fullWidth required>
                                <InputLabel>Sexo</InputLabel>
                                <Select
                                    name="sexo"
                                    value={formData.sexo}
                                    onChange={handleChange}
                                    startAdornment={<Male />}
                                    label="Sexo"
                                >
                                    <MenuItem value="Masculino">Masculino</MenuItem>
                                    <MenuItem value="Femenino">Femenino</MenuItem>
                                    <MenuItem value="Otro">Otro</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth required>
                                <InputLabel>Rol</InputLabel>
                                <Select
                                    name="rol"
                                    value={formData.rol}
                                    onChange={handleChange}
                                    startAdornment={<AccountCircle />}
                                    label="Rol"
                                >
                                    <MenuItem value="Administrador">Administrador</MenuItem>
                                    <MenuItem value="Usuario">Usuario</MenuItem>
                                    <MenuItem value="Sistema">Sistema</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Grid container spacing={2} sx={{ marginTop: 2 }}>
                            <Grid item xs={6}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{
                                        "&:hover": { backgroundColor: "#44556f" },
                                    }}
                                >
                                    Registrar
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    fullWidth
                                    onClick={handleCancel}
                                    sx={{
                                        "&:hover": { backgroundColor: "#f1f1f1" },
                                    }}
                                >
                                    Cancelar
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Zoom>
        </Box>
=======
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md border-2 border-gray-300">
                <h2 className="text-2xl font-bold mb-4 text-center">Registro</h2>
                {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-2">{error}</div>}
                {successMessage && <div className="bg-green-100 text-green-700 p-2 rounded mb-2">{successMessage}</div>}

                <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
                <input type="email" name="correo" placeholder="Correo" value={formData.correo} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
                <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
                <input type="file" name="foto" onChange={handleFileChange} className="w-full p-2 border rounded mb-2" />
                <input type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
                <select name="sexo" value={formData.sexo} onChange={handleChange} className="w-full p-2 border rounded mb-2">
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                </select>
                <select name="rol" value={formData.rol} onChange={handleChange} className="w-full p-2 border rounded mb-4">
                    <option value="Administrador">Administrador</option>
                    <option value="Usuario">Usuario</option>
                    <option value="Sistema">Sistema</option>
                </select>
                <div className="flex gap-2">
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">Registrarse</button>
                    <button type="button" onClick={handleCancel} className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition">Cancelar</button>
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

export default NewUsuario;
