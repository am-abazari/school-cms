<?php
require_once("./Commons/Connection.php");
require_once("./Commons/Sanitize.php");
global $tbl_users, $tbl_extra_infos, $connect;


if (isset($_POST['name']) && isset($_POST['family']) && isset($_POST['mobile']) && isset($_POST['username']) && isset($_POST['password'])) {
    $sql_exist = ("SELECT `username` FROM $tbl_users WHERE `username` = ?");
    $result_exist = $connect->prepare($sql_exist);
    $result_exist->bindValue(1, $_POST['username']);
    $result_exist->execute();
    if ($result_exist->rowCount()) {
        $row_exist = $result_exist->fetch(PDO::FETCH_ASSOC);
        echo(json_encode($row_exist));
    } else {
        $sql = "INSERT INTO `$tbl_users` SET `name`=? ,  `family`=? , `mobile`=?, `username`=? , `password`=?  ";
        $result = $connect->prepare($sql);
        $result->bindValue(1, sanitize($_POST['name']));
        $result->bindValue(2, sanitize($_POST['family']));
        $result->bindValue(3, sanitize($_POST['mobile']));
        $result->bindValue(4, sanitize($_POST['username']));
        $result->bindValue(5, sha1(sanitize($_POST['password'])));
        if ($result->execute()) {


            //        Get ID
            $sql_getId = ("SELECT `id` FROM $tbl_users WHERE `username` = ?");
            $result_getId = $connect->prepare($sql_getId);
            $result_getId->bindValue(1, $_POST['username']);
            $result_getId->execute();
            $row_getId = $result_getId->fetch(PDO::FETCH_ASSOC);
            $userID = $row_getId['id'];

//            Inset into Extra Info
            $sql_extra = "INSERT INTO `$tbl_extra_infos` SET `user_id`=?  ";
            $result_extra = $connect->prepare($sql_extra);
            $result_extra->bindValue(1, sanitize($userID));
            if ($result_extra->execute()) {
                echo json_encode("200");
            } else {
                echo json_encode("500");
            }

        } else {
            echo json_encode("500");
        }


    }
}


