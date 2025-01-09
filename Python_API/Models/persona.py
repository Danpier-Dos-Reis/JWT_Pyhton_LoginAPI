# Es parte del paquete Pydantic, que ya viene incluido en FastAPI.
# Sin embargo, si ves algún error como ModuleNotFoundError: No module named 'pydantic',
# entonces necesitas instalar Pydantic con: pip install pydantic
from pydantic import BaseModel

class Persona(BaseModel):
    id: int
    nombre: str
    telefono: str | None = None
    edad: int | None = None
    passw: str