
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
    }

    playTurn(){
        console.log('Beginning of the turn!') // TEST
        // change center button to 'Roll'
        let rollButton = document.getElementsByClassName('roll-dice');
        rollButton[0].innerText = 'Roll';

        // continue with the rolling section of the turn
        this.preRollTurn();
        console.log('End of playTurn()')
    }

    async preRollTurn(){
        console.log('In preRollTurn()') // TEST
        this.turnNum += 1;
        // display Roll Dice button until dice are rolled
        

        // when Roll button is clicked, roll the player's dice
        rollButton[0].addEventListener("click", this.handleDiceRoll);

        console.log('Right before promise')
        // wait for the dice to be rolled, then continue on in the turn
        let promise = new Promise((resolve) => {this.handleDiceRoll = resolve});
        await promise.then((result) => {this.postRollTurn()});
        console.log('After await');
    }

    async postRollTurn(){
        console.log('In postRollTurn()')
        // move the current player based on the dice roll
        let target = this.currentPlayer.currentSquare + diceRoll;
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
        let playerDiceNum = this.currentPlayer.diceNum;
        let playerMax = this.currentPlayer.diceMax;
        let diceRoll = 0;

        // roll dice
        diceRoll = this.rollDice(playerDiceNum, playerMax);
        // change Roll button to say 'End Turn'
        console.log(`The dice roll was a ${diceRoll}!`);
        rollButton.innerText = 'End Turn';
        // this.postRollTurn();
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