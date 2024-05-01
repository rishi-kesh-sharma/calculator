// button types

const buttonTypes = {
  NUMERIC: "numeric",
  POINT: "point",
  OPERATOR: "operator",
  EQUAL_TO: "equalTo",
};

// button sizes
const buttonSizes = {
  SMALL: "sm",
  MEDIUM: "md",
  LARGE: "lg",
};

// operator values
const operatorValues = {
  ADD: "add",
  SUBTRACT: "subtract",
  MULTIPLY: "multiply",
  DIVIDE: "divide",
};

// button infos
const buttonsInfo = [
  {
    value: 1,
    symbol: "1",
    position: 0,
    size: buttonSizes.MEDIUM,
    type: buttonTypes.NUMERIC,
  },
  {
    value: 2,
    symbol: "2",
    position: 1,
    size: buttonSizes.MEDIUM,
    type: buttonTypes.NUMERIC,
  },
  {
    value: 3,
    symbol: "3",
    position: 2,
    size: "md",
    type: buttonTypes.NUMERIC,
  },
  {
    value: 4,
    symbol: "4",
    position: 4,
    size: "md",
    type: buttonTypes.NUMERIC,
  },
  {
    value: 5,
    symbol: "5",
    position: 5,
    size: "md",
    type: buttonTypes.NUMERIC,
  },
  {
    value: 6,
    symbol: "6",
    position: 6,
    size: "md",
    type: buttonTypes.NUMERIC,
  },
  {
    value: 7,
    symbol: "7",
    position: 8,
    size: "md",
    type: buttonTypes.NUMERIC,
  },
  {
    value: 8,
    symbol: "8",
    position: 9,
    size: "md",
    type: buttonTypes.NUMERIC,
  },
  {
    value: 9,
    symbol: "9",
    position: 10,
    size: "md",
    type: buttonTypes.NUMERIC,
  },
  {
    value: 0,
    symbol: "0",
    position: 12,
    size: "md",
    type: buttonTypes.NUMERIC,
  },

  {
    value: operatorValues.ADD,
    symbol: "+",
    position: 3,
    size: "md",
    type: buttonTypes.OPERATOR,
  },
  {
    value: operatorValues.SUBTRACT,
    symbol: "-",
    position: 7,
    size: "md",
    type: buttonTypes.OPERATOR,
  },
  {
    value: operatorValues.MULTIPLY,
    symbol: "*",
    position: 11,
    size: "md",
    type: buttonTypes.OPERATOR,
  },
  {
    value: operatorValues.DIVIDE,
    symbol: "/",
    position: 15,
    size: "md",
    type: buttonTypes.OPERATOR,
  },
  {
    // value: 1,
    symbol: "=",
    position: 14,
    size: "md",
    type: buttonTypes.EQUAL_TO,
  },
  {
    // value: 1,
    symbol: ".",
    position: 13,
    size: "md",
    type: buttonTypes.POINT,
  },
];

// class calculator
class Calculator {
  result;
  currentExpression = "";

  //   screen update
  updateScreen(expression) {
    this.currentExpression = `${this.currentExpression}${expression}`;
    screenElem.innerText = this.currentExpression;
  }

  //   calculate result on =
  calculateResult() {
    this.result = eval(this.currentExpression).toPrecision(5);
  }

  //   display result by emptying current expression and calling update screen with the result
  showResult() {
    this.currentExpression = "";
    this.updateScreen(this.result);
  }
}

// buttons container
const buttonsContainerElem = document.querySelector(".buttons");

// screen element
const screenElem = document.querySelector("#screen");

// class button
class Button {
  value;
  symbol;
  position;
  size;
  type;
  constructor(value, symbol, position, size, type) {
    this.value = value;
    this.symbol = symbol;
    this.position = position;
    this.size = size;
    this.type = type;
  }

  //   draw button of calculator
  drawButton() {
    // <button class="button">1</button>

    // create button element
    const buttonElem = document.createElement("button");
    buttonElem.classList.add = "button";

    // positioning not working
    // buttonElem.style.gridRow = `${this.position}/${this.position + 1}`;
    buttonElem.innerText = this.symbol;
    buttonsContainerElem.appendChild(buttonElem);
    buttonElem.addEventListener("click", this.handleButtonClick);
  }

  //   button on click handler
  handleButtonClick = (e) => {
    // if button is = then calculate result and show result
    if (this.type === buttonTypes.EQUAL_TO) {
      calculator.calculateResult();
      calculator.showResult();

      //   else update screen
    } else {
      const splittedExpression = calculator.currentExpression.split("");
      const lastItem = splittedExpression[splittedExpression.length - 1];

      // if the current expression is empty  only allow to update screen if the incoming symbol is numeric value
      if (
        (calculator.currentExpression == "" &&
          this.type == buttonTypes.NUMERIC) ||
        Boolean(parseInt(lastItem)) !== Boolean(parseInt(this.symbol))
      ) {
        calculator.updateScreen(this.symbol);
      } else {
        calculator.updateScreen(this.symbol);
      }
    }
  };
}

// instantiate calculator
const calculator = new Calculator();

// initial setup

function setup() {
  // empty the screen
  calculator.updateScreen("");

  //   create and draw buttons
  buttonsInfo.map((buttonInfo) => {
    const { value, symbol, position, size, type } = buttonInfo;
    const button = new Button(value, symbol, position, size, type);
    button.drawButton();
  });
}

// call setup
setup();
