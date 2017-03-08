<?php
// include database and object file
include_once '../config/database.php';
include_once '../objects/testClass.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// instantiate test object
$test = new Test($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

// set test property values
$Test->name = $data->name;
$Test->times_taken = $data->times_taken;
$Test->last_taken = $data->last_taken;
$Test->first_taken = $data->first_taken;
$Test->last_taken_by = $data->last_taken_by;
$Test->minutes_allowed = $data->minutes_allowed;
$Test->passing_grade = $data->passing_grade;

// create the test
if($Test->create()){
    echo "Test was created.";
}

// if unable to create the test, tell the user
else{
    echo "Unable to create test.";
}
?>