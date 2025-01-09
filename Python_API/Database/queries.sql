DROP TABLE UserToken;
DROP TABLE Persona;

CREATE TABLE Persona (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    telefono TEXT,
    edad INTEGER,
    passw TEXT NOT NULL
);

CREATE TABLE UserToken(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_user INTEGER NOT NULL,
    user_token TEXT NOT NULL,
    FOREIGN KEY (id_user) REFERENCES Persona(id)
);

INSERT INTO Persona (nombre, telefono, edad, passw) VALUES ('Juan Perez', '5551234567', 30, 'password123');
INSERT INTO UserToken (id_user, user_token) VALUES (1,"token123");

SELECT P.*, 'ESPACE', ut.* FROM Persona p
INNER JOIN UserToken ut ON p.id = ut.id_user
WHERE p.id = 1;