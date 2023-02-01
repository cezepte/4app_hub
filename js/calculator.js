export default class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clearData()
    }

    clearData() {
        this.currentOperand = '0'
        this.previousOperand = '0'
        this.operation = undefined
    }

    deleteNumber() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumberToDisplay(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation, type) {
        let choosenType = type
        if (choosenType == "double-parameter") {
            console.log('here')
            console.log(this.currentOperand, this.previousOperand)
            if (this.currentOperand === '') return
            if (this.previousOperand !== '') {
                console.log('is here as well')
                this.calculate(choosenType)
            }
            this.operation = operation
            this.previousOperandTextElement.style.display = "none"
            this.currentOperandTextElement.style.display = "block"
            this.previousOperand = this.currentOperand
            this.currentOperand = '0'

        } else if (choosenType == "single-parameter") {
            this.operation = operation
            this.calculate(choosenType)
            this.currentOperand = this.previousOperand
        }
    }

    calculate(type) {
        let result
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        console.log(type)
        if (isNaN(prev) && isNaN(current)) {
            return
        }
        if (type == 'single-parameter') {
            console.log('is here')
            console.log(current)
            console.log(this.operation)
            switch (this.operation) {
                case 'sin':
                    result = Math.sin(current)
                    console.log(result)
                    break;
                case 'cos':
                    result = Math.cos(current)
                    console.log(result)
                    break;
                case 'tan':
                    result = Math.tan(current)
                    console.log(result)
                    break;
                case 'sinh':
                    result = Math.sinh(current)
                    console.log(result)
                    break;
                case 'cosh':
                    result = Math.cosh(current)
                    console.log(result)
                    break;
                case 'tanh':
                    result = Math.tanh(current)
                    console.log(result)
                    break;
                case '√x':
                    result = Math.sqrt(current)
                    break;
                case '∛x':
                    result = Math.cbrt(current)
                    break;
                case 'log10':
                    result = Math.log10(current)
                    break;
                case 'ln':
                    result = Math.log(current)
                    break;
                case 'x2':
                    result = Math.pow(current, 2)
                    break;
                case 'x3':
                    result = Math.pow(current, 3)
                    break;
                case 'ex':
                    result = Math.exp(current)
                    break;
                case '10x':
                    result = Math.pow(10, current)
                    break;
                case '2x':
                    result = Math.pow(2, current)
                    break;
                case '1/x':
                    result = 1 / current
                    break;
                case '+/-':
                    result = - current
                    break;
                case '%':
                    result = current * 100 + '%'
                    break;
                case 'x!':
                    let n = current
                    result = 1
                    while (n > 0) {
                        result = result * n
                        n--
                    }
                    break;
                case 'e':
                    result = Math.E
                    break;
                case 'π':
                    result = Math.PI
                    break;
                case 'Rand':
                    result = Math.random()
                    break;
            }
            this.previousOperand = result
            this.operation = undefined
            this.currentOperand = ''
        } else if (type == "double-parameter") {
            switch (this.operation) {
                case '+':
                    result = prev + current
                    console.log(result)
                    break
                case '-':
                    result = prev - current
                    break
                case 'X':
                    result = prev * current
                    break
                case '/':
                    result = prev / current
                    break
                case 'yx':
                    result = Math.pow(prev, current)
                    break;
                case 'y√x':
                    result = Math.pow(prev, 1 / current)
                    break;
                default:
                    console.log(this.operation)
                    return
            }
            this.currentOperand = result
            this.operation = undefined
            this.previousOperand = ''
        }
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integer = parseFloat(stringNumber.split('.')[0])
        const decimal = stringNumber.split('.')[1]
        let intToShow
        if (isNaN(integer)) {
            intToShow = ''
        } else {
            intToShow = integer.toLocaleString(undefined, { maximumFractionDigits: 10 })
        }
        if (decimal != null) {
            return `${intToShow}.${decimal}`
        } else {
            return intToShow
        }
    }

    updateDisplay() {
        console.log(this.currentOperand)
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)}`
        } else {
            this.previousOperandTextElement.innerText = '0'
        }
    }
}
