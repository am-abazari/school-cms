<?php
require_once("./Commons/Connection.php");
require_once("./Commons/Sanitize.php");
global $tbl_users, $connect;


//Public API

$sql = ("SELECT `id` FROM $tbl_users WHERE `status`= ? ");
$result = $connect->prepare($sql);
$result->bindValue(1, 1);
$result->execute();
$row = $result->fetchAll();
echo json_encode(count($row));