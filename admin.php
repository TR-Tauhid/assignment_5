<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Passenger Records</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f3f4f6;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .container {
            width: 80%;
            margin: 20px auto;
            background-color: #ffffff;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            overflow: hidden;
        }
        h1 {
            text-align: center;
            padding: 20px;
            background-color: #4CAF50;
            color: white;
            margin: 0;
            font-size: 24px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            padding: 12px;
            text-align: center;
            border-bottom: 1px solid #ddd;
        }
        th {
            background-color: #f7f7f7;
            color: #333;
        }
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        tr:nth-child(odd) {
            background-color: #f2f2f2;
        }
        .delete-button {
            color: #ff4c4c;
            padding: 8px 12px;
            border: none;
            border-radius: 5px;
            text-decoration: none;
            transition: background-color 0.3s ease;
        }
        .delete-button:hover {
            background-color: #ff4c4c;
            color: white;
        }
        .message {
            text-align: center;
            padding: 10px;
            font-size: 18px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Passenger Records</h1>
        <?php
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "bus_ticket";

        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Delete record
        if (isset($_GET['delete_id'])) {
            $delete_id = $_GET['delete_id'];
            $sql = "DELETE FROM passenger WHERE id=$delete_id";
            if ($conn->query($sql) === TRUE) {
                echo "<div style='color: green; text-align: center;'>Record deleted successfully</div>";
            } else {
                echo "<div style='color: red; text-align: center;'>Error deleting record: " . $conn->error . "</div>";
            }
        }

        // Fetch data
        $sql = "SELECT * FROM passenger";
        $result = $conn->query($sql);

        echo "<table>";
        echo "<tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Number</th>
                <th>Seat</th>
                <th>Journey Date</th>
                <th>Total Price</th>
                <th>Action</th>
              </tr>";

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                echo "<tr>
                        <td>" . $row["id"] . "</td>
                        <td>" . $row["name"] . "</td>
                        <td>" . $row["email"] . "</td>
                        <td>" . $row["number"] . "</td>
                        <td>" . $row["selectSitArr"] . "</td>
                        <td>" . $row["journey_date"] . "</td>
                        <td>" . $row["totalPrice"] . "</td>
                        <td><a class='delete-button' href='admin.php?delete_id=" . $row["id"] . "'>Delete</a></td>
                      </tr>";
            }
        } else {
            echo "<tr><td colspan='8' style='text-align: center;'>No results found</td></tr>";
        }
        echo "</table>";

        $conn->close();
        ?>
    </div>
</body>
</html>
