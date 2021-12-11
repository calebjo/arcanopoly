export function generateCardConfirm(game){
    const confirmButton = document.createElement('div');
    confirmButton.classList.add('confirm-targets')
    const playerTurns = document.getElementsByClassName('player-turns')[0];
    const confirmP = document.createElement('p')
    confirmP.innerText = 'Confirm'
    confirmButton.appendChild(confirmP)
    playerTurns.appendChild(confirmButton)
    return confirmButton;
}

export function generatePropertyHover(game) {

}

export function generatePlayerHover(game) {

}

export function generateSquareTooltip(game, square){
    // generates a tooltip to tell the player what happens on the square they land on
    // called when landing on a castle, movement, deck, or tavern.
}

export function generateTavernTooltip(game){
    // generates a tooltip to tell the player that they have passed the tavern while moving
}

export function generatePropertyBuy(game, property) {
    const propertyBuyWindow = document.createElement('div')
    propertyBuyWindow.classList.add('property-buy-popup')

    const propertyBuyTextContainer = document.createElement('div')
    const propertyBuyText = document.createElement('p')
    propertyBuyText.innerText = `Would you like to buy ${property.name} for ${property.price} gold?`
    propertyBuyTextContainer.appendChild(propertyBuyText)
    propertyBuyWindow.appendChild(propertyBuyTextContainer)

    const buttonContainer = document.createElement('div')
    buttonContainer.classList.add('button-container')

    const yesButton = document.createElement('button')
    yesButton.setAttribute('type', 'button')
    yesButton.innerText = 'Yes'
    buttonContainer.appendChild(yesButton)

    const noButton = document.createElement('button')
    noButton.setAttribute('type', 'button')
    noButton.innerText = 'No'
    buttonContainer.appendChild(noButton)

    propertyBuyWindow.appendChild(buttonContainer)

    document.getElementsByClassName('board')[0].appendChild(propertyBuyWindow)
}

export function generateShop(game){
    // landing on a shop lets you buy 4 different cards and 1 equipment
    // each card displays the image (with hover zoom) and price
    // equipment displays the icon and price


    const shop = document.createElement('div')
    shop.classList.add('shop')
    
    function makeShopColumn(){
        // appends a "card column" child to the shop element
        for (let i= 0; i < 2; i++){
            let shopColumn = document.createElement('div')
            shopColumn.classList.add('shop-card-column')
            for (let i = 0; i < 2; i++){
                // makes two "card boxes" to click on
                let cardBox = document.createElement('div')
                cardBox.classList.add('shop-card-box')
                let cardImage = document.createElement('embed')
                cardImage.classList.add('shop-card-image')
                let cardText = document.createElement('p')
                cardText.classList.add('shop-card-text')
                cardBox.appendChild(cardImage)
                cardBox.appendChild(cardText)
                shopColumn.appendChild(cardBox)
            }
            shop.appendChild(shopColumn)
        }
    }

    makeShopColumn()
    makeShopColumn()
    const shopCol3 = document.createElement('div')

    // PLACEHOLDER: 
    // alert("You've landed on a shop square! Unfortunately, it's under construction...")
}

export function generateTome(game){
    // PLACEHOLDER:
    // alert("You've landed on a tome square! Unfortunately, it's under construction...")
}

export function generateHistory(game, event, player, object){
    // when any significant event happens, record a log of it in the history box
    // (e.g property buy, go to dungeon, tavern, card draw/play, castle, equipment gain)
    const gameHistory = document.getElementsByClassName('game-history')[0]
    const newHistoryItem = document.createElement('div')
    newHistoryItem.classList.add('history-item')
    const newHistoryContainer = document.createElement('div')
    newHistoryContainer.classList.add('history-container')

    const newHistoryName = document.createElement('div')
    newHistoryName.classList.add('history-name')
    const newHistoryText = document.createElement('div')
    newHistoryText.classList.add('history-text')
    const newHistoryImage = document.createElement('embed')
    // determines values of HTML based on event
    let thisText = 'oops!' // error default
    let thisSrc = 'oops!'  // error default
    switch (event){
        case 'propBuy':
            thisText = 'bought'
            thisSrc = `${'./assets/images/' + object.group + '.svg'}`
            break;
        case 'cardPlay':
            thisText = 'played'
            thisSrc = `${object.img}`
            break;
        case 'bankrupt':
            thisText = 'bankrupted...'
            thisSrc = `./assets/images/skull-icon.png`
            break;
        case 'dungeon':
            thisText = 'went to'
            thisSrc = `./assets/images/gate-icon.png`
            break;
        case 'tavernVisit':
            thisText = 'visited'
            thisSrc = `./assets/images/mug-icon.png`
            break;
        case 'tavernPass':
            thisText = 'passed'
            thisSrc = `./assets/images/mug-icon.png`
            break;
    }
    newHistoryName.style.color = `${player.sprite.split('-')[1].split('.')[0]}`;
    newHistoryName.innerText = player.name;
    newHistoryText.innerText = thisText;
    newHistoryImage.setAttribute('src', thisSrc)
    if (['dungeon','bankrupt','tavernVisit','tavernPass'].includes(event)){ 
        // make dark icons more readable here
        newHistoryImage.style.filter = 'invert(1)'
    } 

    newHistoryContainer.appendChild(newHistoryName)
    newHistoryContainer.appendChild(newHistoryText)
    newHistoryContainer.appendChild(newHistoryImage)

    newHistoryItem.appendChild(newHistoryContainer)
    gameHistory.appendChild(newHistoryItem)
}

export function generateGameEndScreen(winner){
    const outerWrapper = document.getElementsByClassName('outer-wrapper')[0]
    const gameEndCover = document.createElement('div')
    gameEndCover.classList.add('game-end-cover')

    const gameEndText = document.createElement('div')
    gameEndText.classList.add('game-end-text')
    if (winner){
        gameEndText.innerText = `Game over! ${winner.name} is the winner!`
    } else {
        gameEndText.innerText = `Game over! Everyone lost...`
    }
    gameEndCover.appendChild(gameEndText)
    outerWrapper.appendChild(gameEndCover)

    // Make a "Play again?" button
    const playAgain = document.createElement('div')
    playAgain.classList.add('play-again')
    const playAgainText = document.createElement('div')
    playAgainText.classList.add('play-again-text')
    playAgainText.innerText = 'Play Again?'
    const playAgainBtn = document.createElement('div')
    playAgainBtn.classList.add('play-again-btn')
    const btnImg = document.createElement('img')
    btnImg.setAttribute('src', './assets/images/play-again.svg')
    playAgainBtn.appendChild(btnImg)
    playAgain.appendChild(playAgainText)
    playAgain.appendChild(playAgainBtn)
    gameEndCover.appendChild(playAgain)

    // Restart the same game
}