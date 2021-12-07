
export function generatePropertyHover(game) {

}

export function generatePlayerHover(game) {

}

export function generatePropertyBuy(game, property) {
    const propertyBuyWindow = document.createElement('div')
    propertyBuyWindow.classList.add('property-buy-popup')

    const propertyBuyText = document.createElement('p')
    propertyBuyText.innerText = `Would you like to buy ${property.name} for ${property.price} gold?`
    propertyBuyWindow.appendChild(propertyBuyText)

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

export function generateSquareTooltip(game, square){
    // generates a tooltip to tell the player what happens on the square they land on
    // called when landing on a castle, movement, deck, or tavern.
}

export function generateTavernTooltip(game){
    // generates a tooltip to tell the player that they have passed the tavern while moving
}