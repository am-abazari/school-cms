<?php
require_once("./Commons/Connection.php");
require_once("./Commons/Sanitize.php");
global $tbl_users, $tbl_schedule, $connect;


if (isset($_POST['class']) && isset($_POST['grade']) && isset($_POST['field'])) {
    $sql = ("SELECT `class_name`,`class_link`,`time_start` , `time_end` , `days` ,`class_order_id`  FROM $tbl_schedule WHERE `class` = ? AND `grade` =? AND `field` =?  ORDER BY `class_order_id` ASC ");
    $result = $connect->prepare($sql);
    $result->bindValue(1, sanitize($_POST['class']));
    $result->bindValue(2, sanitize($_POST['grade']));
    $result->bindValue(3, sanitize($_POST['field']));
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