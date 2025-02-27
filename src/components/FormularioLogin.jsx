import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Box,TextField,Button,Typography,Avatar,Paper,InputAdornment,} from "@mui/material";
import {Email as EmailIcon,Lock as LockIcon, ArrowForward as ArrowForwardIcon, PersonAdd as PersonAddIcon,} from "@mui/icons-material";

const FormularioLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ correo: "", password: "" });
    const [error, setError] = useState("");
    const [isBlocked, setIsBlocked] = useState(false);
    const [showReset, setShowReset] = useState(false);

    const handleChange = (e) => {
        setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.correo || !formData.password) {
            setError("Todos los campos son obligatorios.");
            return;
        }
        try {
            const response = await axios.post("http://localhost:3000/api/login", formData);
            if (response.data.success) {
                localStorage.setItem("usuario", JSON.stringify(response.data.usuario));
                navigate("/perfil");
            } else {
                setError("Correo o contraseña incorrectos.");
            }
        } catch (error) {
            setError("Error al conectar con el servidor.");
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "10vh",
                background: "#e0e0e0",
                borderRadius: 4,
            }}
        >
            <Paper
                elevation={10}
                sx={{
                    padding: 4,
                    borderRadius: 4,
                    maxWidth: 400,
                    width: "100%",
                    textAlign: "center",
                    position: "relative",
                }}
            >
                <Avatar
                    src="/src/img/logo.png"
                    alt="Logo"
                    sx={{
                        width: 85,
                        height: 85,
                        margin: "0 auto",
                        marginBottom: 2,
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    }}
                />
                <Typography variant="h6" gutterBottom>
                    Iniciar Sesión
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    label="Correo"
                    type="email"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    disabled={isBlocked}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    label="Contraseña"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isBlocked}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{ marginTop: 2 }}
                    endIcon={<ArrowForwardIcon />}
                >
                    Iniciar Sesión
                </Button>
                <Button
                    fullWidth
                    variant="text"
                    color="secondary"
                    sx={{ marginTop: 1 }}
                    onClick={() => setShowReset(true)}
                >
                    ¿Olvidaste tu contraseña?
                </Button>
                <Typography variant="body2" sx={{ marginTop: 2 }}>
                    ¿No tienes una cuenta?{" "}
                    <a
                        href="/register"
                        style={{
                            textDecoration: "none",
                            color: "#3f51b5",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <PersonAddIcon sx={{ marginRight: 0.5 }} />
                        Regístrate aquí
                    </a>
                </Typography>
            </Paper>
        </Box>
    );
};

export default FormularioLogin;
