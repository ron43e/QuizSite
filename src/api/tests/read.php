<?php
// from: https://www.codeofaninja.com/2015/12/angularjs-crud-example-php.html
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/testClass.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$test = new Test($db);

// query test
$stmt = $test->readAll();
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
        // this will make $row['name'] to
        // just $name only
        extract($row);
        $data .= '{';
            $data .= '"id":"'  . $id . '",';
            $data .= '"name":"'   . $name . '",';
            $data .= '"times_taken":"' . $times_taken . '",';
            $data .= '"last_taken":"' . $last_taken . '",';
            $data .= '"first_taken":"' . $first_taken . '",';
            $data .= '"last_taken_by":"' . $last_taken_by . '",';
            $data .= '"minutes_allowed":"' . $minutes_allowed . '",';
            $data .= '"passing_grade":"' . $passing_grade . '"';
        $data .= '}';
        $data .= $x<$num ? ',' : '';
        $x++;
    }
}

// json format output
echo '{"records":[' . $data . ']}';
?>