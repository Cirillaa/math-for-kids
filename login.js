let loginFormModal = document.getElementById("login-form-modal");
let loginButton = document.getElementById("login-button");
let loginForm = document.getElementById('login-form');

loginButton.addEventListener("click", function () {
  loginFormModal.classList.remove("hide");
  let modalClose = document.querySelector(".close-button");
  modalClose.addEventListener("click", function () {
    loginFormModal.classList.add("hide");
  });
});

const loadUser = [];

const fetchUser = async () => {
    try {
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
    } catch(error) {
        console.log(error.message);
    }
};

const loginFormHandler = (event) => {
    event.preventDefault();

    fetchUser();

    console.log(loadUser)

    const enteredNick = document.getElementById('nick').value;
    const enteredPassword = document.getElementById('pass').value;

    const checkUser = loadUser.filter((user) => {
          return (
            user.nickname === enteredNick && user.password === enteredPassword
          );
        });

    console.log(checkUser[0])

    if(checkUser.length === 1) {
        let rightDataAlert = document.createElement('p');
        rightDataAlert.innerHTML = 'Hello ' + checkUser[0].name;
        loginForm.appendChild(rightDataAlert)
    }

    if (checkUser.length === 0) {
        let wrongDataAlert = document.createElement('p');
        wrongDataAlert.innerHTML = 'Wrong data! Check your nickname or password'
        loginForm.appendChild(wrongDataAlert);
    }

}

loginForm.addEventListener('submit', loginFormHandler)