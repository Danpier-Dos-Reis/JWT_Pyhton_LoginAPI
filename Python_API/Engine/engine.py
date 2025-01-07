from DAL.dal import DAL
from fastapi.responses import JSONResponse
from Models.persona import Persona
from datetime import datetime, timedelta
import jwt  # pip install PyJWT
from jwt import DecodeError, ExpiredSignatureError

class Engine:
    db_path = "Database/dbtest.db"

    def __init__(self):
        self.dal = DAL(self.db_path)
        self.secret_key = "mysecretkey"  # Cambia esto por una clave más segura

    def generate_token(self, user_id):
        payload = {
            "user_id": user_id,
            "exp": datetime.utcnow() + timedelta(days=1)  # El token expira en 1 día
        }
        return jwt.encode(payload, self.secret_key, algorithm="HS256")

    def verify_token(self, token):
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=["HS256"])
            return payload["user_id"]
        except ExpiredSignatureError:
            return "Token expirado"
        except DecodeError:
            return "Token inválido"

    def convertToPersona(self, personas_db):
        personas = [
            Persona(
                Id=persona[0],
                nombre=persona[1],
                telefono=persona[2],
                edad=persona[3],
                passw=persona[4]
            )
            for persona in personas_db
        ]
        return personas

    def get_all_users(self):
        personas_db = self.dal.get_all_users()
        personas = self.convertToPersona(personas_db)
        return JSONResponse(content=[persona.dict() for persona in personas])

    def create_user(self, nombre, telefono, edad, contrasena):
        user_id = self.dal.create_user(nombre, telefono, edad, contrasena)
        token = self.generate_token(user_id)
        return JSONResponse(content={"token": token})

    def get_user_by_id(self, token, user_id):
        verified_user_id = self.verify_token(token)
        if isinstance(verified_user_id, str):
            return JSONResponse(content={"error": verified_user_id}, status_code=401)

        persona_db = self.dal.get_user_by_id(user_id)
        if persona_db:
            persona = Persona(
                Id=persona_db[0],
                nombre=persona_db[1],
                telefono=persona_db[2],
                edad=persona_db[3],
                passw=persona_db[4]
            )
            return JSONResponse(content=persona.dict())
        else:
            return JSONResponse(content={"error": "Usuario no encontrado"}, status_code=404)
