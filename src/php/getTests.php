<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

    $json = array();

try {
    $mysqli = new mysqli("127.0.0.1", "jim", "dallas", "lctests");
    if ($mysqli->connect_errno) {
        echo "Connect failed";
    }
    //    $result = $conn->query("SELECT id, name, minutes_allowed, passing_grade, times_taken, first_taken, last_taken, last_taken_by FROM tests");


    //    $outp = "";
    $query = "SELECT * FROM tests";
    $result = $mysqli->query($query);
    while($row = $result->fetch_array(MYSQL_ASSOC))
    {
        $json[] = $row;
    }

    echo json_encode($json);
    $result->close();
    $mysqli->close();
} catch (Exception $e) {
    echo 'Error: ', $e->getMessage(), "\n";
}
?>