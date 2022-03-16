<?php
require_once("./Commons/Connection.php");
require_once("./Commons/Sanitize.php");
global $tbl_users, $tbl_extra_infos, $connect;


if (isset($_POST['id']) && isset($_POST['name']) && isset($_POST['family']) && isset($_POST['mobile']) && isset($_POST['must_study']) && isset($_POST['groups']) && isset($_POST['activity']) && isset($_POST['grade']) && isset($_POST['class']) && isset($_POST['field'])) {
    $sql_users = "UPDATE `$tbl_users` SET `name`=? ,  `family`=? , `mobile`=?, `activity`=?  WHERE `id` =?";
    $result = $connect->prepare($sql_users);
    $result->bindValue(1, sanitize($_POST['name']));
    $result->bindValue(2, sanitize($_POST['family']));
    $result->bindValue(3, sanitize($_POST['mobile']));
    $result->bindValue(4, sanitize($_POST['activity']));
    $result->bindValue(5, sanitize($_POST['id']));
    if ($result->execute()) {
        $sql_extraInfos = ("UPDATE `$tbl_extra_infos` SET `grade` = ? , `class`=?, `field`=? , `must_study`=? ,`groups`=? WHERE `user_id` =?");
        $result_extraInfos = $connect->prepare($sql_extraInfos);
        $result_extraInfos->bindValue(1, sanitize($_POST['grade']));
        $result_extraInfos->bindValue(2, sanitize($_POST['class']));
        $result_extraInfos->bindValue(3, sanitize($_POST['field']));
        $result_extraInfos->bindValue(4, sanitize($_POST['must_study']));
        $result_extraInfos->bindValue(5, sanitize($_POST['groups']));
        $result_extraInfos->bindValue(6, sanitize($_POST['id']));
        if ($result_extraInfos->execute()) {
            echo json_encode("200");
        } else {
            echo json_encode("500");
        }
    } else {
        echo json_encode("500");
    }
} else {
    echo json_encode("400");
}


