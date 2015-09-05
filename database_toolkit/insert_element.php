<?php
$servername = "localhost";
$username = "root";
$password = "password";
$dbname = "SE4SToolkit";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username,
                    $password);
    // Set the PDO error mode to use exceptions
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // begin the transaction
    $conn->beginTransaction();
    $conn->exec("INSERT INTO Elements (shape, x, y, x2, y2) VALUES (
        {$_REQUEST['type']}, {$_REQUEST['x']}, {$_REQUEST['y']},
        {$_REQUEST['x2']}, {$_REQUEST['y2']})");
    // Commit the transaction
    $conn->commit();
} catch(PDOException $e) {
    $conn->rollback();
    echo "Error: " . $e->getMessage();
}
?>
