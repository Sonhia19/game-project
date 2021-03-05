create database if not exists gameproject;

use gameproject;
CREATE TABLE IF NOT EXISTS PARTIDAS( 
ID INT NOT NULL AUTO_INCREMENT, 
ESTADO INT NOT NULL,
ID_GANADOR INT NULL,
FECHA DATE NOT NULL,
FECHA_MODIFICACION DATE NOT NULL,
PRIMARY KEY (ID));
insert into partidas values (1,2,3,curdate(),curdate());
commit;
CREATE TABLE IF NOT EXISTS JUGADORES(
ID INT NOT NULL AUTO_INCREMENT,
NOMBRE TEXT NOT NULL,
ID_PARTIDA INT NOT NULL,
BANDO SMALLINT NOT NULL,
TORRE_ACTIVA BIT NOT NULL,
TANQUE_ACTIVO BIT NOT NULL,
HANGAR_ACTIVO BIT NOT NULL,
PRIMARY KEY (ID), FOREIGN KEY (ID_PARTIDA) REFERENCES PARTIDAS(ID)
);

CREATE TABLE IF NOT EXISTS MAPA_DESPEJADO(
ID INT NOT NULL AUTO_INCREMENT,
ID_JUGADOR INT NOT NULL,
POSICION_X DOUBLE NOT NULL,
POSICION_Y DOUBLE NOT NULL,
PRIMARY KEY (ID), FOREIGN KEY (ID_JUGADOR) REFERENCES JUGADORES(ID)
);

CREATE TABLE IF NOT EXISTS AVIONES_CONFIG(
ID INT NOT NULL AUTO_INCREMENT,
NOMBRE TEXT NOT NULL,
VELOCIDAD DOUBLE NOT NULL,
CONSUMO_COMBUSTIBLE DOUBLE NOT NULL,
BLINDAJE DOUBLE NOT NULL,
PODER_FUEGO DOUBLE NOT NULL,
PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS AVIONES( 
ID INT NOT NULL AUTO_INCREMENT, 
ID_JUGADOR INT NOT NULL,
ID_AVION INT NOT NULL,
COMBUSTIBLE DOUBLE NOT NULL,
BLINDAJE DOUBLE NOT NULL,
TIENE_BOMBA BIT NOT NULL,
VUELO_ALTO BIT NOT NULL,
POSICION_X DOUBLE NOT NULL, 
POSIXION_Y DOUBLE NOT NULL,
PRIMARY KEY (ID), FOREIGN KEY (ID_JUGADOR) REFERENCES JUGADORES(ID), FOREIGN KEY (ID_AVION) REFERENCES AVIONES_CONFIG(ID));

CREATE TABLE IF NOT EXISTS ARTILLERIA_CONFIG(
ID INT NOT NULL AUTO_INCREMENT,
NOMBRE TEXT NOT NULL,
CADENCIA DOUBLE NOT NULL,
BLINDAJE DOUBLE NOT NULL,
ALCANCE DOUBLE NOT NULL,
PODER_FUEGO DOUBLE NOT NULL,
PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS ARTILLERIA(
ID INT NOT NULL AUTO_INCREMENT,
ID_JUGADOR INT NOT NULL,
ID_ARTILLERIA INT NOT NULL,
BLINDAJE DOUBLE NOT NULL,
POSICION_X DOUBLE NOT NULL,
POSICION_Y DOUBLE NOT NULL,
PRIMARY KEY (ID), FOREIGN KEY (ID_JUGADOR) REFERENCES JUGADORES(ID), FOREIGN KEY (ID_ARTILLERIA) REFERENCES ARTILLERIA_CONFIG(ID)
);
CREATE USER 'game_project'@'%' IDENTIFIED BY 'game_project';
GRANT ALL PRIVILEGES ON * . * TO 'game_project'@'%';
FLUSH PRIVILEGES;

-- QUITAR CANTIDADES DE AVIONES DE PARTIDAS
-- EQUIPO GANADOR CAMBIA POR ID_GANADOR (Identificador del jugador que haya ganado la partida, puede ser NULL)
-- SE QUITA TAMA�O DE AVIONES
-- SE QUITA TIPO DE AVIONES_CONFIG (EL NOMBRE ES EL TIPO)
-- SE AGREGA PODER_FUEGO A AVIONES_CONFIG
-- SE AGREGA VUELO_ALTO A AVIONES
-- SE AGREGA TABLA ARTILLERIA_CONFIG
-- SE QUITA VELOCIDAD, CONSUMO_COMBUSTIBLE, MUNICION, TAMA�O DE AVIONES (SON DATOS FIJOS DEL AVION, NO VARIAN EN LA PARTIDA)
-- TIENE_BOMBA SE HACE BOOL
-- SE QUITA CONSUMO DE AVIONES_CONFIG (TODOS LOS AVIONES COMIENZAN CON LA MISMA CANTIDAD DE COMBUSTIBLE, LO QUE VARIA ES EL CONSUMO)
-- SE QUITA MUNICION DE AVIONES_CONFIG (LA METRALLETA DE LOS AVIONES ES DE MUNICION INFINITA)
-- SE QUITA PRIMARY KEY COMPUESTA DE AVIONES
-- SE QUITA PRIMARY KEY COMPUESTA DE JUGADORES
-- SE AGREGA BANDO A JUGADORES
-- SE AGREGA TORRE_ACTIVA, HANGAR_ACTIVO, TANQUE_ACTIVO (ES NECESARIO GUARDAR ESTA INFORMACION PARA VOLVER A CARGAR LA PARTIDA)
-- SE AGREGA MAPA_DESPEJADO (ES NECESARIO GUARDAR ESTA INFORMACION PARA VOLVER A CARGAR LA PARTIDA Y DESPEJAR EL MAPA YA EXPLORADO)

-- [12:37, 25/2/2021] Santiago Ude: lo que si o si faltaba agregar, es toda la info de la artilleria y de las estructuras torre, hangar y tanque en la partida
-- [12:37, 25/2/2021] Santiago Ude: al levantar la partida guardada se tiene que saber si te quedan las 3 en pie, o solo 1