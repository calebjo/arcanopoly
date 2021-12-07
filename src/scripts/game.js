
// A game instance should contain all of the logic for running a game of Arcanopoly.
// The Game will be created in index.js and start immediately.

import { Board } from "./board";
import { CastleSquare, DeckSquare, DungeonSquare, MovementSquare, PropertySquare, ShopSquare, Square, TavernSquare, TomeSquare } from "./square";
import { Equipment } from "./equipment";
import { landOnSquare } from "./landOnSquare";
import { Howl, Howler } from 'howler';
import { MoonDeck, SunDeck } from "./deck";

export class Game {
    constructor(players, startingGold){
        this.players = players;
        this.startingGold = startingGold;
        this.turnNum = 0;
        this.currentPlayer = players[0];
        this.mainButton = document.getElementById('main-button');
        this.diceRoll = 0;
        this.board = new Board();
        this.decks = [];
    }

    onGameStart(){
        // -------------------------------------------------------------------------
        // Setup Howl to play game start sound
        const gameStartSound = new Howl({
            src: ['./assets/sounds/bubble-pop.wav']
        });
        // Play the sound at the start of the game.
        gameStartSound.volume(0.15);
        gameStartSound.play();
        // -------------------------------------------------------------------------
        // Create Sun Deck and Moon Deck, placing them in their respective squares

        // Create DOM elements and place them in the deck squares
        const sunDeckEle = document.createElement('div')
        sunDeckEle.classList.add('sun-deck')
        const sunDeckEmbed = document.createElement('embed')
        sunDeckEmbed.setAttribute('src', './assets/images/deck-sun.png')
        sunDeckEle.appendChild(sunDeckEmbed)
        const deckBox1 = document.getElementsByClassName('deck1-empty')[0]
        deckBox1.appendChild(sunDeckEle)

        const moonDeckEle = document.createElement('div')
        moonDeckEle.classList.add('moon-deck')
        const moonDeckEmbed = document.createElement('embed')
        moonDeckEmbed.setAttribute('src', './assets/images/deck-moon.png')
        moonDeckEle.appendChild(moonDeckEmbed)
        const deckBox2 = document.getElementsByClassName('deck2-empty')[0]
        deckBox2.appendChild(moonDeckEle)

        // Create Deck objects in Node
        const sunDeck = new SunDeck(0, sunDeckEle);
        const moonDeck = new MoonDeck(1, moonDeckEle);
        this.decks.push(sunDeck)
        this.decks.push(moonDeck)
        // -------------------------------------------------------------------------
        // Play pop sound on clicking either the add player button or main button
        this.mainButton.addEventListener('click', playButtonClickSound)
        function playButtonClickSound(){
            const pressSound = new Howl({
                src: ['./assets/sounds/pop-alert.mp3']
            });
            // Play the sound on button click
            pressSound.volume(0.1);
            pressSound.play();
        }
        // -------------------------------------------------------------------------
        // when Start is pressed, place the player tokens in the tavern
        const tavern = document.getElementById('sq-0')
        // Add a token for each player and place it in the tavern
        for (let i = 0; i < this.players.length; i++){
            let player = document.createElement('div')
            player.classList.add('player-token')
            player.setAttribute('id', `player-${i}`)
            let playerIcon = document.createElement('img')
            // Create a new token element based on the given player's sprite
            playerIcon.setAttribute('src', `${this.players[i].sprite}`)

            tavern.appendChild(player)
            player.appendChild(playerIcon)
        }

        // then play a turn of the game
        console.log('The game has started!')
        this.playTurn()
    }

    playTurn(){
        let that = this

        console.log(`${this.currentPlayer.name} is playing a turn!`) // DEBUG
        this.turnNum += 1

        // Change the elements of the middle hand area to only contain the current player's cards
        this.showCurrentPlayerHand();
        // highlight the current player with a DOM element
        this.highlightNewPlayer();

        // Whenever a card is grabbed and placed in the correct position, "play" the card.
        // MVP: just click a card to activate it
        // If the current player has a hand, get all the cards within and add event listener
        
        if (this.currentPlayer.hand.length > 0) {
            const cardClickable = document.querySelectorAll(".my-card")
            for (let i = 0; i < cardClickable.length; i++){
                cardClickable[i].addEventListener("click", () =>{
                    that.playThisCard(cardClickable[i])
                })
            }
        }
        
        // when 'Roll' is clicked, roll the dice
        this.allowDiceRoll();
    }

    postRollTurn(){
        // move the current player based on the dice roll
        let targetNum = (this.currentPlayer.currentSquare + this.diceRoll) % 40;
        console.log(`${this.currentPlayer.name} will move to the ${targetNum}th square.`)

        // get the current player and move their token to the target square
        this.currentPlayer.movePlayer(this, `sq-${targetNum}`)

        // Switch to the next player and end the turn logic
        this.endGameTurn()
    }

