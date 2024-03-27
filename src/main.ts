const numberButtons = document.querySelector(
  ".button-container__numbers-buttons"
);
console.log(numberButtons);

const operationsButtons = document.querySelector(
  ".button-container__operations-buttons"
);
console.log(operationsButtons);

const screenHeader: HTMLHeadingElement = document.querySelector(
  "#screen__output-header"
);
console.log(screenHeader);

const screenHeader2: HTMLHeadingElement = document.querySelector(
  "#screen__output-header2"
);
console.log(screenHeader2);

const equalsButton: HTMLButtonElement =
  document.querySelector("#button--equals");
console.log(equalsButton);

const clearButton: HTMLButtonElement = document.querySelector("#button--clear");
console.log(clearButton);

if (!numberButtons) {
  throw new Error("number button issue");
} else if (!operationsButtons) {
  throw new Error("operations button issue");
} else if (!screenHeader) {
  throw new Error("Screen 1 button issue");
} else if (!screenHeader2) {
  throw new Error("screen 2 button issue");
} else if (!equalsButton) {
  throw new Error("equals button issue");
} else if (!clearButton) {
  throw new Error("clear button issue");
}

//handle functions
const handleNumberClick = (e: Event) => {
  if (["+", "-", "*", "/"].includes(screenHeader.textContent)) {
    calculation.push(screenHeader.textContent);
    screenHeader.textContent = "";
  }
  const target = e.target as HTMLInputElement;
  console.log(target.value);
  screenHeader.textContent += target.value;

  screenHeader2.textContent = calculation.join(" ");
};

let calculation = [];

const handleOperationClick = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (!screenHeader.textContent) {
    alert("cannot start with operator");
    return;
  } else if (["+", "-", "x", "/"].includes(screenHeader.textContent)) {
    screenHeader.textContent = target.value;
    return;
  } else {
    calculation.push(parseFloat(screenHeader.textContent));
    console.log(target.value);
    screenHeader.textContent = target.value;
    screenHeader2.textContent = calculation.join(" ");
  }
};

const handleEqualsClick = (e: Event) => {
  if (["+", "-", "x", "/"].includes(screenHeader.textContent)) {
    screenHeader.textContent = "";
  }
  calculation.push(parseFloat(screenHeader.textContent));
  screenHeader.textContent = "Answer: ";
  const fullQuestion = calculation.join(" ");
  const answer = eval(fullQuestion);
  screenHeader2.textContent = fullQuestion + "=" + `${answer}`;
};

const handleClearScreen = (e: Event) => {
  screenHeader.textContent = "";
  screenHeader2.textContent = "";
  calculation = [];
};

//eventListeners
//setup objects to store buttons
const numberObj = {};
for (let numberButton of numberButtons?.children) {
  numberButton.addEventListener("click", handleNumberClick);
  numberObj[numberButton.value] = numberButton;
}
console.log(numberObj);

const operationObj = {};
for (let operationsButton of operationsButtons?.children) {
  operationsButton.addEventListener("click", handleOperationClick);
  operationObj[operationsButton.value] = operationsButton;
}
console.log(operationObj);

equalsButton.addEventListener("click", handleEqualsClick);
clearButton.addEventListener("click", handleClearScreen);
