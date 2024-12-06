console.log("start")
cards = [
    {
        src: "./cards/face/king-clubs.jpg"
    },
    {
        src: "./cards/reverse/background.jpg"
    }
]

const cardsPosition = []
getCardsPosition(2, 2)

function getCardsPosition(column, row){
    let order = getShuffledOrder(column * row)
    for (let y = 0; y < column; y++){
        let rowOfCards = []
        for (let x = 0; x < row; x++){
            rowOfCards.push(order.shift())
        }
        cardsPosition[y] = rowOfCards
    }

    cardsPosition.forEach((rowOfCards, index) => {
        let row = document.createElement("tr")
        row.id = `card-row-${index}`
        document.getElementById("table-for-cards").appendChild(row)
        rowOfCards.forEach((value) => {
            let imgEl = document.createElement("img")
            imgEl.src = cards[value].src
            imgEl.style.height = "399px"
            let cell = document.createElement("td")
            cell.appendChild(imgEl)
            document.getElementById(`card-row-${index}`).appendChild(cell)
        })
    })
}


function getShuffledOrder(amount) {
    let order = []
    let cardsToUse = []
    while (cardsToUse.length < amount / 2){
        let card = Math.floor(Math.random() * cards.length)
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



/*function swap(array, first, second){
    return [array[first], array[second]] = [array[second], array[first]]
}*/

console.log("end")