export default class Memory {
    #couplesCount
    #imgHolders
    #pathToImgs
    #currentScore
    #currentscoreHolder
    #highestScore = 0
    #highscoreHolder
    constructor(couplesCount, imgHolders, pathToImgs, highscoreHolder, currentscoreHolder) {
        this.#couplesCount = couplesCount
        this.#imgHolders = imgHolders
        this.#pathToImgs = pathToImgs
        this.#highscoreHolder = highscoreHolder
        this.#currentscoreHolder = currentscoreHolder
        console.log(this.#imgHolders)
    }
    shuffle() {
        const cubeHolders = document.querySelectorAll('.cube')
        cubeHolders.forEach(cube => {
            cube.classList.remove('matched')
            cube.classList.remove('active-cube')
        })
        let availableFields = []
        for (let i = 0; i < this.#couplesCount; i++) {
            for (let n = 0; n < 2; n++) {
                availableFields.push(i)
            }
        }
        for (let i = 0; i < (this.#couplesCount * 2); i++) {
            while (availableFields.length >= (this.#couplesCount - i)) {
                let x = Math.floor(Math.random() * 10)
                if (availableFields.includes(x)) {
                    this.#imgHolders[i].style.backgroundImage = `url(${this.#pathToImgs}${x}.jpg)`
                    availableFields.splice(availableFields.indexOf(x), 1)
                    break;
                }
            }
        }
        this.#currentScore = 100
        this.displayScore()
    }
    displayScore() {
        if (this.#currentScore > this.#highestScore) {
            this.#highestScore = this.#currentScore
        }
        if (this.#currentScore != null) {
            this.#currentscoreHolder.innerText = this.#currentScore
        }
        if (this.#highestScore != null) {
            this.#highscoreHolder.innerText = this.#highestScore
        }
    }
    showAndCompare() {
        let activeCubes = document.querySelectorAll('.active-cube')
        if (activeCubes.length == 2) {
            setTimeout(() => {
                let activeElements = document.querySelectorAll('.active-cube .cube-side.left')
                console.log('2 elements has been selected')
                if (activeElements[0].style.backgroundImage == activeElements[1].style.backgroundImage) {
                    console.log('its a MATCH!')
                    activeCubes.forEach(element => {
                        element.classList.toggle('active-cube')
                        element.classList.toggle('matched')
                    })
                    this.#currentScore = this.#currentScore + 100
                } else {
                    activeCubes.forEach(item => {
                        item.classList.toggle('active-cube')
                    })
                    this.#currentScore = this.#currentScore - 1
                }
                this.displayScore()
            }, 600)
        }
    }
    getScores() {
        return [this.#currentScore, this.#highestScore]
    }
}