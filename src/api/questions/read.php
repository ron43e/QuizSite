<?php
// from: https://www.codeofaninja.com/2015/12/angularjs-crud-example-php.html
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/questionClass.php';

// instantiate database and question object
$database = new Database();
$db = $database->getConnection();

// initialize object
$Question = new Question($db);

// query question
$stmt = $Question->readAll();
$num = $stmt->rowCount();
$data="";
// check if more than 0 record found
if($num>0){
    $x=1;
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['testID'] to
        // just $testID only
        extract($row);
        $data .= '{';
            $data .= '"id":"'  . $id . '",';
            $data .= '"testID":"'   . $testID . '",';
            $data .= '"question":"' . $question . '",';
            $data .= '"answer_1":"' . $answer_1 . '",';
            $data .= '"answer_2":"' . $answer_2 . '",';
            $data .= '"answer_3":"' . $answer_3 . '",';
            $data .= '"answer_4":"' . $answer_4 . '",';
            $data .= '"correct_ans":"' . $correct_ans . '"';
        $data .= '}';
        $data .= $x<$num ? ',' : '';
        $x++;
    }
}

// json format output
echo '{"records":[' . $data . ']}';
?>