//import any buttons
const numberButtons = document.querySelectorAll(
  ".button-container__button--number"
);

const operationsButtons = document.querySelectorAll(
  ".button-container__button--operation"
);

const screenHeader: HTMLHeadingElement = document.querySelector(
  "#screen__output-header-1"
);

const screenHeader2: HTMLHeadingElement = document.querySelector(
  "#screen__output-header-2"
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

const ranButton: HTMLButtonElement = document.querySelector(
  "#button-container__button--ran"
);

const backspaceButton: HTMLButtonElement = document.querySelector(
  "#button-container__button--backspace"
);

const lightModeButton: HTMLButtonElement = document.querySelector(
  ".footer__light-mode-button"
);

const body = document.querySelector(".main-body");
const screenBackground = document.querySelectorAll(".screen");
const footerTitle = document.querySelector(".footer__title");

//error handling with button imports from HTML
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
} else if (!ranButton) {
  throw new Error("ran button issue");
} else if (!backspaceButton) {
  throw new Error("backspace button issue");
} else if (!lightModeButton) {
  throw new Error("light mode button issue");
} else if (!body) {
  throw new Error("body issue");
} else if (!screenBackground) {
  throw new Error("screen issue");
}

//useful variables
//calculation keeps track of the overall calculation
let calculation: string[] = [];
//hasEqualled keeps track of whether an answer is showing
let hasEqualled = false;
//sets theme
let lightMode = false;
//wipes the screen, calculation and starts a new calculation
const clearAll = () => {
  screenHeader.textContent = "";
  screenHeader2.textContent = "";
  calculation = [];
  hasEqualled = false;
};

//My version of the "eval()" function. It can handle negatives, squares and square roots.
//Is a very complicated system to account for lots of edge cases involving ordering of negatives, roots and squares
const myEval = (calcString: string): number => {
  //checks for a non-calculation
  if (calcString == "" || calcString == "√") {
    return 0;
  }
  let calcArr: (string | undefined)[] = calcString.split(" ");
  // if (calcArr.length == 2) {
  //   return parseFloat(calcString);
  // }

  //sorts through individual elements, looking for squares, square roots and negatives (or any combination of these)
  calcArr = calcArr.map((element: string) => {
    if (element[0] == "√" && element[1] == "-") {
      clearAll();
      alert("Maths error!!! cannot square root negative numbers");
      return;
    }
    if (element[0] == "-") {
      if (element[1] == "√" && element[element.length - 1] == "²") {
        return "-" + element.slice(2, -1);
      } else if (element[1] == "√") {
        return "-" + Math.sqrt(parseFloat(element.slice(2))).toString();
      } else if (element[element.length - 1] == "²") {
        return "-" + (parseFloat(element.slice(0, -1)) ** 2).toString();
      } else {
        return element;
      }
    } else {
      if (element[0] == "√" && element[element.length - 1] == "²") {
        return element.slice(1, -1);
      } else if (element[0] == "√") {
        return Math.sqrt(parseFloat(element.slice(1))).toString();
      } else if (element[element.length - 1] == "²") {
        return (parseFloat(element.slice(0, -1)) ** 2).toString();
      } else {
        return element;
      }
    }
  });
  //returns single step calculations (eg: square, square root, negatives)
  if (calcArr.length == 1) {
    return parseFloat(calcArr[0]);
  }

  //does any multiplications/divisions (left to right)
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

  //does any additions/subtractions (left to right)
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
  //if a number is pressed after an answer has been found, overwrite and start new calculation
  if (hasEqualled) {
    clearAll();
    hasEqualled = false;
  }

  //if there is an operator, push it to the calculation array and keep this number in storage
  if (["+", "-", "*", "/"].includes(screenHeader.textContent)) {
    calculation.push(screenHeader.textContent);
    screenHeader.textContent = target.value;
  }
  //if it is a root, allow numbers to follow
  else if (screenHeader.textContent == "√") {
    screenHeader.textContent += target.value;
  } else if (/\d*/.test(screenHeader.textContent)) {
    screenHeader.textContent += target.value;
  } else {
    alert("Issue with number buttons, edge case");
  }
  screenHeader2.textContent = calculation.join(" ");
};

