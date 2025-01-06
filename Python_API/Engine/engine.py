from DAL.dal import DAL
from fastapi.responses import JSONResponse
from Models.persona import Persona

class Engine:
    db_path = "Database/dbtest.db"

    def __init__(self):
        self.dal = DAL(self.db_path)

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
