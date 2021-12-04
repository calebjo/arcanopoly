
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

export class Player {
    constructor(startingGold, turnId, name, sprite){
        this.gold = startingGold;
        this.turnId = turnId;
        this.name = name;
        this.sprite = sprite;
        this.currentSquare = 0; // Start at the tavern;
        this.diceNum = 2;
        this.ownedProperties = [];
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
        newPlayer.setAttribute('id', 'p1');

        const playerP = document.createElement('p')
        playerP.innerText = name
        newPlayer.appendChild(playerP)

        const playerInfo = document.createElement('div')
        newPlayer.appendChild(playerInfo)

        const playerCards = document.createElement('div')
        playerInfo.appendChild(playerCards)
        const pDivider = document.createElement('div')
        playerInfo.appendChild(pDivider)
        const playerEquipment = document.createElement('div')
        playerInfo.appendChild(playerEquipment)
        
        // attach the player to the end of the players list
        const playerTurns = document.getElementsByClassName('player-turns')[0]; 
        playerTurns.appendChild(newPlayer);
    }

    changeGold(number){
        this.gold += number;
    }

    gainProperty(square){
        this.ownedProperties.push(square);
    }

    loseProperty(square){
        let propIdx = this.ownedProperties.indexOf(square);
        this.ownedProperties.splice(propIdx, 1);
    }

    gainCard(card) {
        this.hand.push(card);
    }

    loseCard(card) {
        let cardIdx = this.hand.indexOf(card);
        this.hand.splice(cardIdx, 1);
    }

    movePlayer(targetSquare){
        this.currentSquare = targetSquare;
    }
}