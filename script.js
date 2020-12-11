const calculatorScreen = document.querySelector(".main-screen");
const temporaryResult = document.querySelector(".temporary-result")
const numbers = document.querySelectorAll(".number");
const operator = document.querySelectorAll(".operator");
const equalSign = document.querySelector(".equal-sign");
const decimal = document.querySelector(".decimal");
const clearBtn = document.querySelector(".all-clear");
let prevNumber = "";
let currentNumber = "0";
let calculationOperator = "";
let result = "";


// saving the input value
const inputNumber = (number) => {
	if (currentNumber === "0") {  // if 0, don't add more 0
		currentNumber = number;
	} else {
		currentNumber += number;
	}
}
// display on main screen
const updateScreen = (number) => {
	calculatorScreen.value = number;
}
// display on Temporary result screen
const updateTemporaryResultScreen = (number) => {
	temporaryResult.value = number;
}
// event for each Number click
numbers.forEach((number) => {
	number.addEventListener("click", (event) => {
		if(currentNumber === result) {
			clearAll();
			inputNumber(event.target.value);
			updateScreen(currentNumber);
			updateTemporaryResultScreen(currentNumber);
		} else {
			inputNumber(event.target.value);
			updateScreen(currentNumber);
			updateTemporaryResultScreen(currentNumber);
		}
		if(calculationOperator) {  // to show temporary result
			calculate();
			updateTemporaryResultScreen(result);
			calculationOperator = "";
		}
	})
})
// === operator ===
const inputOperator = (operator) => {
	if(prevNumber) { // after input a number
		calculationOperator = operator;
		currentNumber = "0";
	} else {
		prevNumber = currentNumber;  // new calculation => 1  ....
		calculationOperator = operator; // +
		currentNumber = "0";  //  1 + 0
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
	calculationOperator = "";
	prevNumber = result;
}
// === Result ===
equalSign.addEventListener("click", () => {
	if(prevNumber === "") {
		return;
	} else {
		calculate();
		updateScreen(result);
		updateTemporaryResultScreen("");
	}
	currentNumber = result;
	calculationOperator = "";
})
// === AC or Clear button ===
const clearAll = () => {
	prevNumber = "";
	calculationOperator = "";
	currentNumber = "0";
	result = "";
}
clearBtn.addEventListener("click", () => {
	clearAll();
	updateScreen(currentNumber);
	updateTemporaryResultScreen(result);
})