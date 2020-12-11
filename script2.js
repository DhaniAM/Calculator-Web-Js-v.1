const calculatorScreen = document.querySelector(".main-screen");
const temporaryResultScreen = document.querySelector(".temporary-result")
const numbers = document.querySelectorAll(".number");
const operator = document.querySelectorAll(".operator");
const equalSign = document.querySelector(".equal-sign");
const decimal = document.querySelector(".decimal");
const clearBtn = document.querySelector(".all-clear");

let prevNumber = "";
let temporaryPrevNumber = "";

let currentNumber = "0";
let temporaryCurrentNumber = "0";

let calculationOperator = "";
let temporaryCalculationOperator = "";

let result = "";
let temporaryResult = "";

// saving the input value
const inputNumber = (number) => {
	if (currentNumber === "0") {  // if 0, don't add more 0
		currentNumber = number;
		temporaryCurrentNumber = number;
	} else {
		currentNumber += number;
		temporaryCurrentNumber += number;
	}
}
// display on screen
const updateScreen = (number) => {
	calculatorScreen.value = number;
}
const updateTemporaryResultScreen = (number) => {
	temporaryResultScreen.value = number;
}
// event for each Number click
numbers.forEach((number) => {
	number.addEventListener("click", (event) => {
		inputNumber(event.target.value);
		updateScreen(currentNumber);
		temporaryCalculate()
		updateTemporaryResultScreen(temporaryResult);
	})
})
// === operator ===
const inputOperator = (operator) => {
	if(prevNumber) { // after input 2 number
		calculate();
		prevNumber = result;
		calculationOperator = operator;
		temporaryCalculationOperator = operator;
		currentNumber = "0";
		temporaryCurrentNumber = "0";
	} else { // new calculation
		prevNumber = currentNumber;
		temporaryPrevNumber = temporaryCurrentNumber;
		calculationOperator = operator; // +
		temporaryCalculationOperator = operator;
		currentNumber = "0";  //  1 + 0
		temporaryCurrentNumber = "0";
		result = temporaryResult;
	}
}
//event for each Operator click
operator.forEach((operator) => {
	operator.addEventListener("click", (event) => {
		inputOperator(event.target.value);
	})
})
// === Decimal ===
const inputDecimal = (dot) => {
	if(currentNumber.includes(".")) { // => if currentNumber already have dot, 
		return;							// dont add dot again
	}
	currentNumber += dot;
	temporaryCurrentNumber += dot;
}
//event for Dot button click
decimal.addEventListener("click", (event) => {
	inputDecimal(event.target.value);
	updateScreen(currentNumber);
})
// === calculation ===
const calculate = () => {   // prevNumber + currentNumber
	switch(calculationOperator) {
		case "+":
			result = parseFloat(prevNumber) + parseFloat(currentNumber);
			break;
		case "-":
			result = parseFloat(prevNumber) - parseFloat(currentNumber);
			break;
		case "*":
			result = parseFloat(prevNumber) * parseFloat(currentNumber);
			break;
		case "/":
			result = parseFloat(prevNumber) / parseFloat(currentNumber);
			break;
		default:
			break;
	}
	prevNumber = result;
}
const temporaryCalculate = () => {   // prevNumber + currentNumber
	switch(temporaryCalculationOperator) {
		case "+":
			temporaryResult = parseFloat(temporaryPrevNumber) + 
							  parseFloat(temporaryCurrentNumber);
			break;
		case "-":
			temporaryResult = parseFloat(temporaryPrevNumber) -
							  parseFloat(temporaryCurrentNumber);
			break;
		case "*":
			temporaryResult = parseFloat(temporaryPrevNumber) *
							  parseFloat(temporaryCurrentNumber);
			break;
		case "/":
			temporaryResult = parseFloat(temporaryPrevNumber) /
							  parseFloat(temporaryCurrentNumber);
			break;
		default:
			break;
	}
}
// === Result ===
equalSign.addEventListener("click", () => {
	if(prevNumber === "") {
		return;
	} else {
		calculate()
		updateScreen(result);
		updateTemporaryResultScreen("");
	}
	currentNumber = result;
	calculationOperator = "";
})
// === AC or Clear button ===
const clearAll = () => {
	prevNumber = "";
	temporaryPrevNumber = "";
	calculationOperator = "";
	temporaryCalculationOperator = "";
	currentNumber = "0";
	temporaryCurrentNumber = "0";
	result = "";
	temporaryResult = "";
}
clearBtn.addEventListener("click", () => {
	clearAll();
	updateScreen(currentNumber);
	updateTemporaryResultScreen(result);
})