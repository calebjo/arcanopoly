
// A game instance should contain all of the logic for running a game of Arcanopoly.
// The Game will be created in index.js and start immediately.

import { Board } from "./board";
import { CastleSquare, DeckSquare, DungeonSquare, MovementSquare, PropertySquare, ShopSquare, Square, TavernSquare, TomeSquare } from "./square";
import { Equipment } from "./equipment";
import { landOnSquare } from "./landOnSquare";
import { Howl, Howler } from 'howler';
import { MoonDeck, SunDeck } from "./deck";
import { ComputerPlayer } from "./computerPlayer";
import { generateCardConfirm, generateGameEndScreen, generateHistory } from "./generateUI";

export class Game {
    constructor(players, startingGold){
        this.players = players;
        this.startingGold = startingGold;
        this.turnNum = 0;
        this.currentPlayer = players[0];
        this.mainButton = document.getElementById('main-button');
        this.diceRoll = 0;
        this.rolls = 1; // rerolls are added to this, if any
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
        this.generateDeckEles();
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
        // console.log('The game has started!') // DEBUG
        this.playTurn()
    }
    // ------------------------------------------------------------------------------------------------
    // GAME LOOP LOGIC

    playTurn(){
        this.checkWinner(); // if there is a winner, game over
        // console.log(`${this.currentPlayer.name} is playing a turn!`) // DEBUG
        this.turnNum += 1
        // Add the player's rerolls to the dice roll num, if any
        this.rolls = 1
        this.rolls += this.currentPlayer.rerolls

        // Show current player's specific DOM elements (hand, properties)
        this.showCurrentPlayerHand();
        this.showCurrentPlayerProperties();
        this.showRerollToken();
        this.highlightThisPlayer();

        // When a card is clicked, play it
        this.allowCardPlay();

        // if the current player is imprisoned, they must pay 50 gold to get out (or lose)
        const prisoners = this.board.squares[10].prisoners
        if (prisoners.includes(this.currentPlayer)){
            this.rolls = 0
            this.handleImprisoned();
        } else {
            // Change main button to "Roll". When clicked, rolls the dice.
            this.allowDiceRoll();
            this.handleComputerPress();
        }
    }

    postRollTurn(){
        this.allowCardPlay();
        // when Roll is pressed, handle moving the player
        this.handlePlayerMove();

        if (this.rolls > 0){
            // if rerolls remain, allow for dice rerolling
            this.allowDiceRoll();
            this.handleComputerPress();
        } else {
            // Switch to the next player and end the turn logic
            this.endGameTurn();
        }
    }

    endGameTurn() {
        this.checkWinner(); // if there is a winner, game over
        this.mainButton.addEventListener("click", endTurn);
        let that = this;
        function endTurn(){
            // remove end turn interaction, hide player-specific DOM elements
            that.mainButton.removeEventListener("click", endTurn);
            that.hideCurrentPlayerHand();
            that.hideCurrentPlayerProperties();
            that.hideDiceRolls();
            that.hideRerollToken();
            that.deHighlightPlayer();

            // cycle to the next player, skipping if bankrupt
            let playerCount = that.players.length;
            let currentPlayerIdx = that.players.indexOf(that.currentPlayer);
            let nextPlayerIdx = (currentPlayerIdx + 1) % playerCount;
            let nextPlayer = that.players[nextPlayerIdx]

            if (!(nextPlayer.bankrupt)) {
                that.currentPlayer = nextPlayer
            }
            // skip if bankrupt
            while (nextPlayer.bankrupt) {
                if (that.players.every(player => player.bankrupt)) { 
                    break;
                }
                nextPlayerIdx = (nextPlayerIdx + 1) % playerCount;
                that.currentPlayer = that.players[nextPlayerIdx];
                nextPlayer = that.currentPlayer
            }

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

        this.handleComputerPress();
    }

    // -------------------------------------------------------------------------------
    // NON-GAME LOOP METHODS
    handleComputerPress() {
        // console.log('In handleComputerPress()')
        if (this.currentPlayer instanceof ComputerPlayer) {
            // if it's a computer player, press the button/auto confirm.
            this.currentPlayer.pressButton(this.mainButton)
        }
    }

    handlePlayerMove() {
        // move the current player based on the dice roll
        let targetNum = (this.currentPlayer.currentSquare + this.diceRoll) % 40;
        // if the target is a movement square, give an extra reroll early (to account for timeout logic later)
        if (targetNum === 4){ 
            this.rolls += 1 
            // this.showRerollToken()
        }
        // console.log(`${this.currentPlayer.name} will move to the ${targetNum}th square.`)
        // get the current player and move their token to the target square
        this.currentPlayer.movePlayer(this, `sq-${targetNum}`)
    }

    handleNewPlayerPos() {
        const newPos = this.currentPlayer.currentSquare
        const newSquare = this.board.squares[newPos]
        // console.log(newSquare) // player's target square
 
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
            // console.log('Gained 100 gold for passing the tavern!')
        }
    }

