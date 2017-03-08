<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    $conn = new mysqli("127.0.0.1", "jim", "dallas", "lctests");

    $result = $conn->query("SELECT id, name, minutes_allowed, passing_grade, times_taken, first_taken, last_taken, last_taken_by FROM tests");

    $outp = "";
    while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
        if ($outp != "") {$outp .= ",";}
        $outp .= '{"id":"'   . $rs["id"] . '",';
        $outp .= '"name":"'  . $rs["name"] . '",';
        $outp .= '"minutes":"'. $rs["minutes_allowed"] . '",';
        $outp .= '"passing_grade":"'  . $rs["passing_grade"] . '",';
        $outp .= '"times_taken":"'  . $rs["times_taken"] . '",';
        $outp .= '"first_taken":"'  . $rs["first_taken"] . '",';
        $outp .= '"last_taken":"'  . $rs["last_taken"] . '",';
        $outp .= '"last_taken_by":"'  . $rs["last_taken_by"] . '"}';
    }
    $outp ='{"records":['.$outp.']}';
    $conn->close();

    echo($outp);
?>