class Calculator {
    constructor() { }
    sum(x, y) {
        return x + y
    }
    diff(x, y) {
        return x - y
    }
    multiple(x, y) {
        return x * y
    }
    div(x, y) {
        return x / y
    }
    sqrt(x, y) {
        if (y == 0) {
            return 1;
        } else if (y < 0) {
            return 'err!'
        } else {
            let placeholder = 1
            for (let i = 0; i < y; i++) {
                placeholder = placeholder * x
            }
            return placeholder
        }
    }
}
module.exports = new Calculator()