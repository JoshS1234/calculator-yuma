const splitCalc = ["1", "*", "2", "+", "3", "-", "8", "/", "4"];
const strCalc = splitCalc.join(" ");

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

recursiveCalc(strCalc);
console.log(recursiveCalc(strCalc));
