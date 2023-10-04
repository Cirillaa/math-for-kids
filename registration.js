
let loginButton = document.getElementById('login-button');
let registrationButton = document.getElementById('registration-button');
let loginForm = document.getElementById('login-form');
let registrationForm = document.getElementById('registration-form');
let modalCloseButtons =  document.querySelectorAll('.close-button')

loginButton.addEventListener('click', function() {
    loginForm.classList.remove('hide');
})
registrationButton.addEventListener('click', function(){
    registrationForm.classList.remove('hide');
})

for (let i=0; i <=modalCloseButtons.length; i++) {
    modalCloseButtons[i].addEventListener('click', function() {
        loginForm.classList.add('hide');
        registrationForm.classList.add('hide');
    })
}

registrationForm.addEventListener('submit', formSend);

    const formSend = async function(event) {
        event.preventDefault();
    } 


