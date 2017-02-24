<?php
	// include database and object file
	include_once '../config/database.php';
	include_once '../objects/testClass.php';

	// get database connection
	$database = new Database();
	$db = $database->getConnection();

	// prepare test object
	$test = new Test($db);

	// get test id
	$data = json_decode(file_get_contents("php://input"));

	// set test id to be deleted
	$test->id = $data->id;

	// delete the test
	if($test->delete()){
			echo "test was deleted.";
	}

	// if unable to delete the test
	else{
			echo "Unable to delete object.";
	}
?>