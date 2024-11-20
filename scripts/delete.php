<?php
// Include database connection
include('admin.php');

// Check if the 'id' is set in the URL
if (isset($_GET['id'])) {
    // Get the id from the URL
    $id = $_GET['id'];

    // SQL query to delete the record with the given id
    $sql = "DELETE FROM passenger WHERE id = ?";

    // Prepare the query
    if ($stmt = $conn->prepare($sql)) {
        // Bind the id parameter
        $stmt->bind_param("i", $id);

        // Execute the query
        if ($stmt->execute()) {
            // Redirect to the admin page after successful deletion
            header("Location: admin.php?message=Record deleted successfully");
        } else {
            // Handle error if the deletion fails
            echo "Error deleting record: " . $conn->error;
        }

        // Close the statement
        $stmt->close();
    } else {
        echo "Error preparing the query: " . $conn->error;
    }
} else {
    // If the 'id' is not passed, redirect to admin page with an error message
    header("Location: admin.php?error=Invalid ID");
}

// Close the database connection
$conn->close();
?>
