<?php


function is_valid_name(string $name): string
{
	if (mb_strlen($name) < 3) {
		return 'Имя должно быть больше 3 символов !';
	}
	return '';
}

function is_valid_tel(string $tel): string
{
	$regex = '/^(\+1|001)?\(?([0-9]{3})\)?([ .-]?)([0-9]{3})([ .-]?)([0-9]{4})/';
	if (preg_match($regex, $tel)) {
		return '';
	}
	return 'Телефон должен быть корректным !';
}
