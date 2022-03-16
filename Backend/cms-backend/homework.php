<?php
require_once("./Commons/Connection.php");
require_once("./Commons/Sanitize.php");
global $tbl_homework, $connect;


if (isset($_POST['class']) && isset($_POST['field']) && isset($_POST['grade'])) {
    if (($_POST['class'] != "0") && ($_POST['field'] != "0") && ($_POST['grade'] != "0")) {
        $sql = ("SELECT `homework_id`,`lesson`,`description`,`extra_file`,`title`,`time` FROM $tbl_homework WHERE `class` = ? AND `field` = ? AND `grade` = ? ORDER BY `homework_id` DESC ");
        $result = $connect->prepare($sql);
        $result->bindValue(1, sanitize($_POST['class']));
        $result->bindValue(2, sanitize(($_POST['field'])));
        $result->bindValue(3, sanitize(($_POST['grade'])));
        $result->execute();
        $row = $result->fetchAll();
        if ($result->rowCount()) {
            $row['resp'] = "200";
            echo json_encode($row);
        } else {
            echo json_encode("400");
        }
    } else {
        echo json_encode("500");
    }
} else {
    echo
    json_encode("500");
}