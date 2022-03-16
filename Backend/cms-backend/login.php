<?php
require_once("./Commons/Connection.php");
require_once("./Commons/Sanitize.php");
global $tbl_users, $connect;

if (isset($_POST['username']) && isset($_POST['password'])) {
    $sql = ("SELECT `id`,`username`,`password`,`status`,`role`,`avatar` FROM $tbl_users WHERE `username` = ? AND `password` = ?");
    $result = $connect->prepare($sql);
    $result->bindValue(1, sanitize($_POST['username']));
    $result->bindValue(2, sha1(sanitize(($_POST['password']))));
    $result->execute();
    $row = $result->fetch();
    if ($result->rowCount()) {
        if ($row['status'] == 1) {
            unset($row['status']);
            $row['resp'] = "200";
            echo json_encode($row);
        } else {
            unset($row);
            $row = array();
            $row['resp'] = "400";
            echo json_encode($row);
        }
    } else {
        echo json_encode("500");
    }

}