const handleOperationClick = (e: Event) => {
  //continue calculation from answer
  if (hasEqualled) {
    const ans = screenHeader2.textContent;
    clearAll();
    screenHeader.textContent = ans;
    hasEqualled = false;
  }

  const target = e.target as HTMLInputElement;
  //can't start calculation with * or /
  if (!screenHeader.textContent) {
    if (target.value == "*" || target.value == "/") {
      alert("cannot start calculation with operators * OR /");
      return;
    } else if (target.value == "-" || target.value == "+") {
      alert(
        "to do positive/negative numbers, write number and then use plus/minus button"
      );
      return;
    }
  }
  //operators will overwrite each other
  else if (["+", "-", "*", "/", "√"].includes(screenHeader.textContent)) {
    screenHeader.textContent = target.value;
    return;
  }
  //if it is a number then push the number to the calculation array
  else if (/\d+/.test(screenHeader.textContent)) {
    calculation.push(screenHeader.textContent);
    screenHeader.textContent = target.value;
    screenHeader2.textContent = calculation.join(" ");
  } else {
    alert("issue with operation, edge case");
  }
};

const handleEqualsClick = (e: Event) => {
  if (!hasEqualled) {
    //if there is just a hanging operator, just ignore it and do the rest of the calculation
    if (!["+", "-", "*", "/", "√"].includes(screenHeader.textContent)) {
      calculation.push(screenHeader.textContent);
      screenHeader.textContent = "";
    }

    //collect together the calculation from the array, then pass to myEval to calculate
    const fullQuestion = calculation.join(" ");
    const answer = myEval(fullQuestion);
    screenHeader.textContent = `${fullQuestion + " = "}`;
    calculation.push("=");
    calculation.push(answer);
    screenHeader2.textContent = `${answer}`;
    hasEqualled = true;
  }
};

const handleClearScreen = (e: Event) => {
  //wipes out both screens, calculation array, and hasEqualled
  clearAll();
};

