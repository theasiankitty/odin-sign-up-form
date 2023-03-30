const signUpForm = document.querySelector('#signUpForm');
const firstName = document.querySelector('#first_name');
const lastName = document.querySelector('#last_name');
const emailAddress = document.querySelector('#email_address');
const phoneNumber = document.querySelector('#phone_number');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm_password');
const inputControl = document.querySelectorAll('.input-control');

// onchange remove the outline error and success.
inputControl.forEach(input => {
    input.addEventListener('change', () => {
        input.classList.remove('error');
        input.classList.remove('success');

        input.querySelector('.error').innerText = '';
    });
});

// submit form, call validateInput().
signUpForm.addEventListener('submit', (e) => {
    validateInputs();

    // check if all inputs are valid.
    if (isFormValid() === true) {
        // success submit
        signUpForm.reset();
        alert('Your account has been created!');
    } else {
        e.preventDefault();
    }
});

const isFormValid = () => {
    let result = true;

    inputControl.forEach(input => {
        if (input.classList.contains('error')) {
            result = false;
        } else {
            input.classList.remove('error');
            input.classList.remove('success');
            result = true;
        }
    });

    return result;
}

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

const isValidEmail = email => {
    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(String(email).toLowerCase());
}

const isValidPhoneNumber = phoneNum => {
    const re = /[0-9]{3}-[0-9]{3}-[0-9]{4}/;
    return re.test(String(phoneNum));
}

const isValidPassword = pass => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(String(pass));
}

const validateInputs = () => {
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailValue = emailAddress.value.trim();
    const phoneNumberValue = phoneNumber.value.trim();
    const passwordValue = password.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();

    if (firstNameValue === '') {
        setError(firstName, 'First Name is required.');
    } else {
        setSuccess(firstName);
    }

    if (lastNameValue === '') {
        setError(lastName, 'Last Name is required.');
    } else {
        setSuccess(lastName);
    }

    if (emailValue === '') {
        setError(emailAddress, 'Email is required.')
    } else if (!isValidEmail(emailValue)) {
        setError(emailAddress, 'Provide a valid email address.');
    } else {
        setSuccess(emailAddress);
    }

    if (phoneNumberValue === '') {
        setError(phoneNumber, 'Phone Number is required.')
    } else if (!isValidPhoneNumber(phoneNumberValue)) {
        setError(phoneNumber, 'Provide a valid number.');
    } else {
        setSuccess(phoneNumber);
    }

    if (passwordValue === '') {
        setError(password, 'Password is required.')
    } else if (!isValidPassword(passwordValue)) {
        setError(password, 'Use 8 or more characters with a mix of letters, numbers, and symbols.');
        password.value = '';
        confirmPassword.value = '';
    } else {
        setSuccess(password);
    }

    if (confirmPasswordValue === '') {
        setError(confirmPassword, 'Please confirm your password.')
    } else if (confirmPasswordValue !== passwordValue) {
        setError(confirmPassword, `Password doesn't match.`);
        confirmPassword.value = '';
    } else {
        if (password.value === '') {
            setError(confirmPassword, `Please confirm your password`);
        } else {
            setSuccess(confirmPassword);
        }
    }
}