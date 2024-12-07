console.log("start")
const cardsFace = []
let valueOfCards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
let colorOfCards = ["H", "D", "S", "C"]
valueOfCards.forEach((value) => {
    colorOfCards.forEach((color) => {
        cardsFace.push({src: "./cards/face/" + value + color + ".jpg"})
    })
})

let arrayOfCardsReverse = ["./cards/reverse/background.jpg", "./cards/reverse/blue_back.jpg",
    "./cards/reverse/Gray_back.jpg", "./cards/reverse/Green_back.jpg", "./cards/reverse/purple_back.jpg",
    "./cards/reverse/Red_back.jpg", "./cards/reverse/Yellow_back.jpg"]
const cardsReverse = arrayOfCardsReverse[Number(Math.floor(Math.random() * arrayOfCardsReverse.length))]

const cardsPosition = []

let lastTwoFlipped = []

function startGame(){
    document.getElementById("just-for-start").innerHTML = ""
    getCardsPosition(5, 6)
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
            imgEl.style.height = "132px"
            imgEl.style.width = "86px"
            let cell = document.createElement("td")
            cell.appendChild(imgEl)
            document.getElementById(`card-row-${indexOfRow}`).appendChild(cell)
        })
    })
}


function getShuffledOrder(amount) {
    let order = []
    let cardsToUse = []
    while (cardsToUse.length < amount / 2){
        let card = Math.floor(Math.random() * cardsFace.length)
        if (!cardsToUse.includes(card)){
            cardsToUse.push(card)
        }
    }
    cardsToUse.forEach((value) => {
        order.push(value)
        order.push(value)
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
        if (lastTwoFlipped.length === 2){
            CheckIfCanOperate = true
            setTimeout(function() {
                checkCards()
                lastTwoFlipped = []
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
    if (cardsPosition[positions[0][0]][positions[0][1]].card === cardsPosition[positions[1][0]][positions[1][1]].card){
        lastTwoFlipped.forEach((value) => {
            let img = document.getElementById(value)
            img.src = "./cards/white_card.jpg"
        })
        lastTwoFlipped = []
    }else{
        lastTwoFlipped.forEach((value) => {rotateCard(value, false); console.log("rotate")})
    }
}



/*function swap(array, first, second){
    return [array[first], array[second]] = [array[second], array[first]]
}*/
document.getElementById("just-for-start").innerHTML = ""
const startButton = document.createElement("button")
startButton.innerText = "start Memory game"
startButton.onclick = function() {startGame()}
document.getElementById("just-for-start").appendChild(startButton)
console.log("end")