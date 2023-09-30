let firstNumber = document.getElementById('first-number');
let secondNumber = document.getElementById('second-number');
let solOne = document.getElementById('sol-one');
let solTwo = document.getElementById("sol-two");
let solThree = document.getElementById("sol-three");
let solList = document.querySelectorAll(".sol");
let mainPage = document.querySelector('.main-section');
let taskSection = document.querySelector('.sample-section');
let addictionButton = document.getElementById('add');
let multiplicButton = document.getElementById('multi');
let sign = document.getElementById('sign');


let addiction;
let multiplication;

addictionButton.addEventListener('click', function (){
    addiction = true;
    multiplication = false;
    mainPage.classList.add('hide');
    taskSection.classList.remove('hide');
    sign.innerHTML = '+';

    getNumbers();
    getAnswerNumbers();
})

multiplicButton.addEventListener('click', function(){
    multiplication = true;
    addiction = false;
    mainPage.classList.add("hide");
    taskSection.classList.remove("hide");
    sign.innerHTML = "&#215";

    getNumbers();
    getAnswerNumbers();
})


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

    if (addiction) {
        answer1 = +firstNumber.innerHTML + +secondNumber.innerHTML;
        answer2 = (+firstNumber.innerHTML + +secondNumber.innerHTML) + 2;
        answer3 = (+firstNumber.innerHTML + +secondNumber.innerHTML) - 1;
    }

    if(multiplication) {
        answer1 = +firstNumber.innerHTML * +secondNumber.innerHTML;
        answer2 = (+firstNumber.innerHTML * +secondNumber.innerHTML) + 9;
        answer3 = (+firstNumber.innerHTML * +secondNumber.innerHTML) - 2;
    }

    let random = getRandom(1, 3)

    if (random === 1) {
        solOne.innerHTML = answer1;
        solTwo.innerHTML = answer2;
        solThree.innerHTML = answer3;
    } else if ( random === 2) {
        solOne.innerHTML = answer3;
        solTwo.innerHTML = answer1;
        solThree.innerHTML = answer2;
    } else {
        solOne.innerHTML = answer2;
        solTwo.innerHTML = answer3;
        solThree.innerHTML = answer1;
    }
}

for (let i = 0; i < solList.length; i++) {
    solList[i].addEventListener('click', function() {
        if (
          (addiction &&
            solList[i].innerHTML ==
              +firstNumber.innerHTML + +secondNumber.innerHTML) ||
          (multiplication &&
            solList[i].innerHTML ==
              +firstNumber.innerHTML * +secondNumber.innerHTML)
        ) {
          solList[i].classList.add("right");
          setTimeout(function () {
            getNumbers();
            getAnswerNumbers();
            solList[i].classList.remove("right");
          }, 2000);
        } else {
          solList[i].classList.add("wrong");
          setTimeout(function () {
            solList[i].classList.remove("wrong");
          }, 1000);
        }
    })
}



