<?php
require_once("./Commons/Connection.php");
require_once("./Commons/Sanitize.php");
global $tbl_users, $tbl_extra_infos, $connect;


if (isset($_POST['user_id'])) {
    $sql = ("SELECT `grade`,`class`,`field`,`groups`,`must_study` , `changeable` FROM $tbl_extra_infos WHERE `user_id` = ?");
    $result = $connect->prepare($sql);
    $result->bindValue(1, sanitize($_POST['user_id']));
    $result->execute();
    $row = $result->fetch();
    if ($result->rowCount()) {
            $row['resp'] = "200";
            echo json_encode($row);
    } else {
        echo json_encode("500");
    }

}