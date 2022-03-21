
import PopUp from "./popup.js";


const carrotSize = 80;
const carrotCount = 10;
const bugCount = 20;
const gameDurationSec = 30;
const gameField = document.querySelector(".game_field")
const gameFieldRec = gameField.getBoundingClientRect()
const gameButton = document.querySelector(".game_button")
const gameTimer = document.querySelector(".game_timer")
const gameScore = document.querySelector(".game_score")



const carrotSound = new Audio("./sound/carrot_pull.mp3")
const alertSound = new Audio("./sound/alert.wav")
const bugSound = new Audio("./sound/bug_pull.mp3")
const bgSound = new Audio("./sound/bg.mp3")
const gameWinSound = new Audio("./sound/game_win.mp3")

let started = false
let timer = undefined
let score = 0;

const gameFinishBanner = new PopUp()


gameField.addEventListener("click", onFieldClick)
gameFinishBanner.setClickListener(()=> {
    startGame()
})

gameButton.addEventListener("click", () => {
    if(started) {
        stopGame()
    }else {
        startGame()
    }
    
})

function startGame() {
    started = true
    initGame()
    showStopButton()
    showTimerAndScore()
    startGameTimer()
    playSound(bgSound)
}

function stopGame() {
    started = false
    stopGameTimer()
    hideGameButton()
    gameFinishBanner.Popup("REPLAY")
    playSound(alertSound)
    stopSound(bgSound)
}

function finishGame(win) {
    started = false
    hideGameButton()
    if(win) {
        playSound(gameWinSound)
    }else {
        playSound(bugSound)
    }
    stopGameTimer()
    stopSound(bgSound)
    gameFinishBanner.Popup(win? "YOU WON!!":"YOU LOST!!")
}

function showStopButton() {
    const icon = gameButton.querySelector(".fas")
    icon.classList.add("fa-stop")
    icon.classList.remove("fa-play")
    gameButton.style.visibility = "visible"
}

function hideGameButton() {
    gameButton.style.visibility = "hidden"
}

function showTimerAndScore() {
    gameTimer.style.visibility = "visible"
    gameScore.style.visibility = "visible"
}

function startGameTimer() {
    let remainingTimeSec = gameDurationSec
    updatingTimerText(remainingTimeSec)
    timer = setInterval(() => {
        if(remainingTimeSec <= 0) {
            clearInterval(timer)
            finishGame(carrotCount ===score)
            return
        }
        updatingTimerText(--remainingTimeSec)
    }, 1000)
}

function stopGameTimer() {
    clearInterval(timer)
}

function updatingTimerText(time) {
    const minutes = Math.floor( time / 60)
    const seconds = time % 60
    gameTimer.innerText = `${minutes}:${seconds}`
}

function initGame() {
    score = 0;
    gameField.innerHTML = "";
    gameScore.innerText = carrotCount
    addItem("carrot", carrotCount, "img/carrot.png")
    addItem("bug", bugCount, "img/bug.png")
}

function onFieldClick(event) {
    if(!started) {
        return
    }
    const target = event.target
    if(target.matches(".carrot")) {
        target.remove()
        score++
        playSound(carrotSound)
        updateScoreBoard()
        if(score === carrotCount) {
            finishGame(true)
        }
    }else if(target.matches(".bug")) {
        stopGameTimer()
        finishGame(false)
    }
}

function updateScoreBoard() {
    gameScore.innerText = carrotCount - score;
}

function playSound(sound) {
    sound.currentTime = 0
    sound.play()
}

function stopSound(sound) {
    sound.pause()
}

function addItem(className, count, imgPath) {
    const x1 = 0
    const y1 = 0
    const x2 = gameFieldRec.width - carrotSize
    const y2= gameFieldRec.height - carrotSize
    for(let i=0; i<count; i++) {
        const item = document.createElement("img")
        item.setAttribute("class", className)
        item.setAttribute("src", imgPath)
        item.style.position = "absolute"
        const x = randomInteger(x1, x2)
        const y = randomInteger(y1, y2)
        item.style.left = `${x}px`
        item.style.top = `${y}px`
        gameField.appendChild(item)     
    }

}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

