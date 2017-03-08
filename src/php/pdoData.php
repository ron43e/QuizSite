<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

try {
$conn = new mysqli("127.0.0.1", "jim", "dallas", "lctests");

$result = $conn->query("SELECT id,name FROM tests");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"id":"'  . $rs["id"] . '",';
    $outp .= '"name":"'   . $rs["name"]        . '"}';
}
$outp ='{"records":['.$outp.']}';
$conn->close();

echo($outp);
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage(), "\n";
}
?>