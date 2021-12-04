
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
        // then, while the game is not won, play a turn of the game
        this.playTurn();
        console.log('Playing a turn!')
    }

    playTurn(){
        console.log('Beginning of the turn!') // TEST
        this.turnNum += 1;

        // change center button to 'Roll'
        this.mainButton.children[0].innerText = 'Roll';

        // when 'Roll' is clicked, roll the dice
        this.mainButton.addEventListener("click", callRoll);

        const that = this;
        function callRoll(){
            that.diceRoll = that.handleDiceRoll.call(that);
            that.mainButton.children[0].innerText  = 'End'
            that.postRollTurn();
        }
    }

    postRollTurn(){
        console.log('In postRollTurn()')
        // move the current player based on the dice roll
        let target = this.currentPlayer.currentSquare + this.diceRoll;
        console.log(target)
        console.log(`The player will move to the ${target}th square.`)


        this.currentPlayer.movePlayer(target);
        // check which square the player landed in
        // if property, check if owned. 
        // if owned by non-current player, charge current and give gold to owner
        // otherwise, prompt player to purchase unowned property

        // then, allow players to "End Turn" with a button (not immediately invoked)


        // Switch to the next player and end the turn logic
        let playerCount = this.players.length;
        let currentPlayerIdx = this.players.indexOf(this.currentPlayer);
        let nextPlayerIdx = (currentPlayerIdx + 1) % playerCount;

        this.currentPlayer = this.players[nextPlayerIdx];
        console.log('End of Game.playTurn()')// TEST
    }

    moveCurrentPlayer(){

    }

    handleDiceRoll(){
        // when Roll button is clicked, calculate dice to roll and roll them
        console.log('IN HANDLEDICEROLL')
        console.log(`currentPlayer in handleDiceRoll is: ${this.currentPlayer.name}`)

        let diceRoll = 0;

        let playerDiceNum = this.currentPlayer.diceNum
        let playerMax = this.currentPlayer.diceMax

        // roll dice
        diceRoll = this.rollDice(playerDiceNum, playerMax);

        console.log(`The dice roll was a ${diceRoll}!`);
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

    winner(){
        // Everyone else has bankrupted! X player wins!
    }

    loser(){
        // X player has bankrupted...
    }
}