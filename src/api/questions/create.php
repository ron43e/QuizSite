<?php
// include database and object file
include_once '../config/database.php';
include_once '../objects/questionClass.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// instantiate question object
$Question = new Question($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

// set question property values
$Question->questionID = $data->questionID;
$Question->question = $data->question;
$Question->answer_1 = $data->answer_1;
$Question->answer_2 = $data->answer_2;
$Question->answer_3 = $data->answer_3;
$Question->answer_4 = $data->answer_4;
$Question->correct_ans = $data->correct_ans;

// create the question
if($Question->create()){
    echo "question was created.";
}

// if unable to create the question, tell the user
else{
    echo "Unable to create question.";
}
?>