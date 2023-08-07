<?php

require_once 'helper.php';
require_once 'connect.php';

$connect;
$name = $_POST['name'];
$tel = $_POST['tel'];

$error = is_valid_name($name) . is_valid_tel($tel);

if ($error) {
	$response = [
		'status' => false,
		'message' => $error
	];
	echo json_encode($response, JSON_UNESCAPED_UNICODE);
} else {
	if (mysqli_query($connect, "INSERT INTO contacts (name, tel) VALUES ('$name', '$tel');")) {
		$id = mysqli_insert_id($connect);
		$contact = [
			'id' => $id,
			'name' => $name,
			'tel' => $tel
		];
		$response = [
			'status' => true,
			'message' => 'Успешное добавление контакта!!!',
			'contact' => $contact
		];
		echo json_encode($response, JSON_UNESCAPED_UNICODE);
	} else {
		$response = [
			'status' => false,
			'message' => 'Что-то пошло не так'
		];
	}
}
