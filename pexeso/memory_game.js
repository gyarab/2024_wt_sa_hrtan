console.log("start")
const cardsFace = []
const valueOfCards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
const colorOfCards = ["H", "D", "S", "C"]
const cardsFromPlayers = []

let arrayOfCardsReverse = ["./cards/reverse/background.jpg", "./cards/reverse/blue_back.jpg",
    "./cards/reverse/Gray_back.jpg", "./cards/reverse/Green_back.jpg", "./cards/reverse/purple_back.jpg",
    "./cards/reverse/Red_back.jpg", "./cards/reverse/Yellow_back.jpg"]
const cardsReverse = arrayOfCardsReverse[Number(Math.floor(Math.random() * arrayOfCardsReverse.length))]


const cardsPosition = []
const lastTwoFlipped = []


const gameAttributes = {
    rows: 5,
    columns: 6,
    cardsHeight: 132,
    cardsWidth: 86,
    playerOne: 0,
    playerTwo: 0,
    cardsToPair: 2
}
let cardsToPairNext = 2
let currentlyPlaying = "playerOne"

function startGame(){
    document.getElementById("table-for-cards").innerHTML = ""
    resetVariables()
    if ((gameAttributes.rows * gameAttributes.columns) % gameAttributes.cardsToPair === 0 && cardsFace.length >= gameAttributes.rows * gameAttributes.columns / gameAttributes.cardsToPair) {
        if (gameAttributes.playerOne > gameAttributes.playerTwo) {
            currentlyPlaying = "playerOne"
        } else if (gameAttributes.playerOne < gameAttributes.playerTwo) {
            currentlyPlaying = "playerTwo"
        }
        gameAttributes.cardsToPair = cardsToPairNext
        document.getElementById("playing").innerText = `${currentlyPlaying}`
        getCardsPosition(gameAttributes.rows, gameAttributes.columns)
    }else{
        document.getElementById("error").innerText = "Check your input values if they are correct."
    }
}


function resetVariables() {
    cardsPosition.forEach(() => {
        cardsPosition.pop()
    })
    lastTwoFlipped.forEach(() => {
        lastTwoFlipped.pop()
    })

    cardsFace.length = 0
    valueOfCards.forEach((value) => {
        colorOfCards.forEach((color) => {
            cardsFace.push({src: "./cards/face/" + value + color + ".jpg"})
        })
    })
    cardsFromPlayers.forEach((value) => {
        cardsFace.push({src: value})
    })
}

function getCardsPosition(row, column){
    let order = getShuffledOrder(row * column)
    for (let y = 0; y < row; y++){
        let rowOfCards = []
        for (let x = 0; x < column; x++){
            rowOfCards.push({card: order.shift(), flippedOnFace: false})
        }
        cardsPosition[y] = rowOfCards
    }

    cardsPosition.forEach((rowOfCards, indexOfRow) => {
        let row = document.createElement("tr")
        row.id = `card-row-${indexOfRow}`
        document.getElementById("table-for-cards").appendChild(row)
        rowOfCards.forEach((value, indexOfColumn) => {
            let imgEl = document.createElement("img")
            if (value.flippedOnFace){
                imgEl.src = cardsFace[value.card].src
            }else{
                imgEl.src = cardsReverse
            }
            imgEl.id = indexOfRow + " " + indexOfColumn
            imgEl.onclick = function() {click(this.id, true)}
            imgEl.style.height = `${gameAttributes.cardsHeight}px`
            imgEl.style.width = `${gameAttributes.cardsWidth}px`
            let cell = document.createElement("td")
            cell.appendChild(imgEl)
            document.getElementById(`card-row-${indexOfRow}`).appendChild(cell)
        })
    })
}


function getShuffledOrder(amount) {
    let order = []
    let cardsToUse = []
    while (cardsToUse.length < amount / gameAttributes.cardsToPair){
        let card = Math.floor(Math.random() * cardsFace.length)
        if (!cardsToUse.includes(card)){
            cardsToUse.push(card)
        }
    }
    cardsToUse.forEach((value) => {
        for (let x = 0; x < gameAttributes.cardsToPair; x++){
            order.push(value)
        }
    })
    shuffle(order)
    return order
}



function shuffle(array){
    for (let x = 0; x < array.length; x++) {
        let second = Math.floor(Math.random() * array.length)
        let first = array[x];
        array[x] = array[second]
        array[second] = first
    }
}

let CheckIfCanOperate = false

