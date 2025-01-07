import React, { useState } from "react";
import "./register_form.css";

function RegisterForm() {
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [edad, setEdad] = useState("");
    const [passw, setPassw] = useState("");
    const [token, setToken] = useState("");

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const userData = { nombre, telefono, edad: edad ? parseInt(edad) : null, passw };

        try {
            const response = await fetch("http://192.168.1.139:8000/create_user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if(!response.ok){
                throw new Error("Error en la solicitud");
            }

            const result = await response.json();
            setToken(result.token);
            alert("Usuario registrado exitosamente. Token: " + result.token);
            console.log(result.token);
        } catch (error) {
            console.error("Error al registrar el usuario:", error);
            alert("Ocurrió un error al registrar el usuario.");
        }
    };

    return (
        <div className="form-container">
            <h2>Formulario de Registro</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nombre">Nombre:</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />

                <label htmlFor="telefono">Teléfono:</label>
                <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                />

                <label htmlFor="edad">Edad:</label>
                <input
                    type="number"
                    id="edad"
                    name="edad"
                    value={edad}
                    onChange={(e) => setEdad(e.target.value)}
                    min="1"
                />

                <label htmlFor="passw">Contraseña:</label>
                <input
                    type="password"
                    id="passw"
                    name="passw"
                    value={passw}
                    onChange={(e) => setPassw(e.target.value)}
                    required
                />

                <button type="submit">Registrar</button>
            </form>
            {token && (
                <div className="user-data">
                    <h3>Token del Usuario:</h3>
                    <pre style={{textAlign:"left"}}>{token}</pre>
                </div>
            )}
        </div>
    );
}

export default RegisterForm;