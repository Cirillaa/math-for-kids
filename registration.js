
let loginButton = document.getElementById('login-button');
let registrationButton = document.getElementById('registration-button');
let loginForm = document.getElementById('login-form');
let registrationForm = document.getElementById('registration-form');
let modalCloseButtons =  document.querySelectorAll('.close-button')

loginButton.addEventListener('click', function() {
    loginForm.classList.remove('hide');
    closeModal()
})
registrationButton.addEventListener('click', function(){
    registrationForm.classList.remove('hide');
    closeModal()
})

function closeModal() {
    for (let i = 0; i <= modalCloseButtons.length; i++) {
      modalCloseButtons[i].addEventListener("click", function () {
        loginForm.classList.add("hide");
        registrationForm.classList.add("hide");
      });
    }
}

const isEmpty = (value) => value.trim() === "";

    const formSend = (event) => {
        event.preventDefault();

        const enteredName = document.getElementById('name').value;
        const enteredNick = document.getElementById('nickname').value;
        const enteredPassword = document.getElementById('password').value;

        const nameValid = !isEmpty(enteredName);
        const nickValid = !isEmpty(enteredNick);
        const passwordValid = enteredPassword.length > 6;

        const formIsValid = nameValid && nickValid && passwordValid

        const userData = {
            name: enteredName,
            nickname: enteredNick,
            password: enteredPassword
        }

        console.log(userData)

        const sendData = async() => {
            
            await fetch(
              "https://math-users-ae263-default-rtdb.firebaseio.com/users.json",
              {
                method: "POST",
                body: JSON.stringify(userData),
              }
            );
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

        sendData()
    } 

    registrationForm.addEventListener("submit", formSend);

