<?php
	// include database and object files
	include_once '../config/database.php';
	include_once '../objects/testClass.php';

	// get database connection
	$database = new Database();
	$db = $database->getConnection();

	// prepare test object
	$Test = new test($db);

	// get id of test to be edited
	$data = json_decode(file_get_contents("php://input"));

	// set ID property of test to be edited
	$Test->id = $data->id;

	// set test property values
	$Test->name = $data->name;
	$Test->price = $data->price;
	$Test->description = $data->description;

	// update the test
	if($Test->update()){
			echo "test was updated.";
	}

	// if unable to update the test, tell the user
	else{
			echo "Unable to update test.";
	}
?>