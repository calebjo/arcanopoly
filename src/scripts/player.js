
// A player corresponds to either a human or computer playing the game. 
// 
// Players belong to a game instance
//
// Instance variables:
// 
// gold : integer referring to the amount of gold a player has
// turnId : integer from 0-7 referring to the order in which a player takes their turn
// name : string referring to 
// sprite : a string url of the png sprite representing the player that moves around the board
// currentSquare : the square that the player is currently on
// diceNum : the number of dice a player rolls when they roll dice. Defaults to 2.
// ownedProperties: array of square elements referring to the properties a player owns
// hand : array of the hand of cards that a player owns. Cannot exceed 8 cards.
// equipment: array of the equipment that a player owns. Cannot exceed 6 equipment.
//
// A player should be able to: 
// gain/lose gold, gain/lose a property, gain/lose a card, gain/lose an equipment
// move to a given square
// 
// Functions:
// constructor(startingGold, turnId, name, sprite)
// changeGold(number)
// gainProperty(square)
// loseProperty(square)
// gainCard(card)
// loseCard(card)
// movePlayer(targetSquare)

import { PropertyCard } from "./card";
import { PropertySquare, TavernSquare } from "./square";

export class Player {
    constructor(startingGold, turnId, name, sprite){
        this.gold = startingGold;
        this.turnId = turnId;
        this.name = name;
        this.sprite = sprite;
        this.currentSquare = 0; // Start at the tavern;
        this.diceNum = 2;
        this.diceMax = 6;
        this.properties = [];
        this.hand = [];
        this.equipment = [];
        this.buildPlayerEle(startingGold, turnId, name, sprite);
    }

    buildPlayerEle(startingGold, turnId, name, sprite) {
        // builds a Player instance with the given arguments and attaches it to the DOM
        // add a player with PLACEHOLDER parameters
        
        // build new player
        const newPlayer = document.createElement('div');
        newPlayer.classList.add('player');
        newPlayer.setAttribute('id', `p${turnId}`);

        const playerP = document.createElement('p')
        playerP.innerText = name
        let playerColor = sprite.split('-')[1].split('.')[0]
        playerP.style.color = playerColor
        newPlayer.appendChild(playerP)

        const playerGold = document.createElement('div')
        playerGold.innerText = `${startingGold} gold`
        playerGold.classList.add('player-gold')
        newPlayer.appendChild(playerGold)

        const playerInfo = document.createElement('div')
        playerInfo.classList.add('player-info')
        newPlayer.appendChild(playerInfo)

        const playerCards = document.createElement('div')
        playerCards.classList.add('player-cards')
        playerInfo.appendChild(playerCards)
        const pDivider = document.createElement('div')
        pDivider.classList.add('p-divider')
        playerInfo.appendChild(pDivider)
        const playerEquipment = document.createElement('div')
        playerEquipment.classList.add('player-equipment')
        playerInfo.appendChild(playerEquipment)
        
        // attach the player to the end of the players list
        const playerTurns = document.getElementsByClassName('player-turns')[0]; 
        playerTurns.appendChild(newPlayer);
    }

    changeGold(number){
        this.gold += number;
        // change DOM
        const thisPlayerGold = document.getElementById(`p${this.turnId}`)
        thisPlayerGold.children[1].innerText = `${this.gold} gold`
    }

    // takes in a target square (Property object) and a boolean for gaining/losing it
    changeProperty(property, gain){
        const thisPlayerProperties = document.getElementsByClassName('my-prop-list')[0]
        if (gain){
            this.properties.push(property);
            property.owner = this
            // add to DOM
            const newProp = document.createElement('div')
            newProp.classList.add('my-property')
            const newPropName = document.createElement('div')
            newPropName.classList.add('my-prop-name')
            newPropName.innerText = `${property.name}`;
            newProp.appendChild(newPropName)

            // append children (image and price) to info
            const newPropInfo = document.createElement('div')
            newPropInfo.classList.add('my-prop-info')
            const newPropImage = document.createElement('div')
            newPropImage.classList.add('my-prop-image')
            const newPropImageEmbed = document.createElement('embed')
            const embedSrc = property.domRef.children[0].getAttribute('src')
            newPropImageEmbed.setAttribute('src', `${embedSrc}`)
            newPropImage.appendChild(newPropImageEmbed)
            
            newPropInfo.appendChild(newPropImage)
            const newPropPrice = document.createElement('div')
            newPropPrice.classList.add('my-prop-price')
            newPropPrice.innerText = `${property.price}`;
            newPropInfo.appendChild(newPropPrice)

            newProp.appendChild(newPropInfo)
            thisPlayerProperties.appendChild(newProp)
            // play Howler sound as the property changes
            const buyPropSound = new Howl({
                src: ['./assets/sounds/vg-bonus.wav']
            });
            // Play the sound at the start of the game.
            buyPropSound.volume(0.35);
            buyPropSound.play();

        } else {
            let propIdx = this.properties.indexOf(property);
            this.properties.splice(propIdx, 1);
            // remove from DOM
            thisPlayerProperties.removeChild(property.domRef)
        }
    }

