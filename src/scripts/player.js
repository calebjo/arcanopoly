
// A player corresponds to either a human or computer playing the game. 
// 
// Players belong to a game instance

import { animateGoldChange } from "./generateAnimations";

export class Player {
    constructor(startingGold, turnId, name, sprite) {
        this.gold = startingGold;
        this.turnId = turnId;
        this.name = name;
        this.sprite = sprite;
        this.currentSquare = 0; // Start at the tavern;
        this.diceNum = 2;
        this.diceMax = 6;
        this.tavernMod = 1;
        this.rerolls = 0; // Player's rerolls (increased by equipment)
        this.properties = [];
        this.hand = [];
        this.equipment = [];
        this.bankrupt = false;
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

    // takes in a number (positive for gain, negative for loss) to charge a player
    // adds a fading notification near gold counts to show amount gained/lost
    changeGold(number){
        if (this.gold + number <= 0){
            this.gold = 0
            animateGoldChange(this, number)
            this.bankruptMe()
        } else { // add/substract gold as normal
            this.gold += number;
            animateGoldChange(this, number)
        }
        
        // change DOM
        const thisPlayerEle = document.getElementById(`p${this.turnId}`)
        thisPlayerEle.children[1].innerText = `${this.gold} gold`
    }

    // takes in a target square (Property object) and a boolean for gaining/losing it
    changeProperty(property, gain){
        let thisPlayerProperties = document.getElementsByClassName('my-prop-list')[0]
        if (gain){
            this.properties.push(property);
            property.owner = this;
            // add to DOM
            property.addToScreen();
            // play Howler sound as the property changes
            const buyPropSound = new Howl({
                src: ['./assets/sounds/vg-bonus.wav']
            });
            buyPropSound.volume(0.25);
            buyPropSound.play();
        } else {
            let propIdx = this.properties.indexOf(property);
            this.properties.splice(propIdx, 1);
            // remove from DOM
            // property.removeFromScreen();
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
        // const targetPos = parseInt(target.split('-')[1])
        const squaresToMove = game.diceRoll
        let originalColor = null;

        console.log(`${game.currentPlayer.name} has ${squaresToMove} squares to move.`) // DEBUG
        
        delayedTimeout(0)
        function delayedTimeout(i) {
            let traversedSquare = game.board.squares[(playerCurrentSquare + i) % 40]
            if (i < squaresToMove) {
                game.traverseSquare(playerObject, traversedSquare)

                // store original color for later
                originalColor = traversedSquare.domRef.style.backgroundColor; 
                // change square color
                let playerColor = game.currentPlayer.sprite.split('-')[1].split('.')[0] // (e.g 'green' or 'cyan')
                traversedSquare.domRef.style.backgroundColor = playerColor

                // store elements and objects of previous and target squares
                const thisTargetPos = (playerObject.currentSquare + 1) % 40
                const targetSquareEle = document.getElementById(`sq-${thisTargetPos}`)
                // remove playerTokenEle (the token) from old parent square, add to new parent square
                playerTokenEle.parentElement.removeChild(playerTokenEle)
                targetSquareEle.appendChild(playerTokenEle)
                // lastly, set player's current square to new coord and add player to square's occupants
                playerObject.currentSquare = thisTargetPos

                const previousSquareObject = game.board.squares[playerObject.currentSquare]
                const targetSquareObject = game.board.squares[thisTargetPos]
                // remove the current player from the playersOn of the previous square, add to target playersOn
                previousSquareObject.playersOn.splice(previousSquareObject.playersOn.indexOf(playerObject), 1)
                targetSquareObject.playersOn.push(playerObject)

                setTimeout(delayedTimeout, 80, (i + 1)) // recursively call again until target is reached

            } else { // player has landed
                // check which square the player landed in, handle appropriate logic
                game.handleNewPlayerPos();
            }

            changeColorBack(0)
            function changeColorBack(i) {
                if (i === 1){ traversedSquare.domRef.style.backgroundColor = originalColor }
                if (i < 1) {setTimeout(changeColorBack, 320, (i + 1))}
            }

            delayComputerPress(0)
            function delayComputerPress(i) {
                if (i === 1){ game.handleComputerPress(); }
                if (i < 1) {setTimeout(delayComputerPress, 1000, (i + 1))}
            }
        }
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

    bankruptMe(){
        // change player element styles to grayed out. Skip player on every turn after.
        const playerEle = document.getElementById(`p${this.turnId}`);
        playerEle.style.background = '#501313'

        // remove each of the player's properties from their ownership
        for (let i = 0; i < this.properties.length; i++) {
            this.changeProperty(this.properties[i], false)
        }

        this.bankrupt = true
        console.log('I went bankrupt....')
    }
}