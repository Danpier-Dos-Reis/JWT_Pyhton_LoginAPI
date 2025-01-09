from Engine.engine import Engine
from fastapi import FastAPI, Body, Query
from fastapi.middleware.cors import CORSMiddleware

# origins = [
#     "http://192.168.1.139"
# ]

app = FastAPI()

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Crear instancia de Engine
engine = Engine()

# Endpoint para obtener todos los usuarios
@app.get("/get_all_users")
def all_users(token:str = Query(...)):
    return engine.get_all_users(token)

# Endpoint para obtener un usuario por ID con token
@app.get("/get_user")
def get_user(token: str = Query(...), user_id: int = Query(...)):
    return engine.get_user_by_id(token, user_id)

# Endpoint para obtener el token un usuario
@app.get("/get_user_token")
def get_user_token(nombre: str = Query(...), password: str = Query(...)):
    return engine.get_user_token(nombre, password)

# Endpoint para crear un usuario
@app.post("/create_user")
def create_user(
    nombre: str = Body(...),
    telefono: str = Body(None),
    edad: int = Body(None),
    passw: str = Body(...)
):
    return engine.create_user(nombre, telefono, edad, passw)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)