<?php

require_once 'connect.php';

$connect;

$contact_db = mysqli_query($connect, "SELECT * FROM contacts");
$contacts = [];
if (mysqli_num_rows($contact_db) > 0) {
	while ($row = mysqli_fetch_assoc($contact_db)) {
		$contact = [];
		$contact['id'] = $row['id'];
		$contact['name'] = $row['name'];
		$contact['tel'] = $row['tel'];
		$contacts[] = $contact;
	}
	echo json_encode(['contacts' => $contacts], JSON_UNESCAPED_UNICODE);
}else {
	$response = [
		'status' => false,
		'message' => 'Контактов нет!'
	];
	echo json_encode($response, JSON_UNESCAPED_UNICODE);
}