a<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
$jh = fopen("err.txt", "w");
fwrite($jh, "begin\r\n");

$conn = new mysqli("127.0.0.1", "root", "", "lctests");
if ($conn->connect_errno) {
    echo "Failed to connect to MySQL:";
}
//echo $conn->host_info . "\n";
fwrite($jh, $conn->host_info . "\r\n");

$result = $conn->query("SELECT id, name, minutes_allowed FROM tests");
//fwrite($jh, 'Result: ' . $result . '\n');
if ($result == false ) {
    fwrite($jh, "Result: false\n");
} else {
    fwrite($jh, "Result: true;  Rows: " . $result->num_rows . "\n");
}

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"name":"'  . $rs["name"] . '",';
    $outp .= '"id":"'   . $rs["id"]        . '",';
    $outp .= '"minutes":"'. $rs["minutes_allowed"]     . '"}';
}
fwrite($jh, "rs: " . $rs . "\n");

if ($outp != "") {
    fwrite($jh, "not empty\r\n");
} else {
    fwrite($jh, "empty\r\n");
}
$outp ='{"records":['.$outp.']}';
$conn->close();

echo($outp);
fclose($jh);
?>