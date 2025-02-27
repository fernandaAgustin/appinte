import { useState } from "react";

const UploadExcel = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Por favor, selecciona un archivo");
            return;
        }
    
        const formData = new FormData();
        formData.append("file", file);
    
        try {
            const response = await fetch("http://localhost:3000/api/excel-valvulas", {
                method: "POST",
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error("Error al subir el archivo");
            }
    
            const result = await response.json();
            alert(result.message);
            onUploadSuccess();
        } catch (error) {
            console.error("Error al subir el archivo:", error);
            alert("Hubo un problema al subir el archivo. Inténtalo nuevamente.");
        }
    };       

    return (
        <div>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
            <button onClick={handleUpload}>Subir Excel</button>
        </div>
    );
};

export default UploadExcel;