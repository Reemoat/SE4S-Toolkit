CREATE DATABASE SE4SToolkit;

USE SE4SToolkit;

CREATE TABLE Canvas
(
canvas_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
width int NOT NULL,
height int NOT NULL
);

CREATE TABLE Elements
(	
element_Id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
shape varchar(8),
x int,
y int,
x2 int,
y2 int
);

CREATE TABLE Texts
(
text_Id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
fk_element int,
content varchar(2048),
x1 int,
x2 int,
y1 int,
y2 int,
FOREIGN KEY (fk_element) REFERENCES Elements(element_Id)
);

CREATE TABLE Connections
(
connections_Id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
fk_source int,
fk_destination int,
connection_type varchar(128),
decomposition_type varchar(128),
FOREIGN KEY (fk_source) REFERENCES Elements(element_Id),
FOREIGN KEY (fk_destination) REFERENCES Elements(element_Id)
);
