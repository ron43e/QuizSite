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

// read the details of question to be edited
$Question->readOne();

// create array
$Question_arr[] = array(
	"id" =>  $Question->id,
	"testID" => $Question->testID,
	"question" => $Question->question,
	"answer_1" => $Question->answer_1,
	"answer_2" =>  $Ques3->answer_2,
	"answer_3" =>  $Question->answer_3,
	"answer_4" =>  $Question->answer_4,
	"correct_ans" =>  $Question->correct_ans,
);

// make it json format
print_r(json_encode($Question_arr));
?>