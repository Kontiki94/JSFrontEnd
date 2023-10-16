function register(event) {
    event.preventDefault();
    for (let element of event.target) {
        if(element.required){
            validate(element);
        }
    }
}

function validate(element) {
    const errorMessages = {
        firstName_required : "Du måste ange ett förnamn",
        firstName_invalid : "Du måste ange ett giltigt förnamn",
        lastName_required : "Du måste ange ett efternamn",
        lastName_invalid : "Du måste ange ett giltigt efternamn",
        email_required : "Du måste ange en e-postadress",
        email_invalid : "Du måste ange en giltig e-postadress",
        password_required : "Du måste ange ett lösenord",
        password_invalid : "Du måste ange ett giltigt lösenord",
        confirmPassword_required : "Du måste bekräfta lösenordet",
        confirmPassword_invalid : "Lösenorden matchar inte"
    }

    if(!validateLength(element.value, 1)) {
        document.getElementById(`${element.id}`).classList.add('error');
        document.getElementById(`${element.id}-error`).innerHTML = errorMessages[element.id + "_required"];
        console.log(1);
    }
    else {
        let result = false;

        switch(element.type) {
            case 'text':
                result = validateLength(element.value);
                break;
            
            case 'email':
                result = validateEmail(element.value);
                break;

            case 'password':
                result = validatePassword(element);
                break;
        }
        if (!result) {
            document.getElementById(`${element.id}`).classList.add('error');
            document.getElementById(`${element.id}-error`).innerHTML = errorMessages[element.id + "_invalid"];
        }
        
        else {
            document.getElementById(`${element.id}`).classList.remove('error');
            document.getElementById(`${element.id}-error`).innerHTML = "";
        }
    } 
}

function validateLength(value, minLength = 2) {
    if (value.length >= minLength) {
        return true;
    }
    return false;
}
function validateEmail(value, minLength = 2) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(value)) {
        return true;
    }
    return false;
}

function validatePassword(element) {
    if (element.getAttribute('data-comparewith') !== null){
        return comparePassword(element);
    }
    if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(element.value)) {
        return true;
    }
    return false;
}

function comparePassword (element) {
    let compareElement = document.getElementById(`${element.getAttribute('data-comparewith')}`);
    if(element.value === compareElement.value) {
        return true;
    }
    return false;
}

