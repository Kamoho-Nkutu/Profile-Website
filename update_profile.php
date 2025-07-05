<?php
header('Content-Type: application/json');

// Database connection
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "portfolio_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Connection failed: ' . $conn->connect_error]));
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

// Update profile
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $conn->real_escape_string($data['name']);
    $title = $conn->real_escape_string($data['title']);
    $bio = $conn->real_escape_string($data['bio']);
    
    $sql = "UPDATE profile SET name='$name', title='$title', bio='$bio' WHERE id=1";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['status' => 'success', 'message' => 'Profile updated successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error updating profile: ' . $conn->error]);
    }
}

$conn->close();
?>