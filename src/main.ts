const numberButtons = document.querySelector(
  ".button-container__numbers-buttons"
);
console.log(numberButtons);

const operationsButtons = document.querySelector(
  ".button-container__operations-buttons"
);
console.log(operationsButtons);

const screenHeader: HTMLHeadingElement = document.querySelector(
  ".screen__output-header--1"
);
console.log(screenHeader);

const screenHeader2: HTMLHeadingElement = document.querySelector(
  ".screen__output-header--2"
);
console.log(screenHeader2);

const equalsButton: HTMLButtonElement =
  document.querySelector("#button--equals");
console.log(equalsButton);

const clearButton: HTMLButtonElement = document.querySelector("#button--clear");
console.log(clearButton);

const plusMinusButton: HTMLButtonElement =
  document.querySelector("#button--plusMinus");
console.log(plusMinusButton);

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
} else if (!plusMinusButton) {
  throw new Error("plusMinus button issue");
}

//useful variables
let calculation = [];
let hasEqualled = false;

//handle functions
const handleNumberClick = (e: Event) => {
  if (hasEqualled) {
    handleClearScreen();
    hasEqualled = false;
  }

  //   if (screenHeader.textContent == "-" || screenHeader.textContent !== "+") {
  //   } else

  if (["+", "-", "*", "/"].includes(screenHeader.textContent)) {
    calculation.push(screenHeader.textContent);
    screenHeader.textContent = "";
  }
  const target = e.target as HTMLInputElement;
  console.log(target.value);
  screenHeader.textContent += target.value;

  screenHeader2.textContent = calculation.join(" ");
};

const handleOperationClick = (e: Event) => {
  if (hasEqualled) {
    //continue calculation from answer
    const ans = screenHeader2.textContent;
    handleClearScreen();
    screenHeader.textContent = ans;
    hasEqualled = false;
  }
  const target = e.target as HTMLInputElement;
  if (!screenHeader.textContent) {
    if (target.value == "*" || target.value == "/") {
      alert("cannot start calculation with operators * OR /");
      return;
    } else {
      screenHeader.textContent = target.value;
    }
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
  if (!hasEqualled) {
    if (!["+", "-", "x", "/"].includes(screenHeader.textContent)) {
      calculation.push(parseFloat(screenHeader.textContent));
      screenHeader.textContent = "";
    }
    screenHeader.textContent = "Answer: ";
    const fullQuestion = calculation.join(" ");
    const answer = eval(fullQuestion);
    calculation.push("=");
    calculation.push(answer);
    console.log(calculation.join(" "));
    screenHeader2.textContent = `${calculation.join(" ")}`;
    hasEqualled = true;
  }
};

const handleClearScreen = (e: Event) => {
  screenHeader.textContent = "";
  screenHeader2.textContent = "";
  calculation = [];
  hasEqualled = false;
};

const handlePlusMinusButtonClick = (e: Event) => {
  if (!hasEqualled) {
    if (/[0-9]/.test(screenHeader.textContent[0])) {
      screenHeader.textContent = "-" + screenHeader.textContent;
    } else if (screenHeader.textContent[0] == "-") {
      screenHeader.textContent = screenHeader.textContent?.slice(1);
    }
  } else {
    if (screenHeader2.textContent[0] == "-") {
      screenHeader2.textContent = screenHeader2.textContent?.slice(1);
    } else {
      screenHeader2.textContent = "-" + screenHeader2.textContent;
    }
  }
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
plusMinusButton.addEventListener("click", handlePlusMinusButtonClick);
