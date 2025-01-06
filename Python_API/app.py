from Engine.engine import Engine
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# origins = [
#     "http://192.169.1.116",
#     "http://localhost"
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
def all_users():
    return engine.get_all_users()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)