    allowCardPlay(){
        // Whenever a card is grabbed and placed in the correct position, "play" the card.
        // MVP: just click a card to activate it
        // If the current player has a hand, get all the cards within and add event listener to each
        let that = this
        if (this.currentPlayer.hand.length > 0) {
            const cardClickable = document.querySelectorAll(".my-card")
            for (let i = 0; i < cardClickable.length; i++){
                cardClickable[i].removeEventListener("click", playThis) // remove in case of duplicates
                cardClickable[i].addEventListener("click", playThis)
                // console.log('Making an event listener for a card!')
                function playThis(){
                    cardClickable[i].removeEventListener("click", playThis)
                    that.playThisCard(cardClickable[i])
                }
            }
        }
    }

    playThisCard(card){
        // after clicking a card to play, player can set the target (if applicable) and play card
        // console.log('In game.playThisCard(card)')
        const thisCardId = parseInt(card.getAttribute('id').split('-')[1])
        const thisCardObject = this.currentPlayer.hand.find(card => card.id === thisCardId)
        // determine target of card (IF APPLICABLE)
        this.setCardTarget(thisCardObject);
        // when targets are confirmed, add "Confirm" button below targets. On press, play the card.
        let confirmButton = generateCardConfirm(this)
        // When "Confirm" is clicked, play the card and reset the target UI
        confirmButton.addEventListener("click", playAndReset)
        let that = this
        function playAndReset(){
            thisCardObject.play();
            confirmButton.removeEventListener("click", playAndReset)
            confirmButton.remove()
            // deselect all selected players
            let playerTurns = document.getElementsByClassName('player-turns')[0]
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
            generateHistory(that, 'cardPlay', that.currentPlayer, thisCardObject)
            that.checkWinner() // When a card is played, check to see if the game just ended
        }
    }

    handleImprisoned(){
        // change main button to "Pay", which makes the player pay 50 gold to get out of jail
        this.mainButton.children[0].innerText = 'Pay'

        let that = this
        this.mainButton.addEventListener("click", freePlayer)
        function freePlayer(){
            // player pays 50 gold to get free, then ends turn
            that.currentPlayer.changeGold(-50)
            that.board.squares[10].prisoners.splice(that.currentPlayer, 1)

            that.mainButton.removeEventListener("click", freePlayer)
            that.mainButton.children[0].innerText  = 'End'
            // End the turn
            that.endGameTurn();
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
            // console.log(that.rolls)
            that.rolls -= 1
            that.hideRerollToken()
            that.showRerollToken()
            // Roll the dice
            that.diceRoll = that.handleDiceRoll.call(that)
            that.mainButton.children[0].innerText  = 'End'
            that.mainButton.removeEventListener("click", callRoll)
            // Continue with the turn if there are no rolls left
            // console.log(that.rolls)
            if (that.rolls <= 0) { 
                // console.log('Out of rolls!!!!')
                that.postRollTurn(); 
            } else {
                // console.log('More rolls to go!!!!!!!')
                // that.allowDiceRoll();
            }
        }
    }

