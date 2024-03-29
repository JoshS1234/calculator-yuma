const splitCalc = [
  "1",
  "*",
  "2",
  "+",
  "3",
  "-",
  "8",
  "/",
  "4",
  "+",
  "√4",
  "+",
  "3²",
  "+",
  "√4²",
];
const strCalc = splitCalc.join(" ");

const myEval = (calcString) => {
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

console.log(myEval(strCalc));
