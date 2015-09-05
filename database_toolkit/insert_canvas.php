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
    $conn->exec("INSERT INTO Canvas (width, height) VALUES (
       {$_REQUEST['width']}, {$_REQUEST['height']})");
    // Commit the transaction
    $conn->commit();
} catch(PDOException $e) {
    $conn->rollback();
    echo "Error: " . $e->getMessage();
}
?>