    handleDiceRoll(){
        // when Roll button is clicked, calculate dice to roll and roll them
        // console.log(`Rolling dice for ${this.currentPlayer.name}!`) // DEBUG
        // hide any previous roll dice
        this.hideDiceRolls()

        let playerDiceNum = this.currentPlayer.diceNum
        let playerMax = this.currentPlayer.diceMax
        // roll dice
        let diceRoll = 0;
        for (let i = 0; i < playerDiceNum; i++){
            let thisDieRoll = 1 + Math.floor(Math.random() * playerMax)
            this.displayDieRoll(thisDieRoll) // SHOULD APPEND THE DIE TO MIDDLE DOM
            diceRoll += thisDieRoll;
        }

        // console.log(`The dice roll was a ${diceRoll}!`) // DEBUG
        return diceRoll;
        // return 5; // DEBUG ------------------ RETURN A SPECIFIC VALUE TO GUARANTEE SQUARE HITS
    }

    generateDeckEles() {
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
    }

    displayDieRoll(rollNum) {
        // displays a single die roll result on the DOM
        const dieRollParent = document.getElementsByClassName('my-dice')[0]
        const thisDieRollEle = document.createElement('div')
        thisDieRollEle.classList.add('dice')
        const thisDieRollEmbed = document.createElement('embed')
        thisDieRollEmbed.setAttribute('src', `./assets/images/dice-${rollNum}.svg`)
        thisDieRollEle.appendChild(thisDieRollEmbed)
        dieRollParent.appendChild(thisDieRollEle)
    }

    hideDiceRolls() {
        // hides all of the dice from the DOM at the end of the turn
        const dieRollChildren = document.getElementById('my-dice')
        while (dieRollChildren.firstChild) {
            dieRollChildren.removeChild(dieRollChildren.firstChild);
        }
    }

    showRerollToken() {
        if (this.rolls > 1) {
            // creates a token to the right of the main button that displays the player's number of rerolls
            const diceContainer = document.getElementsByClassName('dice-container')[0]
            const rerollToken = document.createElement('div')
            rerollToken.classList.add('reroll-token')
            rerollToken.style.position = 'fixed'
            rerollToken.style.bottom = '31.5rem'
            rerollToken.style.left = '53rem'
            rerollToken.innerText = `${this.rolls-1}`

            diceContainer.appendChild(rerollToken)
        }
    }

    hideRerollToken() {
        let rerollToken = document.getElementsByClassName('reroll-token')[0]
        if (rerollToken) {
            rerollToken.remove();
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

    showCurrentPlayerProperties(){
        // shows the current player's properties in the player's "my properties" window
        for (let i = 0; i < this.currentPlayer.properties.length; i++){
            this.currentPlayer.properties[i].addToScreen();
        }
    }

    hideCurrentPlayerProperties(){
        // hides the current player's properties in the player's "my properties" window
        for (let i = 0; i < this.currentPlayer.properties.length; i++){
            this.currentPlayer.properties[i].removeFromScreen();
        }
    }

    highlightThisPlayer() {
        const thisPlayerBar = document.getElementById(`p${this.currentPlayer.turnId}`)
        thisPlayerBar.classList.add('current-turn')
    }

    deHighlightPlayer() {
        const thisPlayerBar = document.getElementById(`p${this.currentPlayer.turnId}`)
        thisPlayerBar.classList.remove('current-turn')
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

        // console.log(gameWon)
        return gameWon;
    }

    checkWinner(){
        // console.log('In game.checkWinner()')
        if (this.isWon()) {
            let winner = null;
            for (let i = 0; i < this.players.length; i++){
                if (this.players[i].gold > 0){
                    winner = this.players[i];
                }
            }
            this.gameOver(winner);
        }
    }

    gameOver(winner){
        // The game is over! Overlay the entire HTML with a winning screen.
        if (winner === null) {
            // console.log('Everyone lost!')
            generateGameEndScreen(winner)
        } else {
            // console.log('The game is over!') // DEBUG
            generateGameEndScreen(winner)
        }
    }
}