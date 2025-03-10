import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage"; 
import RegisterPage from "./pages/RegisterPage"; 
import PerfilPage from "./pages/PerfilPage";
import ResetPassword from "./components/ResetPassword";
import UsuarioPage from "./pages/UsuarioPage";
import EditPage from "./pages/EditPage";
import NusuPage from "./pages/NusuPage";
import SlistPage from "./pages/SlistPage";
import SeditPage from "./pages/SeditPage";
import SfromPage from "./pages/SformPage";
import Vepage from "./pages/VePage";
import Vlpage from "./pages/VlPage";
import Vrpage from "./pages/VrPage";
import RePage from "./pages/RePage";
import RlPage from "./pages/RlPage";
import RrPage from "./pages/RrPage";
import PruebaPage from "./pages/PuebaPage";
import ValvulaGraficas from "./components/valvulas/ValvulaGraficas";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} /> 
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/perfil" element={<PerfilPage />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/usuarios" element={<UsuarioPage />} />
      <Route path="/editUsuarios/:id" element={<EditPage />} />
      <Route path="/nuevoU" element={<NusuPage />} />
      <Route path="/sensores" element={<SlistPage />} />
      <Route path="/editSensores/:id" element={<SeditPage />} />
      <Route path="/nuevoSensores" element={<SfromPage />} />
      <Route path="/editar-valvula/:id" element={<Vepage />} />
      <Route path="/valvula" element={<Vlpage />} />
      <Route path="/nuevaVal" element={<Vrpage />} />
      <Route path="/editar-riego/:id" element={<RePage />} />
      <Route path="/riego" element={<RlPage />} />
      <Route path="/nuevoRiego" element={<RrPage />} />
      <Route path="/prueba" element={<PruebaPage />} />
      <Route path="/graficas" element={<ValvulaGraficas />} />
    </Routes>
  </BrowserRouter>
);