<?php
// delete a test

$servername = "127.0.0.1";
$username = "jim";
$password = "dallas";
$dbname = "lctests";

// Getting posted data and decodeing json
//$data = json_decode(file_get_contents('php://input'), true);

    try {
        $id = $_GET['id'];
        $db = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        // set the PDO error mode to exception
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // sql to delete a record
        $delete = $db->prepare("DELETE FROM tests WHERE id=:id");
        $delete->execute(array('id' => $id));

        if($delete->rowCount() > 0){
            // with success, say something
            echo true;
        }else{
            // if not say something
            echo false;
        }

        // $query = 'DELETE FROM tests WHERE id="' . $id . '" ';
        // $results = $db->prepare($query);

        // $pdoExec = $results->execute($query);
        // echo "Record deleted successfully";
    }	catch(PDOException $e) {
        echo $delete . "<br>" . $e->getMessage();
    }

    $conn = null;
?>