    // -------------------------------------------------------------------------------
    // Game logic outside of loop

    endGameTurn() {
        this.mainButton.addEventListener("click", endTurn);
        let that = this;
        function endTurn(){
            // remove end turn interaction, hide player-specific DOM elements
            that.mainButton.removeEventListener("click", endTurn);
            that.hideCurrentPlayerHand();
            that.hideDiceRolls();
            that.deHighlightPlayer();

            // cycle to the next player, skipping if bankrupt
            let playerCount = that.players.length;
            let currentPlayerIdx = that.players.indexOf(that.currentPlayer);
            let nextPlayerIdx = (currentPlayerIdx + 1) % playerCount;
            let nextPlayer = that.players[nextPlayerIdx]

            if (!(nextPlayer.bankrupt)) {
                console.log('Next player is not bankrupt.')
                that.currentPlayer = nextPlayer
            }
            // skip if bankrupt
            while (nextPlayer.bankrupt) {
                console.log(`Skipping the bankrupt player ${nextPlayer.name}`)
                nextPlayerIdx = (nextPlayerIdx + 1) % playerCount;
                that.currentPlayer = that.players[nextPlayerIdx];
                nextPlayer = that.currentPlayer
            }

            console.log(`The next player will be ${that.currentPlayer.name}.`) // DEBUG
            console.log('End of the turn.')// DEBUG
    
            // if the game is not already won, play another turn
            if (!that.isWon()){ 
                that.playTurn() 
            } else {
                let winner = null;
                for (let i = 0; i < that.players.length; i++){
                    if (that.players[i].gold > 0){
                        winner = that.players[i];
                    }
                }
                that.gameOver(winner);
            }
        }
    }

    handleNewPlayerPos() {
        const newPos = this.currentPlayer.currentSquare
        const newSquare = this.board.squares[newPos]
        console.log(newSquare)
 
        // check what kind of square the player landed on
        switch (newSquare.constructor){
            case (TavernSquare):
                landOnSquare(this, 'tavern', newSquare)
                break;
            case (TomeSquare):
                landOnSquare(this, 'tome', newSquare)
                break;
            case (DungeonSquare):
                landOnSquare(this, 'dungeon', newSquare)
                break;
            case (MovementSquare):
                landOnSquare(this, 'movement', newSquare)
                break;
            case (PropertySquare):
                landOnSquare(this, 'property', newSquare)
                break;
            case (ShopSquare):
                landOnSquare(this, 'shop', newSquare)
                break;
            case (CastleSquare):
                landOnSquare(this, 'castle', newSquare)
                break;
            case (DeckSquare):
                landOnSquare(this, 'deck', newSquare)
                break;
        }
    }

    traverseSquare(playerObject, traversedSquare){
        // traverses each square as a player moves
        // if tavern is traversed, give player gold
        if (traversedSquare instanceof TavernSquare && this.turnNum > this.players.length) {
            playerObject.changeGold((100 * playerObject.tavernMod), true)
            console.log('Gained 100 gold for passing the tavern!')
        }
    }

    playThisCard(card){
        // after clicking a card to play, player can set the target (if applicable) and play card
        console.log('In game.playThisCard(card)')
        const thisCardId = parseInt(card.getAttribute('id').split('-')[1])
        const thisCardObject = this.currentPlayer.hand.find(card => card.id === thisCardId)
        // determine target of card (IF APPLICABLE)
        this.setCardTarget(thisCardObject);
        // when targets are confirmed, add "Confirm" button below targets. On press, play the card.
        const confirmButton = document.createElement('div');
        confirmButton.classList.add('confirm-targets')
        const playerTurns = document.getElementsByClassName('player-turns')[0];
        const confirmP = document.createElement('p')
        confirmP.innerText = 'Confirm'
        confirmButton.appendChild(confirmP)
        playerTurns.appendChild(confirmButton)
         // When "Confirm" is clicked, play the card and reset the target UI
        confirmButton.addEventListener("click", playAndReset)
        function playAndReset(){
            thisCardObject.play();
            confirmButton.removeEventListener("click", playAndReset)
            confirmButton.remove()
            // deselect all selected players
            for (let i = 0; i < playerTurns.children.length; i++){
                if (playerTurns.children[i].classList.contains('selected')) {
                    playerTurns.children[i].classList.remove('selected')
                }
                if (playerTurns.children[i].classList.contains('on')) {
                    playerTurns.children[i].classList.remove('on')
                }
                if (playerTurns.children[i].classList.contains('off')) {
                    playerTurns.children[i].classList.remove('off')
                }
            }
        }
    }

