import React, { useState } from "react";

function GetTokenForm(){
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [token, setToken] = useState(null);

    const handleSubmit = async (e:any) =>{
        e.preventDefault();

        try{
            const res = await fetch(`http://192.168.1.139:8000/get_user_token?nombre=${userName}&password=${userPassword}`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if(!res.ok){
                throw new Error("Error en la solicitud");
            }

            const data = await res.json();
            setToken(data);

        } catch (error) {
            console.error("Error al obtener el usuario:", error);
            setToken({ error: "No se pudo obtener el usuario." }); //Error pero funciona
        }
    };


    return (
        <div className="form-container">
            <h2>Obtener Token</h2>
            <form onSubmit={handleSubmit}>

                <label htmlFor="usuario">Username:</label>
                <input
                    type="text"
                    id="usuario"
                    name="usuario"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
                <br />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    required
                />
                <br />

                <button type="submit">Recuperar Token</button>
            </form>

            {token && (
                <div className="user-data">
                    <h3>Token del Usuario:</h3>
                    <pre style={{textAlign:"left"}}>{JSON.stringify(token, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default GetTokenForm;
