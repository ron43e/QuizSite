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

$conn->close();

echo($outp);
fclose($jh);
?>