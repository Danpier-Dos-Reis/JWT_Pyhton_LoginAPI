import React, { useState } from "react";
// import "./look_my_user.css";

function LookMyUser() {
    const [token, setToken] = useState("");
    const [userId, setUserId] = useState("");
    const [userData, setUserData] = useState(null);

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://192.168.1.139:8000/get_user?token=${token}&user_id=${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Error en la solicitud");
            }

            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error("Error al obtener el usuario:", error);
            setUserData({ error: "No se pudo obtener el usuario." }); //Error pero funciona
        }
    };

    return (
        <div className="form-container">
            <h2>Tu perfil</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="token">Token:</label>
                <input
                    type="text"
                    id="token"
                    name="token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    required
                />
                <br />

                <label htmlFor="id">Id:</label>
                <input
                    type="text"
                    id="id"
                    name="id"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                />
                <br />

                <button type="submit">Get User</button>
            </form>

            {userData && (
                <div className="user-data">
                    <h3>Datos del Usuario:</h3>
                    <pre>{JSON.stringify(userData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default LookMyUser;
