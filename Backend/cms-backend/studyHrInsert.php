<?php
require_once("./Commons/Connection.php");
require_once("./Commons/Sanitize.php");
global $tbl_users, $tbl_study_hr, $connect;


if (isset($_POST['user_id']) && isset($_POST['count_time'])) {
    if (isset($_POST['lesson'])) {
        $sql = "INSERT INTO `$tbl_study_hr` SET `user_id`=? ,  `count_time`=? , `lesson`=?";
        $result = $connect->prepare($sql);
        $result->bindValue(1, sanitize($_POST['user_id']));
        $result->bindValue(2, sanitize($_POST['count_time']));
        $result->bindValue(3, sanitize($_POST['lesson']));
        if ($result->execute()) {
            echo json_encode("200");
        } else {
            echo json_encode("500");
        }
    } else {
        $sql = "INSERT INTO `$tbl_study_hr` SET `user_id`=? ,  `count_time`=? ";
        $result = $connect->prepare($sql);
        $result->bindValue(1, sanitize($_POST['user_id']));
        $result->bindValue(2, sanitize($_POST['count_time']));
        if ($result->execute()) {
            echo json_encode("200");
        } else {
            echo json_encode("500");
        }
    }
} else {
    echo json_encode("500");
}


