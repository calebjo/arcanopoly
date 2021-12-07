// animations for importing into game file

import { MoonDeck, SunDeck } from "./deck"

export function animateGoldChange(player, number){
    const thisPlayerEle = document.getElementById(`p${player.turnId}`)

    const newGoldNotif = document.createElement('div')
    newGoldNotif.classList.add('gold-notif')
    newGoldNotif.style.position = 'fixed'
    newGoldNotif.style.left = '9rem'
    
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
    }
}