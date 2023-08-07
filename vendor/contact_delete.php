<?php

require_once 'connect.php';

$connect;

$data = json_decode(file_get_contents('php://input'), true);
$contact_id = $data['id'];
if ($contact_id) {
	mysqli_query($connect, "DELETE  FROM contacts WHERE id = '$contact_id' ");
	$response = [
		'status' => true,
		'message' => 'Успешное удаление контакта!!!',
	];
	echo json_encode($response, JSON_UNESCAPED_UNICODE);
} else {
	$response = [
		'status' => false,
		'message' => 'Ошибка, контакт не удален!!!',
	];
	echo json_encode($response, JSON_UNESCAPED_UNICODE);
}