const handlePlusMinusButtonClick = (e: Event) => {
  //flips the sign of a number in the storage screen
  if (!hasEqualled) {
    if (/^√?[0-9]/.test(screenHeader.textContent)) {
      screenHeader.textContent = "-" + screenHeader.textContent;
    } else if (screenHeader.textContent[0] == "-") {
      screenHeader.textContent = screenHeader.textContent?.slice(1);
    }
  }
  //if there is an answer already, flips the sign of the answer
  else {
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

  //if there is an answer already, squares the answer as the first step of a new calculation
  if (hasEqualled) {
    screenHeader.textContent = screenHeader2.textContent + "²";
    screenHeader2.textContent = myEval(screenHeader.textContent);
  }
  //if it is partway through a calculation, square the value in the top screen
  else {
    //removes square if it is already squared
    if (currentNumber[currentNumber.length - 1] == "²") {
      screenHeader.textContent = screenHeader.textContent?.slice(0, -1);
    }
    //adds square symbol if it is not present
    else if (/-?√?[0-9]/.test(screenHeader.textContent)) {
      screenHeader.textContent = screenHeader.textContent + "²";
    } else if (screenHeader.textContent == "") {
      alert("Need to type a number first, then square");
    } else {
      alert("issue with square, edge case");
    }
  }
};

const handleSqrt = (e: Event) => {
  //if there is an answer already, begins new calculation with square root of answer
  if (hasEqualled) {
    screenHeader.textContent = "√" + screenHeader2.textContent;
    screenHeader2.textContent = myEval(screenHeader.textContent);
  }
  //if partway through a calculation, adds sqrt at the start of the line
  else {
    //if there is a square root already, removes it
    if (/√/.test(screenHeader.textContent)) {
      screenHeader.textContent = screenHeader.textContent
        ?.split("")
        .filter((element) => element != "√")
        .join("");
    }
    //if it is a positive or negative number, adds sqrt at the start (myEval is set to handle square roots of negatives)
    else if (/-?[0-9]+/.test(screenHeader.textContent)) {
      screenHeader.textContent = "√" + screenHeader.textContent;
    }
    //if it is empty, starts with a sqrt
    else if (screenHeader.textContent == "") {
      alert("Need to type a number first, then square root");
    }
    //if it is an operator, replaces it with sqrt
    else if (["+", "-", "*", "/"].includes(screenHeader.textContent)) {
      calculation.push(screenHeader.textContent);
      screenHeader2.textContent = calculation.join(" ");
      screenHeader.textContent = "√";
    } else {
      alert("Issue with sqrt, edge case");
    }
  }
};

const handleRan = () => {
  //creates a random number from 0 to 1

  const randomIntString = Math.random().toString();
  //if there is an answer on screen, wipe and start with random number
  if (hasEqualled) {
    clearAll();
    screenHeader.textContent = randomIntString;
    screenHeader2.textContent = "";
  }
  //if it is partway through a calculation, acts the same as deleting current number and typing a random number
  else {
    //check if a current number (positive or negative) is on screen, if so, replace it
    if (/-?\d/.test(screenHeader.textContent)) {
      screenHeader.textContent = randomIntString;
    } else if (screenHeader.textContent == "") {
      screenHeader.textContent = randomIntString;
    } else if (["+", "-", "*", "/"].includes(screenHeader.textContent)) {
      calculation.push(screenHeader.textContent);
      screenHeader2.textContent = calculation.join(" ");
      screenHeader.textContent = randomIntString;
    } else if (screenHeader.textContent == "√") {
      screenHeader.textContent += target.value;
      screenHeader2.textContent = calculation.join(" ");
    } else {
      alert("issue with random number, edge case");
    }
  }
};

const handleBackspace = () => {
  if (!hasEqualled) {
    if (screenHeader.textContent) {
      screenHeader.textContent = screenHeader.textContent?.slice(0, -1);
    }
  } else {
    clearAll();
  }
};

const handleLightMode = () => {
  const mostButtons = document.querySelectorAll(".button-container__button");

  if (!lightMode) {
    body?.classList.add("main-body--light");
    screenHeader?.classList.add("screen--light");
    screenHeader2?.classList.add("screen--light");
    footerTitle?.classList.add("footer__title--light");
    lightModeButton?.classList.add("footer__light-mode-button--light");
    mostButtons.forEach((button) => {
      button?.classList.add("button-container__button--light");
    });
    screenBackground.forEach((screen) => {
      screen?.classList.add("screen--light");
    });
    lightMode = true;
  } else {
    body?.classList.remove("main-body--light");
    screenHeader?.classList.remove("screen--light");
    screenHeader2?.classList.remove("screen--light");
    footerTitle?.classList.remove("footer__title--light");
    lightModeButton?.classList.remove("footer__light-mode-button--light");
    mostButtons.forEach((button) => {
      button?.classList.remove("button-container__button--light");
    });
    screenBackground.forEach((screen) => {
      screen?.classList.remove("screen--light");
    });
    lightMode = false;
  }

  // if (body?.classList.contains("main-body--light")) {
  //   body?.classList.remove("main-body--light");
  // } else {
  //   body?.classList.add("main-body--light");
  // }

  // screenBackground.forEach((screen) => {
  //   if (screen?.classList.contains("screen--light")) {
  //     screen?.classList.remove("screen--light");
  //   } else {
  //     screen?.classList.add("screen--light");
  //   }
  // });

  // if (screenHeader?.classList.contains("screen--light")) {
  //   screenHeader?.classList.remove("screen--light");
  // } else {
  //   screenHeader?.classList.add("screen--light");
  // }

  // if (screenHeader2?.classList.contains("screen--light")) {
  //   screenHeader2?.classList.remove("screen--light");
  // } else {
  //   screenHeader2?.classList.add("screen--light");
  // }

  // const mostButtons = document.querySelectorAll(".button-container__button");

  // mostButtons.forEach((button) => {
  //   if (button?.classList.contains("button-container__button--light")) {
  //     button?.classList.remove("button-container__button--light");
  //   } else {
  //     button?.classList.add("button-container__button--light");
  //   }
  // });
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
ranButton.addEventListener("click", handleRan);
backspaceButton.addEventListener("click", handleBackspace);
lightModeButton.addEventListener("click", handleLightMode);
