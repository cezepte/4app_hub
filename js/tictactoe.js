export default class Tictactoe {
    #move = 'x'

    constructor() {

    }
    insert(element) {
        switch (this.#move) {
            case 'x':
                element.classList.add('circle')
                this.#move = 'o'
                break;
            case 'o':
                element.classList.add('cross')
                this.#move = 'x'
                break;
        }
        this.checkForWin()
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
        if (circles.length >= 3) {
            allPosibleWins.forEach(posibility => {
                if (circleIds.includes(posibility[0]) && circleIds.includes(posibility[1]) && circleIds.includes(posibility[2])) {
                    console.log('circle wins')
                } else if (crossIds.includes(posibility[0]) && crossIds.includes(posibility[1]) && crossIds.includes(posibility[2])) {
                    console.log('cross wins')
                }
            })
        }
    }

}