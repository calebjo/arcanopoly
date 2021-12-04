
// A game instance should contain all of the logic for running a game of Arcanopoly.
// The Game will be created in runGame.js and start immediately.
// 
//
// constructor(players, startingGold)
// 
// Instance variables:
// players        : Array of the Player instances that are playing the game (min 2)
// startingGold   : Option for how much gold to start each player with (default 1000)
// turnNum        : Integer counter game turn number (start at 0, incremented first)
// currentPlayer  : Player instance of the player whose turn it is

class Game {
    constructor(players, startingGold){
        this.players = players;
        this.startingGold = startingGold;
        this.turnNum = 0;
        this.currentPlayer = players[0];
    }

    playTurn(){
        this.turnNum += 1;
        // display Roll Dice button until dice are rolled
        let rollButton = document.getElementsByClassName('roll-dice');
        rollButton.getElementsByTagName('p').innerText = 'Roll';

        // when Roll button is clicked, roll the current player's dice
        let playerDiceNum = this.currentPlayer.diceNum;
        let playerMax = this.currentPlayer.diceMax;
        let diceRoll = 0;

        rollButton.addEventListener("click", () => {
            diceRoll = this.rollDice(playerDiceNum, playerMax);
            // change Roll button to say 'End Turn'
            rollButton.getElementsByTagName('p').innerText = 'End Turn';
        });
            
        // move the current player based on the dice roll
        // let target = this.board[]
        this.currentPlayer.movePlayer(target);

        // check which square the player landed in
        // if property, check if owned. 
        // if owned by non-current player, charge current and give gold to owner
        // otherwise, prompt player to purchase unowned property

        // then, allow players to "End Turn" with a button (not immediately invoked)


        // Switch to the next player and end the turn logic
        let playerCount = players.length;

        let currentPlayerIdx = players.indexOf(this.currentPlayer);
        let nextPlayerIdx = (currentPlayerIdx + 1) % playerCount;

        this.currentPlayer = players[nextPlayerIdx];
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
        this.players.array.forEach(player => {
            if (player.gold !== 0){
                return false;
            }
        });

        return true;
    }

    winner(){
        // Everyone else has bankrupted! X player wins!
    }

    loser(){
        // X player has bankrupted...
    }
}