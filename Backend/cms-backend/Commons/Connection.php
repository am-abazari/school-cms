<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

if (!isset($_SESSION)) {
    session_start();
}
$Host = "localhost";
$Database = "my-app";
$username = "root";
$password = "";
$setName = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES UTF8");

$connect = new PDO("mysql:host=$Host;dbname=$Database;", $username, $password, $setName);
$tbl_users = "users";
$tbl_extra_infos = "extra_infos";
$tbl_homework = "homework";
$tbl_homework_status = "homework_status";
$tbl_study_hr = "study_hr";
$tbl_exam_result = "exam_result";
$tbl_schedule = "schedule";
$tbl_pattern = "pattern";
$tbl_exam = "exam";
