<?php
require_once("./Commons/Connection.php");
require_once("./Commons/Sanitize.php");
global $tbl_users, $tbl_exam_result, $connect;


if (isset($_POST['user_id'])) {
    $sql = ("SELECT `exam_id`,`result`,`time` FROM $tbl_exam_result WHERE `user_id` = ? ");
    $result = $connect->prepare($sql);
    $result->bindValue(1, sanitize($_POST['user_id']));
    $result->execute();
    $row = $result->fetchAll();
    if ($result->rowCount()) {
        $row['resp'] = "200";
        echo json_encode($row);
    } else {
        echo json_encode("500");
    }

} else {
    echo json_encode("500");
}