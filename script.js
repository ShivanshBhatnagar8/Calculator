"use strict";
const number = document.querySelectorAll(".number"); //For number buttons
const operator = document.querySelectorAll(".operator"); //for operator buttons
const output = document.querySelector(".output"); //For output after clicking number and operator
const result = document.querySelector(".result"); //For showing result
const equals = document.querySelector(".equals"); //For equals button
const clear = document.querySelector(".clear"); // for clearing the output (not all together)
const allClear = document.querySelector(".all-clear"); //for clearing output all together
let click = true; //To disable operator button after one click
let firstOperand = ""; //For storing first Number
let operatorOperand; //For storing operator symbol
let secondOperand = ""; //For storing second Number
let checkingResult = false; //This variable help in appending second number when try to have several operations

function add(a, b) {
  //Function to perform addition
  return a + b;
}
function multiply(a, b) {
  //Function to perform multiplication
  return a * b;
}
function subtract(a, b) {
  //Function to perform subtraction
  return a - b;
}
function divide(a, b) {
  //Function to perform division
  if (b === 0) {
    return "Cannot be divided by Zero";
  } else {
    return a / b;
  }
}

//Function to get the number from the number buttons
function displayValue(content) {
  if (operatorOperand === undefined) {
    firstOperand += content;
    output.textContent = firstOperand;
  }
  if (operatorOperand !== undefined) {
    secondOperand += content;
    output.textContent = `${firstOperand}${operatorOperand}${secondOperand}`;
  }
  if (checkingResult === true) {
    secondOperand = firstOperand;
  }
  if (firstOperand.includes(".") && operatorOperand === undefined) {
    document.getElementById("dot").disabled = true; //for disabling decimal
  }
  if (secondOperand.includes(".")) {
    document.getElementById("dot").disabled = true; //for disabling decimal
  }
}

//Number buttons
number.forEach((n) => {
  n.addEventListener("click", function (e) {
    displayValue(e.target.textContent);

    click = true;
    if (secondOperand !== "") {
      click = false;
    }
    if (checkingResult === true) {
      secondOperand = e.target.textContent;
      output.textContent = secondOperand;
      checkingResult = false;

      document.getElementById("dot").disabled = false; //for enabling decimal
    }
  });
});

//Operator buttons
operator.forEach((o) => {
  o.addEventListener("click", function (e) {
    if (click === true && firstOperand !== "") {
      output.textContent += e.target.textContent;
      operatorOperand = e.target.textContent;
      click = false;
      document.getElementById("dot").disabled = false; //for disabling decimal
    }
    if (result.textContent !== "") {
      //To get several operations functionality
      result.textContent = "";
      operatorOperand = e.target.textContent;
      output.textContent = `${firstOperand}`;
      checkingResult = true;
      document.getElementById("dot").disabled = false; //for disabling decimal
    }
  });
});

//Basic operations to get the desire results after the calculation
function operate(num1, operatorOperand, num2) {
  if (operatorOperand === "+") {
    return (result.textContent = add(num1, num2));
  } else if (operatorOperand === "-") {
    return (result.textContent = subtract(num1, num2));
  } else if (operatorOperand === "*") {
    return (result.textContent = multiply(num1, num2));
  } else if (operatorOperand === "/") {
    return (result.textContent = divide(num1, num2));
  }
}

//For clearing output result
allClear.addEventListener("click", function () {
  output.textContent = "";
  result.textContent = "";
  firstOperand = "";
  operatorOperand = undefined;
  secondOperand = "";
  checkingResult = false;
  click = true;
  document.getElementById("dot").disabled = false; //for disabling decimal
});

//For clearing the number last digit
clear.addEventListener("click", function () {
  output.textContent = output.textContent.slice(0, -1);
  result.textContent = result.textContent.slice(0, -1);
  firstOperand = "";
  operatorOperand = undefined;
  secondOperand = "";
  checkingResult = false;
  click = true;
  document.getElementById("dot").disabled = false;
});

//For getting result
equals.addEventListener("click", function () {
  operate(parseFloat(firstOperand), operatorOperand, parseFloat(secondOperand));
  firstOperand = result.textContent;
  document.getElementById("dot").disabled = false;
});
