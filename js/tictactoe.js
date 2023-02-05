export default class Tictactoe {
    #move = 'x'
    #resultElem
    #isDone = 0
    constructor(resultElem) {
        this.#resultElem = resultElem
    }
    insert(element) {
        if (element.children.length == 0 && this.#isDone == 0) {
            let newElem = document.createElement('div')
            newElem.style.width = '100%'
            newElem.style.height = '100%'
            newElem.style.backgroundRepeat = 'no-repeat'
            newElem.style.backgroundSize = 'contain'
            newElem.style.zIndex = '-1'
            switch (this.#move) {
                case 'x':
                    element.classList.add('cross')
                    newElem.style.backgroundImage = "url('./assets/tictactoe/cross.png')"
                    element.append(newElem)
                    this.#move = 'o'
                    break;
                case 'o':
                    element.classList.add('circle')
                    newElem.style.backgroundImage = "url('./assets/tictactoe/circle.png')"
                    element.append(newElem)
                    this.#move = 'x'
                    break;
            }
            this.checkForWin()
        }
    }
    checkForWin() {
        const allPosibleWins = [
            ['cell-00', 'cell-01', 'cell-02'],
            ['cell-10', 'cell-11', 'cell-12'],
            ['cell-20', 'cell-21', 'cell-22'],
            ['cell-00', 'cell-10', 'cell-20'],
            ['cell-01', 'cell-11', 'cell-21'],
            ['cell-02', 'cell-12', 'cell-22'],
            ['cell-00', 'cell-11', 'cell-22'],
            ['cell-20', 'cell-11', 'cell-02']
        ]
        let circleIds = []
        let crossIds = []
        let circles = document.querySelectorAll('.circle')
        let crosses = document.querySelectorAll('.cross')
        circles.forEach(element => {
            circleIds.push(element.id)
        })
        crosses.forEach(element => {
            crossIds.push(element.id)
        })
        if (circles.length >= 3 || crosses.length >= 3) {
            allPosibleWins.forEach(posibility => {
                if (circleIds.includes(posibility[0]) && circleIds.includes(posibility[1]) && circleIds.includes(posibility[2])) {
                    posibility.forEach(cell => {
                        document.getElementById(cell).style.backgroundColor = 'rgba(0, 255, 0, 1)'
                    })
                    this.#resultElem.innerHTML = 'Wygrywa kółko!'
                    this.#isDone = 1
                }
                if (crossIds.includes(posibility[0]) && crossIds.includes(posibility[1]) && crossIds.includes(posibility[2])) {
                    posibility.forEach(cell => {
                        document.getElementById(cell).style.backgroundColor = 'rgba(0, 255, 0, 1)'
                    })
                    this.#isDone = 1
                    this.#resultElem.innerHTML = 'Wygrywa krzyżyk!'
                }
            })
        }
    }
    newGame() {
        const allCells = document.querySelectorAll('.cell')
        allCells.forEach(cell => {
            cell.style.backgroundColor = ''
            cell.innerHTML = ''
            this.#resultElem = ''
            this.#isDone = 0
            cell.classList.remove('circle')
            cell.classList.remove('cross')
            this.#move = 'x'
        })
    }
} 