import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { TextField, Button, Alert, Box, Typography, Zoom, InputAdornment } from "@mui/material";
import { Send, PersonAdd, LockOpen, ModelTraining, AutoAwesome, Email, Lock } from "@mui/icons-material";
import backgroundImage from "../img/ejemp.jpg";

=======
import "../css/FormularioLogin.css";
//1234@Iriss
>>>>>>> dfe6f50d8f1790ae81823ba127caadcd9d52de9e

const FormularioLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ correo: "", password: "" });
    const [error, setError] = useState("");
    const [isBlocked, setIsBlocked] = useState(false);
    const [showReset, setShowReset] = useState(false);
<<<<<<< HEAD
    const [showRegister, setShowRegister] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const [resetCode, setResetCode] = useState("");
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [codeError, setCodeError] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);

=======
    const [resetEmail, setResetEmail] = useState("");
    const [resetCode, setResetCode] = useState("");
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [codeError, setCodeError] = useState(""); 
    const [isVerifying, setIsVerifying] = useState(false); 
>>>>>>> dfe6f50d8f1790ae81823ba127caadcd9d52de9e
    const handleChange = (e) => {
        if (showRegister) {
            setRegisterData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
        } else {
            setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
        }
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

<<<<<<< HEAD

=======
>>>>>>> dfe6f50d8f1790ae81823ba127caadcd9d52de9e
    const handleForgotPassword = async () => {
        try {
            await axios.post("http://localhost:3000/api/send-reset-code", { correo: resetEmail });
            setShowCodeInput(true);
        } catch (error) {
            setError("Error al enviar el código de recuperación.");
        }
    };

    const handleVerifyCode = async () => {
<<<<<<< HEAD
        setIsVerifying(true);
=======
        console.log("Enviando:", { correo: resetEmail, codigo: resetCode });

        setIsVerifying(true); 
>>>>>>> dfe6f50d8f1790ae81823ba127caadcd9d52de9e

        try {
            const response = await axios.post("http://localhost:3000/api/verify-reset-code", {
                correo: resetEmail,
                codigo: resetCode,
            });

            if (response.data.success) {
                navigate("/reset-password", { state: { correo: resetEmail, codigo: resetCode } });
            } else {
                setCodeError("El código ingresado es incorrecto o ha expirado.");
            }
        } catch (error) {
            setCodeError(error.response?.data?.message || "Error al verificar el código.");
        } finally {
<<<<<<< HEAD
            setIsVerifying(false);
=======
            setIsVerifying(false); 
>>>>>>> dfe6f50d8f1790ae81823ba127caadcd9d52de9e
        }
    };

    const handleCancelReset = () => {
        setShowReset(false);
        setResetEmail("");
        setResetCode("");
    };

    return (
<<<<<<< HEAD
        <Box
            display="flex"
            justifyContent="space-between" // Cambiado para alineación a la izquierda y texto a la derecha
            alignItems="center"
            minHeight="100vh"
            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                backgroundRepeat: "no-repeat",
                padding: 4,
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
            {/* Caja para el formulario */}
            <Zoom in={true} timeout={1000}>
                <Box
                    sx={{
                        position: "relative",
                        zIndex: 3,
                        width: { xs: "90%", md: "30%" },
                        backgroundColor: "rgba(255, 255, 255, 0.28)",
                        padding: 4,
                        borderRadius: 3,
                        backdropFilter: "blur(10px)",
                    }}
                >
                    <Typography variant="h5" gutterBottom textAlign="center" sx={{ color: "#0F2F24" }}>
                        {showReset ? "Recuperar Contraseña" : "Iniciar Sesión"}
                    </Typography>
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                    {/* Formulario de inicio de sesión */}
                    {!showReset && !showRegister ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Correo"
                                type="email"
                                name="correo"
                                value={formData.correo}
                                onChange={handleChange}
                                disabled={isBlocked}
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
                                margin="normal"
                                label="Contraseña"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                disabled={isBlocked}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                color="success"
                                sx={{
                                    mt: 2, "&:hover": {
                                        backgroundColor: "#44556f",
                                    },
                                }}
                                onClick={handleSubmit}
                                disabled={isBlocked}
                                endIcon={<Send />}
                            >
                                Iniciar Sesión
                            </Button>
                            <Button
                                fullWidth
                                sx={{
                                    mt: 1, color: "#0F2F24", "&:hover": {
                                        backgroundColor: "#44556f",
                                    },
                                }}
                                onClick={() => setShowReset(true)}
                            >
                                ¿Olvidaste tu contraseña?
                            </Button>
                            <Button
                                fullWidth
                                sx={{
                                    mt: 1,
                                    color: "#0F2F24",
                                    "&:hover": {
                                        backgroundColor: "#44556f",
                                    },
                                }}
                                component="a" // Esto convierte el botón en un enlace
                                href="/register" // El enlace a la página de registro
                            >
                                ¿No tienes una cuenta? Regístrate aquí
                            </Button>
                        </form>
                    ) : !showCodeInput ? (
                        <div>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Correo"
                                type="email"
                                value={resetEmail}
                                onChange={(e) => setResetEmail(e.target.value)}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                color="success"
                                sx={{
                                    mt: 2, "&:hover": {
                                        backgroundColor: "#44556f",
                                    },
                                }}
                                onClick={handleForgotPassword}
                            >
                                Enviar Código
                            </Button>
                            <Button
                                fullWidth
                                sx={{
                                    mt: 1, color: "green", "&:hover": {
                                        backgroundColor: "red",
                                    },
                                }}
                                onClick={handleCancelReset}
                            >
                                Cancelar
                            </Button>
                        </div>
                    ) : (
                        <div>
                            {codeError && <Alert severity="error" sx={{ mb: 2 }}>{codeError}</Alert>}
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Código de recuperación"
                                value={resetCode}
                                onChange={(e) => setResetCode(e.target.value)}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                color="success"
                                sx={{ mt: 2 }}
                                onClick={handleVerifyCode}
                                disabled={isVerifying}
                            >
                                {isVerifying ? "Verificando..." : "Verificar Código"}
                            </Button>
                            <Button
                                fullWidth
                                sx={{ mt: 1, color: "red" }}
                                onClick={handleCancelReset}
                            >
                                Cancelar
                            </Button>
                        </div>
                    )}
                </Box>
            </Zoom>

            {/* Texto flotante a la derecha con zoom */}
            <Zoom in={true} timeout={1000}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "20%",
                        right: "10%",
                        zIndex: 2,
                        color: "#0F2F24",
                        backgroundColor: "rgba(255, 255, 255, 0.33)",
                        padding: 3,
                        borderRadius: 3,
                        backdropFilter: "blur(10px)",
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>
                        <AutoAwesome sx={{ mr: 1 }} /> ¡Bienvenido a nuestro portal!
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2, display: "flex", alignItems: "center" }}>
                        <LockOpen sx={{ mr: 1 }} /> Accede a todas nuestras funcionalidades y beneficios exclusivos.
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2, display: "flex", alignItems: "center" }}>
                        <PersonAdd sx={{ mr: 1 }} /> ¿Aún no tienes cuenta? Regístrate ahora y empieza a disfrutar de nuestras ventajas.
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, fontWeight: "bold", display: "flex", alignItems: "center" }}>
                        <ModelTraining sx={{ mr: 1 }} /> ¡Es fácil y rápido! Regístrate en pocos pasos.
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        <strong>En nuestro sistema, existen tres roles principales:</strong>
                        <ul>
                            <li><strong>Administrador:</strong>  Acceso completo a la gestión del sistema.</li>
                            <li><strong>Supervisor:</strong> Acceso a la gestión de usuarios y reportes.</li>
                            <li><strong>Usuario:</strong> Acceso limitado a su propio perfil y funciones básicas.</li>
                        </ul>
                    </Typography>
                </Box>
            </Zoom>
        </Box>
