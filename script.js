let firstNumber = document.getElementById("first-number");
let secondNumber = document.getElementById("second-number");
let solOne = document.getElementById("sol-one");
let solTwo = document.getElementById("sol-two");
let solThree = document.getElementById("sol-three");
let solList = document.querySelectorAll(".sol");
let mainPage = document.querySelector(".main-section");
let taskSection = document.querySelector(".sample-section");
let addictionButton = document.getElementById("add");
let multiplicButton = document.getElementById("multi");
let sign = document.getElementById("sign");
let mainButton = document.getElementById("main-button");
let correct = document.getElementById('correct');
let incorrect =  document.getElementById('incorrect');

let addition;
let multiplication;

addictionButton.addEventListener("click", function () {
  addition = true;
  multiplication = false;
  mainPage.classList.add("hide");
  taskSection.classList.remove("hide");
  sign.innerHTML = "+";

  getNumbers();
  getAnswerNumbers();
});

multiplicButton.addEventListener("click", function () {
  multiplication = true;
  addition = false;
  mainPage.classList.add("hide");
  taskSection.classList.remove("hide");
  sign.innerHTML = "&#215";

  getNumbers();
  getAnswerNumbers();
});

mainButton.addEventListener("click", function () {
  addition = false;
  multiplication = false;
  mainPage.classList.remove("hide");
  taskSection.classList.add("hide");
});

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getNumbers() {
  firstNumber.innerHTML = getRandom(1, 10);
  secondNumber.innerHTML = getRandom(1, 10);
}

function getAnswerNumbers() {
  let answer1;
  let answer2;
  let answer3;

  if (addition) {
    answer1 = +firstNumber.innerHTML + +secondNumber.innerHTML;
    answer2 = +firstNumber.innerHTML + +secondNumber.innerHTML + 2;
    answer3 = +firstNumber.innerHTML + +secondNumber.innerHTML - 1;
  }

  if (multiplication) {
    answer1 = +firstNumber.innerHTML * +secondNumber.innerHTML;
    answer2 = +firstNumber.innerHTML * +secondNumber.innerHTML + 9;
    answer3 = +firstNumber.innerHTML * +secondNumber.innerHTML - 2;
  }

  let random = getRandom(1, 3);

  if (random === 1) {
    solOne.innerHTML = answer1;
    solTwo.innerHTML = answer2;
    solThree.innerHTML = answer3;
  } else if (random === 2) {
    solOne.innerHTML = answer3;
    solTwo.innerHTML = answer1;
    solThree.innerHTML = answer2;
  } else {
    solOne.innerHTML = answer2;
    solTwo.innerHTML = answer3;
    solThree.innerHTML = answer1;
  }
}
function correctAnswerCounter() {
  correct.innerHTML = +correct.innerHTML + 1;
}

function incorrectAnswerCounter() {
  incorrect.innerHTML = +incorrect.innerHTML + 1;
}
for (let i = 0; i < solList.length; i++) {
  solList[i].addEventListener("click", function () {
    if (
      (addition &&
        solList[i].innerHTML ==
          +firstNumber.innerHTML + +secondNumber.innerHTML) ||
      (multiplication &&
        solList[i].innerHTML ==
          +firstNumber.innerHTML * +secondNumber.innerHTML)
    ) {
      solList[i].classList.add("right");
      correctAnswerCounter();
      setTimeout(function () {
        getNumbers();
        getAnswerNumbers();
        solList[i].classList.remove("right");
      }, 2000);
    } else {
      solList[i].classList.add("wrong");
      incorrectAnswerCounter();
      setTimeout(function () {
        solList[i].classList.remove("wrong");
      }, 1000);
    }
  });
}


