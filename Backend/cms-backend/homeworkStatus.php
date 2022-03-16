<?php
require_once("./Commons/Connection.php");
require_once("./Commons/Sanitize.php");
global $tbl_homework_status, $connect;


if (isset($_POST['user_id'])) {
    $sql = ("SELECT `homework_id` FROM $tbl_homework_status WHERE `status` = ? AND `user_id`=?");
    $result = $connect->prepare($sql);
    $result->bindValue(1, sanitize(1));
    $result->bindValue(2, sanitize($_POST['user_id']));
    $result->execute();
    $row = $result->fetchAll();
    if ($result->rowCount()) {
        $row['resp'] = "200";
        echo json_encode($row);
    } else {
        echo json_encode("400");
    }
} else {
    echo
    json_encode("500");
}