<?php
$host  = 'localhost';
$password =  '';
$database = 'bus_ticket';
$username  = 'root';

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

header('Content-Type: application/json'); // Set the content type to JSON

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get JSON input
    $input = json_decode(file_get_contents("php://input"), true);

    // Validation and sanitization
    $name = trim($input['name']);
    $email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);
    $number = trim($input['number']);
    $selectSitArr = $input['selectSitArr']; // Assume this is already an array

    // Validate phone number format
    if (!preg_match('/^\d{10,15}$/', $number)) {
        echo json_encode(["error" => "Invalid phone number format"]);
        exit;
    }

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["error" => "Invalid email format"]);
        exit;
    }

    // Sanitize selected seats
    if (is_array($selectSitArr)) {
        $selectSitArr = implode(",", array_map('trim', $selectSitArr)); // Ensure it's a string
    } else {
        echo json_encode(["error" => "Invalid seat selection"]);
        exit;
    }

    // Insert data into the database
    $sql = "INSERT INTO passenger (name, email, number, selectSitArr) 
            VALUES ('$name', '$email', '$number', '$selectSitArr')";

    if ($conn->query($sql) === TRUE) {
        // Generate HTML content for the ticket
        $htmlContent = "
        <!DOCTYPE html>
        <html lang='en'>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <title>Bus Ticket</title>
            <style>
                body { 
                font-family: Arial, sans-serif;
                text-align: center; 
                margin: auto;
                }
                h1 { color: #1DD100; }
                p { font-size: 16px; }
            </style>
        </head>
        <body>
            <h1>Bus Ticket Information</h1>
            <p><strong>Name:</strong> $name</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Number:</strong> $number</p>
            <p><strong>Selected Seats:</strong> " . implode(", ", explode(",", $selectSitArr)) . "</p>
        </body>
        </html>";

        $fileName = "ticket_" . time() . ".html";
        file_put_contents($fileName, $htmlContent);

        echo json_encode([
            "message" => "New record created successfully",
            "downloadLink" => $fileName
        ]);
    } else {
        echo json_encode(["error" => "ERROR: " . $conn->error]);
    }

    $conn->close();
}
