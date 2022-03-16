<?php
require_once("./Commons/Connection.php");
require_once("./Commons/Sanitize.php");
global $tbl_users, $connect;


if (isset($_POST['username']) && isset($_POST['password']) && isset($_POST['id'])) {
    $sql = ("SELECT `id`,`name`,`family`,`time`,`avatar`, `activity` , `mobile` FROM $tbl_users WHERE `id`= ? AND `username` = ? AND `password` = ? AND `status` = ? ");
    $result = $connect->prepare($sql);
    $result->bindValue(1, sanitize($_POST['id']));
    $result->bindValue(2, sanitize($_POST['username']));
    $result->bindValue(3, sanitize($_POST['password']));
    $result->bindValue(4, sanitize(1));
    $result->execute();
    $row = $result->fetch();
    if ($result->rowCount()) {
        $row['resp'] = "200";
        echo json_encode($row);
    } else {
        echo json_encode("500");
    }
}