function click(clicked_id, flipOnFace) {
    if (CheckIfCanOperate)
        return;
    rotateCard(clicked_id, flipOnFace)
}
function rotateCard(clicked_id, flipOnFace) {

    let position = []
    clicked_id.split(" ").forEach((value) => {
        position.push(Number(value))
    })
    if (flipOnFace){
        cardsPosition[position[0]][position[1]].flippedOnFace = true
        document.getElementById(clicked_id).src = cardsFace[cardsPosition[position[0]][position[1]].card].src
        if (!lastTwoFlipped.includes(clicked_id)){
            lastTwoFlipped.push(clicked_id)
        }
        if (lastTwoFlipped.length === gameAttributes.cardsToPair){
            CheckIfCanOperate = true
            setTimeout(function() {
                checkCards()
                lastTwoFlipped.length = 0
                CheckIfCanOperate = false
            }, 1000)

        }
    }else{
        cardsPosition[position[0]][position[1]].flippedOnFace = false
        document.getElementById(clicked_id).src = cardsReverse
    }
}

function checkCards(){
    let positions = []
    lastTwoFlipped.forEach((Id) => {
        let position = []
        Id.split(" ").forEach((value) => {
            position.push(Number(value))
        })
        positions.push(position)
    })

    positions.every((value, index) => {
        if (cardsPosition[positions[index][0]][positions[index][1]].card === cardsPosition[positions[index + 1][0]][positions[index + 1][1]].card){
            if (index + 2 < lastTwoFlipped.length){return true}
            lastTwoFlipped.forEach((value) => {
                document.getElementById(value).src = "./cards/white_card.jpg"
            })
            if (currentlyPlaying === "playerOne"){
                gameAttributes.playerOne += gameAttributes.cardsToPair
                document.getElementById(currentlyPlaying).innerText = `${currentlyPlaying}: ${gameAttributes.playerOne}`
            }else{
                gameAttributes.playerTwo += gameAttributes.cardsToPair
                document.getElementById(currentlyPlaying).innerText = `${currentlyPlaying}: ${gameAttributes.playerTwo}`
            }
            return false
        }else{
            if (currentlyPlaying === "playerOne"){
                currentlyPlaying = "playerTwo"
            }else{
                currentlyPlaying = "playerOne"
            }
            document.getElementById("playing").innerText = `${currentlyPlaying}`
            lastTwoFlipped.forEach((value) => {rotateCard(value, false)})
            return false
        }
    })
}


function changeAttribute(id, value){
    switch (id){
        case "row":
            gameAttributes.rows = Number(value)
            document.getElementById("row-header").innerText = `Current number of rows: ${value}`
            break
        case "column":
            gameAttributes.columns = Number(value)
            document.getElementById("column-header").innerText = `Current number of rows: ${value}`
            break
        case "height":
            gameAttributes.cardsHeight = Number(value)
            document.getElementById("height-header").innerText = `Current number of rows: ${value}`
            break
        case "width":
            gameAttributes.cardsWidth = Number(value)
            document.getElementById("width-header").innerText = `Current number of rows: ${value}`
            break
        case "pairs":
            cardsToPairNext = Number(value)
            document.getElementById("pairs-header").innerText = `Current cards to pair: ${value}`
            break
        case "img":
            cardsFromPlayers.push(value)
            document.getElementById(id).value = ""
            break
        default:
            break
    }
}



document.getElementById("just-for-start").innerHTML = ""
document.getElementById("starting-button").style.display = "block"

document.getElementById("playerOne").innerText = `playerOne: ${gameAttributes.playerOne}`
document.getElementById("playerTwo").innerText = `playerTwo: ${gameAttributes.playerTwo}`

document.getElementById("row").value = `${gameAttributes.rows}`
document.getElementById("column").value = `${gameAttributes.columns}`
document.getElementById("height").value = `${gameAttributes.cardsHeight}`
document.getElementById("width").value = `${gameAttributes.cardsWidth}`
document.getElementById("pairs").value = `${gameAttributes.cardsToPair}`

document.getElementById("row-header").innerText = `Current number of rows: ${gameAttributes.rows}`
document.getElementById("column-header").innerText = `Current number of rows: ${gameAttributes.columns}`
document.getElementById("height-header").innerText = `Current number of rows: ${gameAttributes.cardsHeight}`
document.getElementById("width-header").innerText = `Current number of rows: ${gameAttributes.cardsWidth}`
document.getElementById("pairs-header").innerText = `Current cards to pair: ${gameAttributes.cardsToPair}`
console.log("end")