    // takes in a target card object and a boolean for gaining/losing it
    changeCard(card, gain) {
        // find myHand DOM element
        if (gain){
            // change Node
            this.hand.push(card);
            card.owner = this
            // change DOM
            card.addToScreen()
            card.addIconToScreen()
        } else {
            // change DOM
            card.removeFromScreen()
            card.removeIconFromScreen()
            let cardIdx = this.hand.indexOf(card);
            // change Node
            this.hand.splice(cardIdx, 1);
            card.owner = null
        } 
    }

    // takes in an equipment object and a boolean for gaining/losing it
    changeEquipment(equipment, gain) {
        if (gain){
            this.equipment.push(equipment);
            equipment.owner = this;
            // change DOM
            // equipment.addToScreen()
        } else {
            let equipIdx = this.equipment.indexOf(equipment);
            this.equipment.splice(equipIdx, 1);
            // change DOM
            // equipment.removeFromScreen()
        }
    }

    movePlayer(game, target) {
        // takes in a game instance and a target square element to move to
        const playerObject = this
        const playerTokenEle = document.getElementById(`player-${this.turnId}`)
        const playerCurrentSquare = game.currentPlayer.currentSquare
        // parses the target square id (e.g. 'sq-32') into a position number
        const targetPos = parseInt(target.split('-')[1])
        const squaresToMove = game.diceRoll

        console.log(`${game.currentPlayer.name} has ${squaresToMove} squares to move.`) // DEBUG
        
        delayedTimeout(0)
        function delayedTimeout(i) {
            let traversedSquare = game.board.squares[(playerCurrentSquare + i) % 40]
            if (i < squaresToMove) {
                game.traverseSquare(playerObject, traversedSquare)
                console.log('After traverseSquare')
                setTimeout(delayedTimeout, 70, (i + 1))
            } else {
                // check which square the player landed in, handle appropriate logic (handled after landing)
                game.handleNewPlayerPos();
            }
            console.log('After setTimeout calls')
        }

        // delayedColorChange(0)
        // function delayedColorChange(i) {
        //     let currentColor =  // (e.g 'green' or 'cyan')
        //     console.log('In delayedColorChange')
        //     console.log(playerColor)
        //     if (i < squaresToMove) {
        //         game.changeTraversedColor(playerObject, traversedSquare)
        //         setTimeout(delayedTimeout, 70, (i + 1))
        //     } else {
        //         console.log('Done in delayedColorChange')
        //     }

        //     traversedSquare.domRef.style.backgroundColor = playerColor
        // }

        // store elements and objects of previous and target squares
        const targetSquareEle = document.getElementById(`sq-${targetPos}`)
        const previousSquareObject = game.board.squares[playerObject.currentSquare]
        const targetSquareObject = game.board.squares[targetPos]

        // remove playerTokenEle (the token) from old parent square, add to new parent square
        playerTokenEle.parentElement.removeChild(playerTokenEle)
        targetSquareEle.appendChild(playerTokenEle)
        // lastly, set player's current square to new coord and add player to square's occupants
        playerObject.currentSquare = targetPos
        // remove the current player from the playersOn of the previous square, add to target playersOn
        previousSquareObject.playersOn.splice(previousSquareObject.playersOn.indexOf(playerObject), 1)
        targetSquareObject.playersOn.push(playerObject)
    }

    makeTarget(){
        // highlights the player with an underglow to indicate that they have been targeted for a card
        const playerEle = document.getElementById(`p${this.turnId}`);
        playerEle.classList.add('selected', 'on')
    }

    makeNotTarget(){
        // removes the underglow from the makeTarget function, since the player has been deselected
        const playerEle = document.getElementById(`p${this.turnId}`);
        playerEle.classList.add('selected', 'off')
    }
}