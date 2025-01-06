function LookAllUsers() {
    const getAllUsers = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        
    }
    


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