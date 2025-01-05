function GetTokenForm(){
    return (
        <div className="form-container">
            <h2>Obtener Token</h2>
            <form>
                <label htmlFor="usuario">Usuario:</label>
                <input type="text" id="usuario" name="usuario" required />

                <label htmlFor="password">Contraseña:</label>
                <input type="password" id="password" name="password" required />

                <button type="submit" className="get-token-button">Obtener Token</button>
            </form>
        </div>
    );
};

export default GetTokenForm;
