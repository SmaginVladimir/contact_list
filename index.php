<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/index.css">
    <meta name="viewport" content="width=device-width"/>
    <title>Главная</title>
</head>
<body>

<main>
    <div class="form_container">
        <div class="form_indents_one">
            <h2 class="form_title">Добавить контакт</h2>
        </div>
        <div class="bottom_line"></div>
        <div class="form_indents_two" id="main_block">
            <form id="contact_form">
                <div class="form_fields">
                    <div class="field">
                        <label>
                            <input type="text" placeholder="Имя" name="name">
                        </label>
                    </div>
                    <div class="field">
                        <label>
                            <input type="tel" placeholder="Телефон" name="tel">
                        </label>
                    </div>
                </div>
                <div class="form_buttons">
                    <button class="button" id="contact_btn">Добавить</button>
                </div>
            </form>
        </div>
    </div>

    <div class="form_container contacts">
        <div class="form_indents_one" id="success_contact_delete">
            <h2 class="form_title">Список контактов</h2>
        </div>
        <div class="form_fields" id="fields"></div>
    </div>


</main>

<script src="js/index.js"></script>
<script>fetch_contacts();</script>
</body>
</html>