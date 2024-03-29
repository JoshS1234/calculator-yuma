const numberButtons = document.querySelectorAll(
  ".button-container__button--number"
);

const operationsButtons = document.querySelectorAll(
  ".button-container__button--operation"
);

const screenHeader: HTMLHeadingElement = document.querySelector(
  ".screen__output-header--1"
);

const screenHeader2: HTMLHeadingElement = document.querySelector(
  ".screen__output-header--2"
);

const equalsButton: HTMLButtonElement = document.querySelector(
  "#button-container__button--equals"
);

const clearButton: HTMLButtonElement = document.querySelector(
  "#button-container__button--clear"
);

const plusMinusButton: HTMLButtonElement = document.querySelector(
  "#button-container__button--plusMinus"
);

const squareButton: HTMLButtonElement = document.querySelector(
  "#button-container__button--square"
);

const sqrtButton: HTMLButtonElement = document.querySelector(
  "#button-container__button--sqrt"
);

const ranIntButton: HTMLButtonElement = document.querySelector(
  "#button-container__button--ranInt"
);

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
} else if (!squareButton) {
  throw new Error("square button issue");
} else if (!sqrtButton) {
  throw new Error("squareRoot button issue");
} else if (!ranIntButton) {
  throw new Error("ranInt button issue");
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
  if (calcString == "") {
    return 0;
  }
  let calcArr = calcString.split(" ");
  if (calcArr.length == 2) {
    return parseFloat(calcString);
  }

  calcArr = calcArr.map((element) => {
    if (element[0] == "√" && element[element.length - 1] == "²") {
      console.log("both");
      return element.slice(1, -1);
    } else if (element[0] == "√") {
      return Math.sqrt(parseFloat(element.slice(1))).toString();
    } else if (element[element.length - 1] == "²") {
      return parseFloat(element.slice(0, -1) ** 2).toString();
    } else {
      return element;
    }
  });
  console.log(calcArr);

  while (calcArr.includes("*") || calcArr.includes("/")) {
    let i = 0;
    while (calcArr[i] !== "*" && calcArr[i] !== "/") {
      i++;
    }

    let miniAns;
    if (calcArr[i] == "*") {
      miniAns = parseFloat(calcArr[i - 1]) * parseFloat(calcArr[i + 1]);
    } else if (calcArr[i] == "/") {
      miniAns = parseFloat(calcArr[i - 1]) / parseFloat(calcArr[i + 1]);
    }

    calcArr = calcArr
      .slice(0, i - 1)
      .concat([`${miniAns}`])
      .concat(calcArr.slice(i + 2));
  }

  while (calcArr.includes("+") || calcArr.includes("-")) {
    let i = 0;
    while (calcArr[i] !== "+" && calcArr[i] !== "-") {
      i++;
    }

    let miniAns;
    if (calcArr[i] == "+") {
      miniAns = parseFloat(calcArr[i - 1]) + parseFloat(calcArr[i + 1]);
    } else if (calcArr[i] == "-") {
      miniAns = parseFloat(calcArr[i - 1]) - parseFloat(calcArr[i + 1]);
    }

    calcArr = calcArr
      .slice(0, i - 1)
      .concat([`${miniAns}`])
      .concat(calcArr.slice(i + 2));
  }

  return parseFloat(calcArr[0]);
};

