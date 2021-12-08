
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
    alert("You've landed on a shop square! Unfortunately, it's under construction...")
}

export function generateTome(game){
    // PLACEHOLDER:
    alert("You've landed on a tome square! Unfortunately, it's under construction...")
}

export function generateGameEndScreen(winner){
    console.log('Generating end game cover screen.....')
    const outerWrapper = document.getElementsByClassName('outer-wrapper')[0]
    const gameEndCover = document.createElement('div')
    gameEndCover.classList.add('game-end-cover')

    const gameEndText = document.createElement('div')
    if (winner){
        gameEndText.innerText = `Game over! ${winner.name} is the winner!`
    } else {
        gameEndText.innerText = `Game over! Everyone lost...`
    }
    gameEndCover.appendChild(gameEndText)
    outerWrapper.appendChild(gameEndCover)
}