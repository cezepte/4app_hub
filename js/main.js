"use strict";
import Calculator from './calculator.js'
import Gallery from './gallery.js';
import Memory from './memory.js';
import Tictactoe from './tictactoe.js';

window.addEventListener('DOMContentLoaded', () => {
    const navlist = document.querySelectorAll('nav ul li')
    const backlight = document.querySelector('nav .backlight')

    document.getElementById('main-page-link').classList.add('active')
    switchContent(document.getElementById('main-page-link'))
    navlist.forEach((item) => {
        item.addEventListener('mouseover', () => {
            backlight.classList.add('hovered')
            let pos = item.getBoundingClientRect()
            backlight.style.left = pos.x + 'px'
            backlight.style.top = pos.y + 'px'
            backlight.style.height = pos.height + 'px'
            backlight.style.width = pos.width + 'px'
        })
        item.addEventListener('mouseout', () => {
            backlight.classList.remove('hovered')
        })
        item.addEventListener('click', async () => {
            navlist.forEach((item1) => {
                item1.classList.remove('active')
            })
            item.classList.add('active')
            await switchContent(item)
        })
    })
})

async function switchContent(navbarItem) {
    let pageName = navbarItem.id.replace('-link', '')
    fetch(`./pages/${pageName}.html`)
        .then((response) => {
            return response.text()
        })
        .then((html) => {
            document.getElementById('content-display-1').innerHTML = html
        })
        .then(() => {
            switch (navbarItem.id) {
                case 'main-page-link':
                    break;
                case 'calculator-link':
                    console.log('calculator')
                    const numbers = document.querySelectorAll('.number')
                    const doubleParameterButtons = document.querySelectorAll('.double-parameter')
                    const singleParameterButtons = document.querySelectorAll('.single-parameter')
                    const equalsButton = document.getElementById('equal-button')
                    const allClearButton = document.querySelector('#ac-button')
                    let firstVal = document.querySelector('#calculator-display-value-1')
                    let secondVal = document.querySelector('#calculator-display-value-2')
                    firstVal.style.display = "none"
                    let typeOfOperation
                    let calculator = new Calculator(firstVal, secondVal)
                    numbers.forEach(button => {
                        button.addEventListener('click', () => {
                            calculator.appendNumberToDisplay(button.innerText)
                            calculator.updateDisplay()
                        })
                    })
                    doubleParameterButtons.forEach(button => {
                        button.addEventListener('click', () => {
                            typeOfOperation = 'double-parameter'
                            calculator.chooseOperation(button.innerText, typeOfOperation)
                            calculator.updateDisplay()
                        })
                    })
                    singleParameterButtons.forEach(button => {
                        button.addEventListener('click', () => {
                            typeOfOperation = 'single-parameter'
                            calculator.chooseOperation(button.innerText, typeOfOperation)
                            calculator.updateDisplay()
                        })
                    })
                    allClearButton.addEventListener('click', button => {
                        calculator.clearData()
                        calculator.updateDisplay()
                    })

                    equalsButton.addEventListener('mousedown', button => {
                        calculator.calculate(typeOfOperation)
                        calculator.updateDisplay()
                    })
                    document.addEventListener('keydown', function (event) {
                        let patternForNumbers = /[0-9]/g;
                        let patternForOperators = /[+\-*\/]/g
                        if (event.key.match(patternForNumbers)) {
                            event.preventDefault();
                            calculator.appendNumberToDisplay(event.key)
                            calculator.updateDisplay()
                        }
                        if (event.key === '.') {
                            event.preventDefault();
                            calculator.appendNumberToDisplay(event.key)
                            calculator.updateDisplay()
                        }
                        if (event.key.match(patternForOperators)) {
                            event.preventDefault();
                            calculator.chooseOperation(event.key)
                            calculator.updateDisplay()
                        }
                        if (event.key === 'Enter' || event.key === '=') {
                            event.preventDefault();
                            calculator.compute()
                            calculator.updateDisplay()
                        }
                        if (event.key === "Backspace") {
                            event.preventDefault();
                            calculator.deleteNumber()
                            calculator.updateDisplay()
                        }
                        if (event.key == 'Delete') {
                            event.preventDefault();
                            calculator.clear()
                            calculator.updateDisplay()
                        }
                    });
                    break
                case 'gallery-link':
                    document.addEventListener('keydown', () => { })
                    let gallery = new Gallery('photo-', 10, './assets/gallery/', document.getElementById('image-slider'), document.getElementById('main-image'))
                    const miniImages = document.querySelectorAll('.mini-image')
                    gallery.setMainImage('mini-image-1')
                    miniImages.forEach(image => {
                        image.addEventListener('click', (event) => {
                            gallery.setMainImage(event.target.id)
                        })
                    })
                    break;
                case 'memory-link':
                    const imgHolders = document.querySelectorAll('.left')
                    const cubeHolders = document.querySelectorAll('.cube')
                    let memory = new Memory(10, imgHolders, './assets/memory/', document.getElementById('best-score'), document.getElementById('current-score'))
                    memory.shuffle()
                    cubeHolders.forEach(cube => {
                        cube.addEventListener('click', async () => {
                            cube.classList.toggle('active-cube')
                            memory.showAndCompare()
                            setTimeout(() => {
                                let matchedPairs = document.querySelectorAll('.matched')
                                console.log(matchedPairs)
                                if (matchedPairs.length == 20) {
                                    setTimeout(() => {
                                        document.getElementById('overlay').style.display = 'flex'
                                        document.getElementById('memory-container').style.display = 'none'
                                        let scores = memory.getScores()
                                        document.getElementById('overlay-header').innerHTML = `Gra zako??czona! <br> Tw??j wynik: ${scores[0]} <br> Najlepszy wynik: ${scores[1]}`
                                        document.getElementById('overlay-shuffle').innerHTML = 'Zagraj ponownie'
                                    }, 500)
                                }
                            }, 600)
                        })
                    })
                    document.getElementById('sidebar-shuffle').addEventListener('click', () => {
                        console.log('clicked')
                        memory.shuffle()
                    })
                    document.getElementById('overlay-shuffle').addEventListener('click', () => {
                        document.getElementById('overlay').style.display = 'none'
                        document.getElementById('memory-container').style.display = 'flex'
                    })
                    break;
                case 'tictactoe-link':
                    const fields = document.querySelectorAll('.cell')
                    let tictactoe = new Tictactoe(document.getElementById('result'))
                    fields.forEach(field => {
                        field.addEventListener('click', (event) => {
                            tictactoe.insert(field)
                        })
                    })
                    document.getElementById('newGame').addEventListener('click', () => {
                        tictactoe.newGame()
                    })
                    break;
            }
        })
}