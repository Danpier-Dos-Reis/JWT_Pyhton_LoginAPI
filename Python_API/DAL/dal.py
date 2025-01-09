import sqlite3
import hashlib

class DAL:
    def __init__(self, db_path):
        # SQLite no es compatible con conexiones creadas en un hilo y usadas en
        # otro hilo. Cuando FastAPI maneja las peticiones, lo hace en hilos o
        # tareas asíncronas, por lo que no puedes usar una conexión SQLite
        # creada en un hilo principal directamente en los endpoints.

        #check_same_thread=False permite que SQLite sea accesible desde otros hilos
        self.connection = sqlite3.connect(db_path, check_same_thread=False)
        self.cursor = self.connection.cursor()

    def create_user(self, nombre, telefono, edad, passw):

        try:
            # Encrypt the password using SHA256
            encrypted_passw = hashlib.sha256(passw.encode()).hexdigest()

            self.cursor.execute("BEGIN TRANSACTION")
            query = """
            INSERT INTO Persona (nombre, telefono, edad, passw)
            VALUES (?, ?, ?, ?)
            """
            self.cursor.execute(query, (nombre, telefono, edad, encrypted_passw))
            self.connection.commit()

            return self.cursor.lastrowid
        except sqlite3.Error as e:
            self.connection.rollback()
            return f'Error al insertar los datos: {e}'
        
    def insert_token(self, user_id, token):
        try:
            self.cursor.execute("BEGIN TRANSACTION")
            query = """INSERT INTO UserToken (id_user, user_token) VALUES (?,?)"""
            self.cursor.execute(query,(user_id,token))
            self.connection.commit()

        except sqlite3.Error as e:
            self.connection.rollback()
            return f'Error al insertar los datos: {e}'

    def get_all_users(self):        
        query = "SELECT * FROM Persona"
        self.cursor.execute(query)
        return self.cursor.fetchall()

    def get_user_by_id(self, user_id):
        query = "SELECT * FROM Persona WHERE Id = ?"
        self.cursor.execute(query, (user_id))
        return self.cursor.fetchone()
    
    def get_user_token(self, username, password):
        encrypted_passw = hashlib.sha256(password.encode()).hexdigest()

        query = "SELECT ut.user_token FROM Persona p INNER JOIN UserToken ut ON p.id = ut.id_user WHERE nombre = ? and passw = ?"
        self.cursor.execute(query, (username, encrypted_passw))
        result = self.cursor.fetchone()

        if result:
            return result
        else:
            return None
        
    def update_user(self, user_id, nombre=None, telefono=None, edad=None, passw=None):
        updates = []
        params = []

        if nombre:
            updates.append("nombre = ?")
            params.append(nombre)
        if telefono:
            updates.append("telefono = ?")
            params.append(telefono)
        if edad:
            updates.append("edad = ?")
            params.append(edad)
        if passw:
            encrypted_passw = hashlib.sha256(passw.encode()).hexdigest()
            updates.append("passw = ?")
            params.append(encrypted_passw)

        params.append(user_id)

        query = f"UPDATE Persona SET {', '.join(updates)} WHERE Id = ?"
        self.cursor.execute(query, params)
        self.connection.commit()
        return self.cursor.rowcount

    def delete_user(self, user_id):
        query = "DELETE FROM Persona WHERE Id = ?"
        self.cursor.execute(query, (user_id,))
        self.connection.commit()
        return self.cursor.rowcount

    def __del__(self):
        self.connection.close()
