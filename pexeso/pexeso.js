console.log("start")
cards = [
    {
        src: "./cards/face/king-clubs.jpg"
    },
    {
        src: "./cards/reverse/background.jpg"
    }
]
getShuffledOrder(4)

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

    order.forEach((value) => {
        let imgEl = document.createElement("img")
        imgEl.src = cards[value].src
        imgEl.style.height = "399px"
        document.getElementById("cards").appendChild(imgEl)
    })
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