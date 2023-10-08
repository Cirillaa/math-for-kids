let loginFormModal = document.getElementById("login-form-modal");
let loginButton = document.getElementById("login-button");
let loginForm = document.getElementById('login-form');
let correctAns = document.getElementById("correct");
let incorrectAns = document.getElementById("incorrect");

loginButton.addEventListener("click", function () {
  loginFormModal.classList.remove("hide");
  let modalClose = document.querySelector(".close-button");
  modalClose.addEventListener("click", function () {
    loginFormModal.classList.add("hide");
  });
});

const loadUser = [];
let logoutButton = document.getElementById("logout-button");
let submitState = document.createElement("p");
loginForm.appendChild(submitState);

const fetchUser = async () => {
    try {
        submitState.innerHTML = "Send request";
        const response = await fetch('https://math-users-ae263-default-rtdb.firebaseio.com/users.json');

        if (!response.ok) {
            throw new Error('Smt went wrong')
        }

        const data = await response.json();

        for (const key in data) {
            loadUser.push({
                id: key,
                name: data[key].name,
                nickname: data[key].nickname,
                password: data[key].password,
                rightAnswers: data[key].rightAnswers,
                wrongAnswers: data[key].wrongAnswers
            })
        }
        submitState.innerHTML = 'Data sent'
    } catch(error) {
        console.log(error.message);
    }
};

const loginFormHandler = async (event) => {
    event.preventDefault();
    
    await fetchUser();

    const enteredNick = document.getElementById('nick').value;
    const enteredPassword = document.getElementById('pass').value;

    const checkUser = loadUser.filter((user) => {
          return (
            user.nickname === enteredNick && user.password === enteredPassword
          );
        });

    console.log(checkUser[0])

    if(checkUser.length === 1) {
        let loginState = document.createElement('p');
        let header = document.querySelector('header');
        header.appendChild(loginState);
        loginFormModal.classList.add('hide');
        loginButton.classList.add('hide');
        logoutButton.classList.remove('hide');
        loginState.innerHTML = 'Hello, ' + checkUser[0].name;
        getAnswerData(checkUser[0]);
        logoutButton.addEventListener('click', function () {
            loginButton.classList.remove("hide");
            logoutButton.classList.add("hide");
            header.removeChild(loginState);
        })
    }

    if (checkUser.length === 0) {
        submitState.innerHTML = 'Wrong data! Check your nickname or password'
    }
}

let getAnswerData = (obj) => {
    correctAns.innerHTML = obj.rightAnswers;
    incorrectAns.innerHTML = obj.wrongAnswers;
}


loginForm.addEventListener('submit', loginFormHandler)