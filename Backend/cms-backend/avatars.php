<?php
require_once("./Commons/Connection.php");
require_once("./Commons/Sanitize.php");
global $tbl_users, $connect;
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
$BaseURL = "";
$DIR = $BaseURL . "/";
$httpPost = file_get_contents("php://input");
$req = json_decode($httpPost);
$now = time();
$file_chunks = explode(";base64,", $req->image);

$fileType = explode("image/", $file_chunks[0]);
$image_type = $fileType[1];
$base64Img = base64_decode($file_chunks[1]);
$setDIR = $now . '.' . $image_type;
$file = $DIR . $setDIR;


if (file_put_contents($file, $base64Img)) {
    $sql = "UPDATE `$tbl_users` SET `avatar`=? WHERE `id` =?";
    $result = $connect->prepare($sql);
    $result->bindValue(1, ($setDIR));
    $result->bindValue(2, ($req->id));
    if ($result->execute()) {
        echo json_encode(["200",$setDIR]);
    } else {
        echo json_encode("500");
    }
} else {
    echo json_encode("500");
}
?>
