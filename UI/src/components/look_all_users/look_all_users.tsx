function LookAllUsers() {
    return (
        <div className="form-container">
            <h2>Ver todo</h2>

            <label htmlFor="token">Token:</label>
            <input type="text" id="token" name="token" />

            <button type="submit">Get All Users</button>
        </div>
    );
};

export default LookAllUsers;