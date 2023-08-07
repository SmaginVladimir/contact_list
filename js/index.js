const contact_form = document.getElementById('contact_form');
const contact_btn = document.getElementById('contact_btn');

const added_new_block_contact = (contact) => {
    const fields = document.getElementById('fields');
    const div = document.createElement('div');
    const contact_id = 'contact_' + contact.id;
    div.innerHTML = `
              <div class="field bottom_line" id="field_` + contact.id + `">
               <div class="form_indents_two">
                <div class="contact">
                    <h4 class="contact_name">` + contact.name + `</h4>
                    <svg width="17px" height="17px" viewBox="0 -0.5 25 25" fill="none"
                         xmlns="http://www.w3.org/2000/svg" id="` + contact_id + `">
                        <path d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z"
                              fill="#000000"/>
                    </svg>
                </div>
                <p class="contact_tel">` + contact.tel + `</p>
               </div>
            </div>
            `;
    fields.appendChild(div);
    document.getElementById(contact_id).addEventListener('click', fetch_contact_delete);
}

const errors_block = (data) => {
    delete_block_error_success();
    const errors = document.createElement('div');
    errors.setAttribute('id', 'errors');
    errors.setAttribute('class', 'errors form_indents_two')
    errors.style.marginBottom = '20px';
    data.message.split('!').map(mes => {
        if (!mes) {
            return;
        }
        let error = document.createElement('p');
        error.innerText = mes;
        error.style.fontSize = '12px';
        error.style.color = 'red';
        error.style.marginBottom = '5px';
        errors.prepend(error);
    })
    return errors;
}

const success_contact = (text) => {
    delete_block_error_success();
    const success_div = document.createElement('div');
    success_div.innerHTML = `
    <div class="n-success" id="success_block">
        <p>` + text + `</p>
    </div>`;
    return success_div;
}

const fetch_new_contact = (e) => {
    e.preventDefault();
    const data = new FormData(contact_form);
    fetch('vendor/contact.php', {
        method: 'POST',
        body: data
    }).then(res => {
        return res.json();
    }).then(data => {
        if (!data.status) {
            contact_form.prepend(errors_block(data));
        } else {
            document.getElementById('main_block').prepend(success_contact(data.message));
            added_new_block_contact(data.contact);
            contact_form.reset();
            time_out_delete_block();
        }
    });
}

const fetch_contacts = () => {
    fetch('vendor/contacts.php', {
        method: 'GET'
    }).then(res => {
        return res.json();
    }).then(data => {
        if (!data.message) {
            data.contacts.map(contact => added_new_block_contact(contact));
        }
    });
}

const fetch_contact_delete = (event) => {
    const contact_id = event.currentTarget.id.split('_')[1];
    fetch('vendor/contact_delete.php', {
        method: 'DELETE',
        body: JSON.stringify({id: contact_id})
    }).then(res => {
        return res.json();
    }).then(data => {
        if (!data.status) {
            document.getElementById('fields').prepend(errors_block(data));
        } else {
            delete_block_contact(contact_id);
            document.getElementById('success_contact_delete').append(success_contact(data.message));
            time_out_delete_block();
        }
    });
}

const delete_block_contact = (id) => {
    const field = document.getElementById('field_' + id);
    if (field) {
        field.remove();
    }
}

const time_out_delete_block = () => {
    setTimeout(() => {
        const success_block = document.getElementById('success_block');
        if (success_block) {
            success_block.style.animationName = 'success_block_remove';
            setTimeout(() => {
                success_block.remove();
            }, 5000)
        }
    }, 5000)
}

const delete_block_error_success = () => {
    const errors = document.getElementById('errors');
    if (errors) {
        errors.remove();
    }
    const success = document.getElementById('success_block');
    if (success) {
        success.remove();
    }
}
contact_btn.addEventListener('click', fetch_new_contact);

