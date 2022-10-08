"use scrict";

const numberBtns = document.querySelectorAll("[data-number]");
const opsBtns = document.querySelectorAll("[data-ops]");
const equalsBtn = document.querySelector("[data-equals]");
const deleteBtn = document.querySelector("[data-delete]");
const clearBtn = document.querySelector("[data-clear]");
const previousOperandElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandElement = document.querySelector("[data-current-operand]");
const signBtn = document.querySelector("[data-sign]");
const percentageBtn = document.querySelector("[data-percentage]");

class Calculator {
  constructor(previousOperandElement, currentOperandElement) {
    this.previousOperand = previousOperandElement;
    this.currentOperand = currentOperandElement;
    this.clear();
  }

  clear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.toString().includes(".")) {
      return;
    }
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  changeSign() {
    if (this.currentOperand.toString().includes("-")) {
      this.currentOperand = this.currentOperand
        .toString()
        .substr(1, this.currentOperand.toString().length);
    } else {
      this.currentOperand = "-" + this.currentOperand.toString();
    }
  }

  showPercentage() {
    this.currentOperand = this.currentOperand / 100;
  }

  operate(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let result;
    const previous = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(previous) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        result = previous + current;
        break;
      case "-":
        result = previous - current;
        break;
      case "x":
        result = previous * current;
        break;
      case "*":
        result = previous * current;
        break;
      case "/":
        result = previous / current;
        break;
      default:
        return;
    }
    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = "";
  }

  updateDisplay() {
    currentOperandElement.innerText = this.currentOperand;
    if (this.operation != null) {
      previousOperandElement.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      previousOperandElement.innerText = this.previousOperand;
    }
  }
}

const calculator = new Calculator(
  previousOperandElement,
  currentOperandElement
);

clearBtn.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteBtn.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

numberBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.appendNumber(btn.innerText);
    calculator.updateDisplay();
  });
});

opsBtns.forEach((operation) => {
  operation.addEventListener("click", () => {
    calculator.operate(operation.innerText);
    calculator.updateDisplay();
  });
});

equalsBtn.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

signBtn.addEventListener("click", () => {
  calculator.changeSign();
  calculator.updateDisplay();
});

percentageBtn.addEventListener("click", () => {
  calculator.showPercentage();
  calculator.updateDisplay();
});

document.addEventListener("keydown", (e) => {
  const key = e.key;
  if (key >= 0 && key <= 9) {
    calculator.appendNumber(key);
    calculator.updateDisplay();
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    calculator.operate(key);
    calculator.updateDisplay();
  } else if (key === "Enter") {
    calculator.compute();
    calculator.updateDisplay();
  } else {
    return;
  }
});

/* Inspired from https://github.com/WebDevSimplified/Vanilla-JavaScript-Calculator */
