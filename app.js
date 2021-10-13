//Followed the guide here: https://www.freecodecamp.org/news/how-to-build-an-html-calculator-app-from-scratch-using-javascript-4454b8714b98/

const calculator = document.querySelector("#calculator");
const keys = calculator.querySelector("#button-container");

const calculate = (n1, operator, n2) => {
    let result = ''
    const firstNum = parseFloat(n1);
    const secondNum = parseFloat(n2);
    switch (operator) {
        case 'add':
            return firstNum + secondNum;
        case 'subtract':
            return firstNum - secondNum; 
        case 'multiply':
            return firstNum * secondNum; 
        case 'divide':
            return firstNum / secondNum; 
    }
}

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
      const display = document.querySelector('#calculator-input');

      const key = e.target;
      const action = key.dataset.action
      const keyContent = key.textContent
      const displayNum = display.textContent;
      const previousKeyType = calculator.dataset.previousKeyType;

      if (!action) {
          calculator.dataset.previousKeyType = 'number'
          if (displayNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
              display.textContent = keyContent;
          } else {
              display.textContent = displayNum + keyContent;
          }
      }
      if (
          action == 'add'      ||
          action == 'subtract' ||
          action == 'multiply' ||
          action == 'divide'
      ){
        const firstValue = calculator.dataset.firstValue
        const operator = calculator.dataset.operator
        const secondValue = displayNum
        display.textContent = displayNum
  
        if (firstValue && 
            operator && 
            previousKeyType !== 'operator' &&
            previousKeyType !== 'calculate') {
            const calcValue = calculate(firstValue, operator, secondValue)
            display.textContent = calcValue;

            calculator.dataset.firstValue = calcValue;
        } else {
            calculator.dataset.firstValue = displayNum;
        }
        calculator.dataset.previousKeyType = 'operator';
        calculator.dataset.operator = action;

      }
      if (action === 'decimal') {
          if (!(display.textContent.includes('.'))){
            display.textContent = displayNum + '.';
          }
          else if ( previousKeyType === 'operator' || previousKeyType === 'calculate') {
            display.textContent = '0.'
          }
          calculator.dataset.previousKeyType = 'decimal'
      }
      if (action === 'clear') {
        if (key.textContent === 'AC') {
            calculator.dataset.firstValue = ''
            calculator.dataset.modValue = ''
            calculator.dataset.operator = ''
            calculator.dataset.previousKeyType = ''
          } else {
            key.textContent = 'AC'
          }
        display.textContent = 0
        calculator.dataset.previousKeyType = 'clear'

        }
      if (action === 'calculate') {
        let secondValue = displayNum;
        let firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;

        if (firstValue) {
            if (previousKeyType === 'calculate') {
                firstValue = displayNum
                secondValue = calculator.dataset.modValue;
            }
            display.textContent = calculate(firstValue, operator, secondValue);
        }
        calculator.dataset.modValue = secondValue;
        calculator.dataset.previousKeyType = 'calculate'
      }
      if (action === 'negate') {
        calculator.dataset.previousKeyType = 'negate'
        if (previousKeyType === 'number' || 
            previousKeyType === 'negate' ||
            previousKeyType === 'calculate') {
            display.textContent = -1 *(display.textContent);
        }
        
      }
      if (action === 'percent') {
        calculator.dataset.previousKeyType = 'percent'
        if (previousKeyType === 'number' || 
            previousKeyType === 'calculate') {
            display.textContent = display.textContent / 100;
        }
        
      }
      if (action !=='clear') {
          const clearButton = calculator.querySelector('[data-action=clear]')
          clearButton.textContent = 'CE';
      }
    }
   })
