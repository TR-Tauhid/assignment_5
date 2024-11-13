<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Enable error logging to a file instead of sending HTML errors in the response
ini_set('display_errors', 0); // Disable display errors
ini_set('log_errors', 1);
ini_set('error_log', 'php_error_log.txt'); // Set error log file

$host = 'localhost';
$password = '';
$database = 'bus_ticket';
$username = 'root';

// Display PHP errors in JSON format for debugging (remove in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get JSON input
    $input = json_decode(file_get_contents("php://input"), true);

    // Validation and sanitization
    $name = $conn->real_escape_string(trim($input['name']));
    $email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);
    $number = trim($input['number']);
    $journey_date = trim($input['journey_date']);
    $totalPrice = trim($input['totalPrice']);
    $selectSitArr = $conn->real_escape_string($input['selectSitArr']);

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

    // Use prepared statements to insert data safely
    $stmt = $conn->prepare("INSERT INTO passenger (name, email, number, selectSitArr, journey_date, totalPrice) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $name, $email, $number, $selectSitArr, $journey_date, $totalPrice);

    if ($stmt->execute()) {
        // Generate HTML content for the ticket
        $htmlContent = "
        <!DOCTYPE html>
        <html lang='en'>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <link rel='icon' type='image/png' href='https://i.ibb.co/7VN1b9n/th.jpg' />
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
            <p><strong>Journey Date:</strong> $journey_date</p>
            <p><strong>Total Price:</strong> BDT $totalPrice</p>
        </body>
        </html>";

        // Save the HTML file
        $fileName = "tickets/ticket_" . time() . ".html";
        if (!file_exists('tickets')) {
            mkdir('tickets', 0777, true);  // Create the directory if it doesn't exist
        }
        file_put_contents($fileName, $htmlContent);

        // Return success message with download link
        echo json_encode([
            "message" => "New record created successfully",
            "downloadLink" => $fileName
        ]);
    } else {
        echo json_encode(["error" => "Database Error: " . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["error" => "Invalid request method"]);
}
?>