//handle functions
const handleNumberClick = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (hasEqualled) {
    clearAll();
    hasEqualled = false;
  }

  if (["+", "-", "*", "/"].includes(screenHeader.textContent)) {
    calculation.push(screenHeader.textContent);
    screenHeader.textContent = "";
  }
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
    }
  } else if (["+", "-", "*", "/", "√"].includes(screenHeader.textContent)) {
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
    if (!["+", "-", "*", "/"].includes(screenHeader.textContent)) {
      calculation.push(screenHeader.textContent);
      screenHeader.textContent = "";
    }
    const fullQuestion = calculation.join(" ");
    console.log("MyEval", `${fullQuestion}`, myEval(`${fullQuestion}`));
    // const answer = eval(fullQuestion);
    const answer = myEval(fullQuestion);
    screenHeader.textContent = `${fullQuestion + " = "}`;
    calculation.push("=");
    calculation.push(answer);
    // screenHeader2.textContent = `${calculation.join(" ")}`;
    screenHeader2.textContent = `${answer}`;
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
    screenHeader.textContent = "";
    if (screenHeader2.textContent[0] == "-") {
      screenHeader2.textContent = screenHeader2.textContent?.slice(1);
    } else {
      screenHeader2.textContent = "-" + screenHeader2.textContent;
    }
  }
};

const handleSquare = (e: Event) => {
  const currentNumber = screenHeader.textContent;

  if (hasEqualled) {
    screenHeader.textContent = screenHeader2.textContent + "²";
    screenHeader2.textContent =
      parseFloat(screenHeader.textContent.slice(0, -1)) ** 2;
  } else {
    if (currentNumber[currentNumber.length - 1] == "²") {
      screenHeader.textContent = screenHeader.textContent?.slice(0, -1);
    } else if (/[0-9]/.test(screenHeader.textContent[0])) {
      screenHeader.textContent = screenHeader.textContent + "²";
    } else if (screenHeader.textContent[0] == "√") {
      screenHeader.textContent = screenHeader.textContent + "²";
    } else if (screenHeader.textContent == "") {
    } else if (["+", "-", "*", "/"].includes(screenHeader.textContent)) {
    }
  }
};

const handleSqrt = (e: Event) => {
  if (hasEqualled) {
    screenHeader.textContent = "√" + screenHeader2.textContent;
    screenHeader2.textContent = myEval(screenHeader.textContent);
  } else {
    console.log(calculation);
    if (/[0-9]/.test(screenHeader.textContent[0])) {
      screenHeader.textContent = "√" + screenHeader.textContent;
    } else if (screenHeader.textContent == "") {
      screenHeader.textContent = "√";
    } else if (["+", "-", "*", "/"].includes(screenHeader.textContent)) {
      calculation.push(screenHeader.textContent);
      screenHeader2.textContent = calculation.join(" ");
      screenHeader.textContent = "√";
    } else if (screenHeader.textContent[0] == "√") {
      screenHeader.textContent = screenHeader.textContent?.slice(1);
    }
  }
};

const handleRanInt = () => {
  console.log("random int pressed");
  const randomIntString = Math.ceil(Math.random() * 10).toString();
  if (hasEqualled) {
    //if there is an answer on screen, wipe and start with random number
    clearAll();
    screenHeader.textContent = randomIntString;
    screenHeader2.textContent = "";
  } else {
    //check if a current number (positive or negative) is on screen, if so, replace it
    if (/-?\d/.test(screenHeader.textContent)) {
      screenHeader.textContent = randomIntString;
    } else if (screenHeader.textContent == "") {
      screenHeader.textContent = randomIntString;
    } else if (["+", "-", "*", "/"].includes(screenHeader.textContent)) {
      calculation.push(screenHeader.textContent);
      screenHeader.textContent = "";
    } else if (screenHeader.textContent == "√") {
      screenHeader.textContent += target.value;
      screenHeader2.textContent = calculation.join(" ");
    }
  }
};

//eventListeners
numberButtons.forEach((numberButton) => {
  numberButton.addEventListener("click", handleNumberClick);
});

operationsButtons.forEach((operationButton) => {
  operationButton.addEventListener("click", handleOperationClick);
});

equalsButton.addEventListener("click", handleEqualsClick);
clearButton.addEventListener("click", handleClearScreen);
plusMinusButton.addEventListener("click", handlePlusMinusButtonClick);
squareButton.addEventListener("click", handleSquare);
sqrtButton.addEventListener("click", handleSqrt);
ranIntButton.addEventListener("click", handleRanInt);
