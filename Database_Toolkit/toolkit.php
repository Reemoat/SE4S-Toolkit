<?php
    $servername = "localhost";
    $username = "root";
    $password = "password";
    $dbname = "SE4SToolkit";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // begin the transaction
    $conn->beginTransaction();
    // our SQL statememtns
    $conn->exec("INSERT INTO Canvas (width, height) 
    VALUES ()");

    $conn->exec("INSERT INTO Elements (type, x, y, w, r, element_path, rx, ry) 
    VALUES ()");

    $conn->exec("INSERT INTO Texts (content, x1, x2, y1, y2) 
    VALUES ()");

    $conn->exec("INSERT INTO Connections (connection_type, decomposition_type) 
    VALUES ()");

    // commit the transaction
    $conn->commit();
    echo "New records created successfully";
    }
catch(PDOException $e)
    {
    // roll back the transaction if something failed
    $conn->rollback();
    echo "Error: " . $e->getMessage();
    }

$conn = null;
?>
