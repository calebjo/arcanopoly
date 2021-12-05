
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
import { Board } from "./board";
import { CastleSquare, DeckSquare, DungeonSquare, MovementSquare, PropertySquare, ShopSquare, Square, TavernSquare, TomeSquare } from "./square";
import { landOnSquare } from "./landOnSquare";
import {Howl, Howler} from 'howler';

export class Game {
    constructor(players, startingGold){
        this.players = players;
        this.startingGold = startingGold;
        this.turnNum = 0;
        this.currentPlayer = players[0];
        this.mainButton = document.getElementById('main-button');
        this.diceRoll = 0;
        this.board = new Board();
    }

    onGameStart(){
        // Change global volume.
        Howler.volume(1);
        // Setup the new Howl
        const gameStartSound = new Howl({
            src: ['./assets/sounds/bubble-pop.wav']
        });
        // Play the sound at the start of the game.
        gameStartSound.volume(0.35)
        gameStartSound.play();

        // Play pop sound on clicking either the add player button or main button
        this.mainButton.addEventListener('click', playButtonClickSound)
        function playButtonClickSound(){
            const pressSound = new Howl({
                src: ['./assets/sounds/pop-alert.mp3']
            });
            // Play the sound on button click
            pressSound.volume(0.1)
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

            // Set each player token position to the tavern (sq-0)
            this.players[i].movePlayer(this, 'sq-0')
        }
        
        // remove bouncing animation for start turn button
        // this.mainButton.style.removeProperty('animation')

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
        let targetNum = (this.currentPlayer.currentSquare + this.diceRoll) % 40;
        console.log(`${this.currentPlayer.name} will move to the ${targetNum}th square.`)

        // get the current player and move their token to the target square
        this.currentPlayer.movePlayer(this, `sq-${targetNum}`)

        // check which square the player landed in, handle appropriate logic
        this.handleNewPlayerPos();

        // Switch to the next player and end the turn logic
        
        this.mainButton.addEventListener("click", endTurn);
        const that = this;
        function endTurn(){
            console.log(that)
            console.log(that.mainButton)
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

    handleNewPlayerPos() {
        const newPos = this.currentPlayer.currentSquare
        const newSquare = this.board.squares[newPos]

        console.log(newSquare)
 
        // check what kind of square the player landed on
        switch (newSquare.constructor){
            case (TavernSquare):
                console.log('This is a tavern square!')
                landOnSquare(this, 'tavern', newSquare)
                break;
            case (TomeSquare):
                console.log('This is a tome square!')
                landOnSquare(this, 'tome', newSquare)
                break;
            case (DungeonSquare):
                console.log('This is a dungeon square!')
                landOnSquare(this, 'dungeon', newSquare)
                break;
            case (MovementSquare):
                console.log('This is a movement square!')
                landOnSquare(this, 'movement', newSquare)
                break;
            case (PropertySquare):
                console.log('This is a property square!')
                landOnSquare(this, 'property', newSquare)
                break;
            case (ShopSquare):
                console.log('This is a shop square!')
                landOnSquare(this, 'shop', newSquare)
                break;
            case (CastleSquare):
                console.log('This is a castle square!')
                landOnSquare(this, 'castle', newSquare)
                break;
            case (DeckSquare):
                console.log('This is a deck square!')
                landOnSquare(this, 'deck', newSquare)
                break;
        }
    }

    traverseSquare(playerObject, traversedSquare){
        // changes each traversed square to the color of the player that traversed it
        let playerColor = this.currentPlayer.sprite.split('-')[1].split('.')[0]
        console.log(playerColor)
        traversedSquare.domRef.style.background = playerColor;
        // traversedSquare.domRef.style.background = '#323a4c';
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