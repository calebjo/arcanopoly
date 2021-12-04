
// A game instance should contain all of the logic for running a game of Arcanopoly.
// The Game will be created in index.js and start immediately.
// 
//
// constructor(players, startingGold)
// 
// Instance variables:
// players        : Array of the Player instances that are playing the game (min 2)
// startingGold   : Option for how much gold to start each player with (default 1000)
// turnNum        : Integer counter game turn number (start at 0, incremented first)
// currentPlayer  : Player instance of the player whose turn it is

export class Game {
    constructor(players, startingGold){
        this.players = players;
        this.startingGold = startingGold;
        this.turnNum = 0;
        this.currentPlayer = players[0];
        this.mainButton = document.getElementById('main-button');
        this.diceRoll = 0;
    }

    onGameStart(){
        // when Start is pressed, place the player tokens in the tavern

        const playerTokens = document.getElementById('player-tokens')
        for (let i = 0; i < this.players.length; i++){
            let player = document.createElement('div')
            player.classList.add('player-token')
            player.setAttribute('id', `player-${i}`)
            let playerIcon = document.createElement('img')
            // Create a new token element based on the given player's sprite
            playerIcon.setAttribute('src', `${this.players[i].sprite}`)

            // Set each player token position to the tavern (sq-0)
            this.movePlayer(player, 'sq-0')

            // attach token to the DOM
            player.appendChild(playerIcon)
            // playerTokens.appendChild(player)
            document.getElementById('sq-0').appendChild(player)
        }
        
        // remove bouncing animation for start turn button
        this.mainButton.style.removeProperty('animation')

        // then play a turn of the game
        console.log('The game has started!')
        this.playTurn()
    }

    playTurn(){
        console.log(`${this.currentPlayer.name} is playing a turn!`) // TEST
        this.turnNum += 1

        // change center button to 'Roll'
        this.mainButton.children[0].innerText = 'Roll'

        // when 'Roll' is clicked, roll the dice
        this.mainButton.addEventListener("click", callRoll)
        const that = this
        function callRoll(){
            that.diceRoll = that.handleDiceRoll.call(that);
            that.mainButton.children[0].innerText  = 'End'
            that.mainButton.removeEventListener("click", callRoll);
            that.postRollTurn();
        }
    }

    postRollTurn(){
        // move the current player based on the dice roll
        let target = this.currentPlayer.currentSquare + this.diceRoll;
        console.log(target)
        console.log(`${this.currentPlayer.name} will move to the ${target}th square.`)


        this.currentPlayer.movePlayer(target);
        // check which square the player landed in
        // if property, check if owned. 
        // if owned by non-current player, charge current and give gold to owner
        // otherwise, prompt player to purchase unowned property

        // then, allow players to "End Turn" with a button (not immediately invoked)


        // Switch to the next player and end the turn logic
        this.mainButton.addEventListener("click", endTurn);
        const that = this;
        function endTurn(){
            that.mainButton.removeEventListener("click", endTurn);
            // cycle to the next player
            let playerCount = that.players.length;
            let currentPlayerIdx = that.players.indexOf(that.currentPlayer);
            let nextPlayerIdx = (currentPlayerIdx + 1) % playerCount;

            that.currentPlayer = that.players[nextPlayerIdx];

            console.log(`The next player will be ${that.currentPlayer.name}.`) // DEBUG
            console.log('End of the turn.')// DEBUG

            // if the game is not already won, play another turn
            if (!that.isWon()){ 
                that.playTurn() 
            } else {
                that.gameOver();
            }
        }
    }

    // -------------------------------------------------------------------------------
    // Game logic outside of loop

    movePlayer(playerSprite, target){
        // takes in a player element (div with token inside) and a target square element
        // moves the player's token to the target position
        const playerObject = this.players.find(player => player.sprite === playerSprite)
        console.log(playerSprite)
        console.log(playerObject)
        // const tavernPos = document.getElementById('sq-0').getBoundingClientRect()
        // console.log(tavernPos) // DEBUG
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
            roll += thisDieRoll;
        }
        return roll;
    }

    isWon(){
        // check if the game has been won by a player (all other players have bankrupted)
        let gameWon = false;

        for (let i = 0; i < this.players.length; i++){
            let thisPlayer = this.players[i];

            if (thisPlayer.gold !== 0){
                gameWon = false;
            }
        }

        return gameWon;
    }

    gameOver(){
        // PLACEHOLDER
        console.log('The game is over!') // DEBUG
    }
}