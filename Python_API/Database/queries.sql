CREATE TABLE Persona (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    telefono TEXT,
    edad INTEGER,
    passw TEXT NOT NULL
);

INSERT INTO Persona (nombre, telefono, edad, passw) VALUES 
('Juan Perez', '5551234567', 30, 'password123'),
('Maria Lopez', '5559876543', 25, 'maria_pass'),
('Carlos Gomez', '5557654321', 40, 'carlos123');