<?php
// include database and object files
include_once '../config/database.php';
include_once '../objects/testClass.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare Test object
$Test = new Test($db);

// get id of Test to be edited
$data = json_decode(file_get_contents("php://input"));

// set ID property of Test to be edited
$Test->id = $data->id;

// read the details of Test to be edited
$Test->readOne();

// create array
$Test_arr[] = array(
	"id" =>  $Test->id,
	"name" => $Test->name,
	"times_taken" => $Test->times_taken,
	"last_taken" => $Test->last_taken,
	"first_taken" =>  $Test->first_taken,
	"last_taken_by" =>  $Test->last_taken_by,
	"minutes_allowed" =>  $Test->minutes_allowed,
	"passing_grade" =>  $Test->passing_grade,
);

// make it json format
print_r(json_encode($Test_arr));
?>