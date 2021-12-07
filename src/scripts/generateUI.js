
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

