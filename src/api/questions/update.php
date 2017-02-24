<?php
	// include database and object files
	include_once '../config/database.php';
	include_once '../objects/questionClass.php';

	// get database connection
	$database = new Database();
	$db = $database->getConnection();

	// prepare question object
	$Question = new Question($db);

	// get id of question to be edited
	$data = json_decode(file_get_contents("php://input"));

	// set ID property of question to be edited
	$Question->id = $data->id;

	// set question property values
	$Question->testID = $data->testID;
	$Question->question = $data->question;
	$Question->answer_1 = $data->answer_1;
	$Question->answer_2 = $data->answer_2;
	$Question->answer_3 = $data->answer_3;
	$Question->answer_4 = $data->answer_4;
	$Question->correct_ans = $data->correct_ans;

	// update the question
	if($Question->update()){
			echo "question was updated.";
	}

	// if unable to update the question, tell the user
	else{
			echo "Unable to update question.";
	}
?>