    setCardTarget(card){
        // creates UI elements to highlight targettable players
        // on clicking a player (TOGGLE), they become a highlighted card target
        // they are then added or removed from an array of targets
        const targets = []
        // manual logic for which kind of targets a card can select
        switch (card.name){
            case 'Loot': // I am the target
                this.currentPlayer.makeTarget()
                targets.push(this.currentPlayer)
                break;
            case 'Annihilation': // everyone is the target
                for (let i = 0; i < this.players.length; i++){
                    this.players[i].makeTarget()
                    targets.push(this.players[i])
                }
                break;
        }

        card.targetPlayers = targets
    }

    allowDiceRoll() {
        // change center button to 'Roll'
        this.mainButton.children[0].innerText = 'Roll'

        let that = this
        this.mainButton.addEventListener("click", callRoll)
        function callRoll(){
            // Roll the dice
            that.diceRoll = that.handleDiceRoll.call(that);
            that.mainButton.children[0].innerText  = 'End'
            that.mainButton.removeEventListener("click", callRoll);
            // Continue with the turn
            that.postRollTurn();
        }
    }

    handleDiceRoll(){
        // when Roll button is clicked, calculate dice to roll and roll them
        console.log(`Rolling dice for ${this.currentPlayer.name}!`) // DEBUG

        let diceRoll = 0;
        let playerDiceNum = this.currentPlayer.diceNum
        let playerMax = this.currentPlayer.diceMax

        // roll dice
        diceRoll = this.rollDice(playerDiceNum, playerMax);

        console.log(`The dice roll was a ${diceRoll}!`) // DEBUG
        return diceRoll;
    }

    rollDice(diceNum, max){
        // returns the number of squares the player will move based on the dice roll
        
        let roll = 0;
        for (let i = 0; i < diceNum; i++){
            let thisDieRoll = 1 + Math.floor(Math.random() * max)
            this.displayDieRoll(thisDieRoll) // SHOULD APPEND THE DIE TO MIDDLE DOM
            roll += thisDieRoll;
        }
        return roll;
    }

    displayDieRoll(rollNum){
        // displays a single die roll result on the DOM
        const dieRollParent = document.getElementsByClassName('my-dice')[0]
        const thisDieRollEle = document.createElement('div')
        thisDieRollEle.classList.add('dice')
        const thisDieRollEmbed = document.createElement('embed')
        thisDieRollEmbed.setAttribute('src', `./assets/images/dice-${rollNum}.svg`)
        thisDieRollEle.appendChild(thisDieRollEmbed)
        dieRollParent.appendChild(thisDieRollEle)
    }

    hideDiceRolls(){
        // hides all of the dice from the DOM at the end of the turn
        const dieRollChildren = document.getElementById('my-dice')
        while (dieRollChildren.firstChild) {
            dieRollChildren.removeChild(dieRollChildren.firstChild);
        }
    }

    showCurrentPlayerHand() {
        // shows the cards in the current player's hand (INVOKE AT TURN BEGIN)
        for (let i = 0; i < this.currentPlayer.hand.length; i++){
            this.currentPlayer.hand[i].addToScreen();
        }
    }

    hideCurrentPlayerHand() {
        // hides the cards in the current player's hand (INVOKE AT TURN END)
        for (let i = 0; i < this.currentPlayer.hand.length; i++){
            this.currentPlayer.hand[i].removeFromScreen();
        }
    }

    highlightNewPlayer() {
        const thisPlayerBar = document.getElementById(`p${this.currentPlayer.turnId}`)
        thisPlayerBar.classList.add('current-turn')
        const playerHighlight = document.createElement('div')
        playerHighlight.classList.add('player-highlight')
        thisPlayerBar.appendChild(playerHighlight) // DEBUG

    }

    deHighlightPlayer() {
        const thisPlayerBar = document.getElementById(`p${this.currentPlayer.turnId}`)
        thisPlayerBar.classList.remove('current-turn')
        const playerHighlight = document.getElementsByClassName('player-highlight')[0]
        playerHighlight.remove()
    }

    isWon(){
        // check if the game has been won by a player (all other players have bankrupted)
        let gameWon = false;

        let bankruptCount = 0;
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].gold <= 0){
                bankruptCount += 1;
            }
        }
        if (bankruptCount >= this.players.length - 1) {
            gameWon = true;
        }

        return gameWon;
    }

    gameOver(winner){
        // The game is over! Overlay the entire HTML with a winning screen.
        console.log('The game is over!') // DEBUG
        alert(`The game is over! ${winner.name} has won!!`)
    }
}