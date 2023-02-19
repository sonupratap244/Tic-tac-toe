console.log("hello js")
let music = new Audio("music.mp3")
let audioTurn = new Audio("ting.mp3")
let gameover = new Audio("gameover.mp3")

let playertext = document.getElementById('playertext')
let resetBtn = document.getElementById('resetBtn')
let boxes = Array.from(document.getElementsByClassName('box'))


let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')


const O_TEXT = "0"
const X_TEXT = "X"
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)

const startGame = () => {

    boxes.forEach(box => box.addEventListener('click', boxClicked, music.play()))

}

function boxClicked(e) {

    const id = e.target.id
    if (!spaces[id]) {
        audioTurn.play();
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer
        audioTurn.play();

        if (playerHaswon() !== false) {
            playertext = `${currentPlayer} has won!`

            let winning_blocks = playerHaswon(gameover.play());

            winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator)
            alert("Won the:" + " " + currentPlayer);
            return
        }

        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT



    }
}
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function playerHaswon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition

        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a, b, c]
        }
    }
    return false
}

resetBtn.addEventListener('click', reset)

function reset() {
    spaces.fill(null)

    boxes.forEach(box => {
        box.innerText = ''
        box.style.backgroundColor = ''
    })

    playertext = 'Tic Tac Toe'
    currentPlayer = X_TEXT
}
startGame()