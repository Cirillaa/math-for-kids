
let registrationButton = document.getElementById('registration-button');
let registrationFormModal = document.getElementById('registration-form-modal');
let registrationForm = document.getElementById('registration-form')


registrationButton.addEventListener('click', function(){
    registrationFormModal.classList.remove('hide');
    let modalClose = document.querySelector('.close-button-reg');
    modalClose.addEventListener('click', function () {
        registrationFormModal.classList.add("hide");
    })
})


const isEmpty = (value) => value.trim() === "";

    const formSend = (event) => {
        event.preventDefault();

        const enteredName = document.getElementById('name').value;
        const enteredNick = document.getElementById('nickname').value;
        const enteredPassword = document.getElementById('password').value;

        const submittingState = document.createElement('p');

        const nameValid = !isEmpty(enteredName);
        const nickValid = !isEmpty(enteredNick);
        const passwordValid = enteredPassword.length > 6;

        const formIsValid = nameValid && nickValid && passwordValid

        const userData = {
            name: enteredName,
            nickname: enteredNick,
            password: enteredPassword,
            rightAnswers: '',
            wrongAnswers: ''
        }

        console.log(userData)

        const sendData = async() => {
            registrationForm.appendChild(submittingState);
            submittingState.innerHTML = 'Sending data...'
            await fetch(
              "https://math-users-ae263-default-rtdb.firebaseio.com/users.json",
              {
                method: "POST",
                body: JSON.stringify(userData),
              }
            );
            submittingState.innerHTML = 'Data successfully sent!';
            clearForm();
        }

        if(!formIsValid) {
            if(!nameValid || !nickValid || !passwordValid) {
                let inputs = registrationForm.querySelectorAll('input');
                for (let i=0; i <inputs.length; i++) {
                    inputs[i].classList.add('invalid')
                }
            }
            return
        }

        function clearForm() {
            let inputs = registrationForm.querySelectorAll("input");
            for (let i = 0; i < inputs.length; i++) {
              inputs[i].classList.remove("invalid");
              inputs[i].value = '';
            }
        }

        sendData()
    } 

    registrationForm.addEventListener("submit", formSend);

