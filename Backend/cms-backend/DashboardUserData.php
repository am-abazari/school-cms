<?php
require_once("./Commons/Connection.php");
require_once("./Commons/Sanitize.php");
global $tbl_users, $connect;


if (isset($_POST['id'])) {
    $sql = ("SELECT `avatar` , `family`, `name` ,`time`   FROM $tbl_users WHERE `id`= ?");
    $result = $connect->prepare($sql);
    $result->bindValue(1, sanitize($_POST['id']));
    $result->execute();
    $row = $result->fetch();
    if ($result->rowCount()) {
        $row['resp'] = "200";
        echo json_encode($row);
    } else {
        echo json_encode("500");
    }
}