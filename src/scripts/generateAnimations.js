// animations for importing into game file

import { MoonDeck, SunDeck } from "./deck"

export function animateGoldChange(player, number){
    const thisPlayerEle = document.getElementById(`p${player.turnId}`)

    const newGoldNotif = document.createElement('div')
    newGoldNotif.classList.add('gold-notif')
    newGoldNotif.style.position = 'fixed'
    newGoldNotif.style.left = '13rem'
    
    if (number > 0) {
        newGoldNotif.innerText = `+${number}`
    } else {
        newGoldNotif.innerText = `${number}`
    }

    thisPlayerEle.appendChild(newGoldNotif)
    delayRemove(0)
    function delayRemove(i) {
        if (i === 1){ thisPlayerEle.removeChild(newGoldNotif) }
        if (i < 1) {setTimeout(delayRemove, 2000, (i + 1))}
    }
}

export function animateCardDraw(deck, amount){
    var thisDeck;
    var newCard;
    drawAnimate(0)
    function drawAnimate(i){
        if (i < amount) {
            if (deck instanceof SunDeck){
                // animate 1 card drawing from the sun deck to the hand
                thisDeck = document.getElementsByClassName('sun-deck')[0]
                newCard = document.createElement('embed')
                newCard.setAttribute('src', './assets/images/deck-sun.png')
                thisDeck.appendChild(newCard)
                newCard.classList.add('new-sun-card')
            } else if (deck instanceof MoonDeck){
                // animate 1 card drawing from the moon deck to the hand
                thisDeck = document.getElementsByClassName('moon-deck')[0]
                newCard = document.createElement('embed')
                newCard.setAttribute('src', './assets/images/deck-moon.png')
                thisDeck.appendChild(newCard)
                newCard.classList.add('new-moon-card')
            }
            setTimeout(drawAnimate, 500, (i + 1))
        }
        if (i === amount) {
            while (thisDeck.children.length > 1){
                thisDeck.lastChild.remove()
            }
        }
    }
}

// export function animateGameEndCoins(){
//     // makes a cascase of coins fall from the sky during game end
//     const coinContainer = document.createElement('div')
//     coinContainer.classList.add('coin-container')

//     coinGenerator(0)
//     function coinGenerator(i) {
//         // generate a coin with a random animation (Sass random properties)
//         let thisCoin = document.createElement('embed')
//         thisCoin.classList.append('coin-end-game')
//         thisCoin.setAttribute('src', './assets/images/falling-coin.png')
//         coinContainer.appendChild(thisCoin)
//         setTimeout(coinGenerator, 300, (i+1))
//     }
// }