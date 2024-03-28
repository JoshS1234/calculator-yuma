const numberButtons = document.querySelector(
  ".button-container__number-buttons"
);

const operationsButtons = document.querySelector(
  ".button-container__operations-buttons"
);

const screenHeader: HTMLHeadingElement = document.querySelector(
  ".screen__output-header--1"
);

const screenHeader2: HTMLHeadingElement = document.querySelector(
  ".screen__output-header--2"
);

const equalsButton: HTMLButtonElement =
  document.querySelector("#button--equals");

const clearButton: HTMLButtonElement = document.querySelector("#button--clear");

const plusMinusButton: HTMLButtonElement =
  document.querySelector("#button--plusMinus");

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
const clearAll = () => {
  screenHeader.textContent = "";
  screenHeader2.textContent = "";
  calculation = [];
  hasEqualled = false;
};

const myEval = (calcString: string): number => {
  let calcArr = calcString.split(" ");

  while (calcArr.includes("*")) {
    const pos = calcArr.indexOf("*");
    const miniAns = parseFloat(calcArr[pos - 1]) * parseFloat(calcArr[pos + 1]);
    calcArr = calcArr
      .slice(0, pos - 1)
      .concat([`${miniAns}`])
      .concat(calcArr.slice(pos + 2));
  }

  while (calcArr.includes("/")) {
    const pos = calcArr.indexOf("/");
    const miniAns = parseFloat(calcArr[pos - 1]) / parseFloat(calcArr[pos + 1]);
    calcArr = calcArr
      .slice(0, pos - 1)
      .concat([`${miniAns}`])
      .concat(calcArr.slice(pos + 2));
  }

  while (calcArr.includes("+")) {
    const pos = calcArr.indexOf("+");
    const miniAns = parseFloat(calcArr[pos - 1]) + parseFloat(calcArr[pos + 1]);
    calcArr = calcArr
      .slice(0, pos - 1)
      .concat([`${miniAns}`])
      .concat(calcArr.slice(pos + 2));
  }

  while (calcArr.includes("-")) {
    const pos = calcArr.indexOf("-");
    const miniAns = parseFloat(calcArr[pos - 1]) - parseFloat(calcArr[pos + 1]);
    calcArr = calcArr
      .slice(0, pos - 1)
      .concat([`${miniAns}`])
      .concat(calcArr.slice(pos + 2));
  }

  return parseFloat(calcArr[0]);
};

//handle functions
const handleNumberClick = (e: Event) => {
  if (hasEqualled) {
    clearAll();
    hasEqualled = false;
  }

  //   if (screenHeader.textContent == "-" || screenHeader.textContent !== "+") {
  //   } else

  if (["+", "-", "*", "/"].includes(screenHeader.textContent)) {
    calculation.push(screenHeader.textContent);
    screenHeader.textContent = "";
  }
  const target = e.target as HTMLInputElement;
  screenHeader.textContent += target.value;

  screenHeader2.textContent = calculation.join(" ");
};

const handleOperationClick = (e: Event) => {
  if (hasEqualled) {
    //continue calculation from answer
    const ans = screenHeader2.textContent;
    clearAll();
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
    calculation.push(screenHeader.textContent);
    screenHeader.textContent = target.value;
    screenHeader2.textContent = calculation.join(" ");
  }
};

const handleEqualsClick = (e: Event) => {
  if (!hasEqualled) {
    if (!["+", "-", "x", "/"].includes(screenHeader.textContent)) {
      calculation.push(screenHeader.textContent);
      screenHeader.textContent = "";
    }
    screenHeader.textContent = "Answer: ";
    const fullQuestion = calculation.join(" ");
    console.log("MyEval", `${fullQuestion}`, myEval(`${fullQuestion}`));
    // const answer = eval(fullQuestion);
    const answer = myEval;
    calculation.push("=");
    calculation.push(answer);
    screenHeader2.textContent = `${calculation.join(" ")}`;
    hasEqualled = true;
  }
};

const handleClearScreen = (e: Event) => {
  clearAll();
};

const handlePlusMinusButtonClick = (e: Event) => {
  if (!hasEqualled) {
    if (/[0-9]/.test(screenHeader.textContent[0])) {
      screenHeader.textContent = "-" + screenHeader.textContent;
    } else if (screenHeader.textContent[0] == "-") {
      screenHeader.textContent = screenHeader.textContent?.slice(1);
    }
  } else {
    if (calculation[calculation.length - 1][0] == "-") {
      calculation[calculation.length - 1] =
        calculation[calculation.length - 1].slice(1);
      screenHeader2.textContent = calculation[calculation.length - 1];
    } else {
      calculation[calculation.length - 1] =
        "-" + calculation[calculation.length - 1];
      screenHeader2.textContent = calculation[calculation.length - 1];
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

const operationObj = {};
for (let operationsButton of operationsButtons?.children) {
  operationsButton.addEventListener("click", handleOperationClick);
  operationObj[operationsButton.value] = operationsButton;
}

equalsButton.addEventListener("click", handleEqualsClick);
clearButton.addEventListener("click", handleClearScreen);
plusMinusButton.addEventListener("click", handlePlusMinusButtonClick);
