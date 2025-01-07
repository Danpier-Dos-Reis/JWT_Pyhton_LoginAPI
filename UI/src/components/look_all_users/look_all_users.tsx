import React, { useState } from "react";
import { data } from "react-router-dom";

function LookAllUsers() {
    const [token, setToken] = useState("");
    const [users, setUsers] = useState(null);

    const handleSubmit = async (e:any) =>{
        e.preventDefault();

        try{
            const res = await fetch(`http://192.168.1.139:8000/get_all_users?token=${token}`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if(!res.ok){
                throw new Error("Error en la solicitud");
            }

            const data = await res.json();
            setUsers(data);

        } catch (error) {
            console.error("Error al obtener el usuario:", error);
            setUsers({ error: "No se pudo obtener el usuario." }); //Error pero funciona
        }
    };
    
    return (
        <div className="form-container">
            <h2>Ver todo</h2>
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

                <button type="submit">Get All Users</button>
            </form>

            {users && (
                <div className="user-data">
                    <h3>Datos del Usuario:</h3>
                    <pre style={{textAlign:"left"}}>{JSON.stringify(users, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default LookAllUsers;