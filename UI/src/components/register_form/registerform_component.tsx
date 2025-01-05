import "./register_form.css";

function RegisterForm() {
    return (
        <div className="form-container">
            <h2>Formulario de Registro</h2>
            <form action="/submit" method="POST">
                <label htmlFor="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" required />

                <label htmlFor="telefono">Teléfono:</label>
                <input type="tel" id="telefono" name="telefono" />

                <label htmlFor="edad">Edad:</label>
                <input type="number" id="edad" name="edad" min="1" />

                <label htmlFor="passw">Contraseña:</label>
                <input type="password" id="passw" name="passw" required />

                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default RegisterForm;