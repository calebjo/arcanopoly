// animations for importing into game file

export function animateCardDraw(deck, cardNum){
    // visual and audio cues for when cards are drawn
    
}

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

export function animateDeckCreate(game) {
    
}