=======
        <div className="login-container">
            {!showReset ? (
                <form onSubmit={handleSubmit} className="login-form">
                    <h2>Iniciar Sesión</h2>
                    {error && <div className="error">{error}</div>}
                    <input
                        type="email"
                        name="correo"
                        placeholder="Correo"
                        value={formData.correo}
                        onChange={handleChange}
                        className="input-field"
                        disabled={isBlocked}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        className="input-field"
                        disabled={isBlocked}
                    />
                    <button type="submit" className="btn-login" disabled={isBlocked}>
                        Iniciar Sesión
                    </button>
                    <center><button type="button" className="forgot-password" onClick={() => setShowReset(true)}>
                        ¿Olvidaste tu contraseña?
                    </button></center>
                    <div className="register-link">
                        <p>¿No tienes una cuenta? <a href="/register">Regístrate aquí</a></p>
                    </div>
                </form>
            ) : !showCodeInput ? (
                <div className="reset-container">
                    <h2>Recuperar Contraseña</h2>
                    <input
                        type="email"
                        placeholder="Ingresa tu correo"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        className="input-field"
                    />
                    <button onClick={handleForgotPassword} className="btn-login">
                        Enviar Código
                    </button>
                    <button onClick={handleCancelReset} className="btn-cancel">
                        Cancelar
                    </button>
                </div>
            ) : (
                <div className="reset-container">
                    <h2>Ingresar Código</h2>
                    {codeError && <div className="error">{codeError}</div>}
                    <input
                        type="text"
                        placeholder="Código de recuperación"
                        value={resetCode}
                        onChange={(e) => setResetCode(e.target.value)}
                        className="input-field"
                    />
                    <button onClick={handleVerifyCode} className="btn-login" disabled={isVerifying}>
                        {isVerifying ? "Verificando..." : "Verificar Código"}
                    </button>
                    <button onClick={handleCancelReset} className="btn-cancel">
                        Cancelar
                    </button>
                </div>
            )}
        </div>
>>>>>>> dfe6f50d8f1790ae81823ba127caadcd9d52de9e
    );
};

export default FormularioLogin;