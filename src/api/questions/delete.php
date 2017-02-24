<?php
	// include database and object file
	include_once '../config/database.php';
	include_once '../objects/questionClass.php';

	// get database connection
	$database = new Database();
	$db = $database->getConnection();

	// prepare question object
	$question = new Question($db);

	// get question id
	$data = json_decode(file_get_contents("php://input"));

	// set question id to be deleted
	$question->id = $data->id;

	// delete the question
	if($question->delete()){
			echo "question was deleted.";
	}

	// if unable to delete the question
	else{
			echo "Unable to delete object.";
	}
?>