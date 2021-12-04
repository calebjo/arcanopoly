import {Game} from './scripts/game.js';
import {Player} from './scripts/player.js';

document.addEventListener("DOMContentLoaded", () => {
    
    // when the plus symbol is clicked, a new player is created
    const mainButton = document.getElementById('main-button');
    mainButton.children[0].innerText = 'Start';

    // Game options (refactor later)
    const startingGold = 1000;
    const allPlayers = [new Player(startingGold, 0, 'LoremDude', 'placeholder')];

    // if the "+" button is clicked on, a player will be created and added to the game
    const addPlayerButton = document.getElementById('add-player');

    // add the new player
    addPlayerButton.addEventListener('click', () => {
        const player = new Player(startingGold, allPlayers.length, 'IpsumGal', 'placeholder');
        allPlayers.push(player);

        // TEST LOG
        console.log(allPlayers);
    });

    
    // wait for the first player to press "Start", then create game and start game loop
    mainButton.addEventListener('click', () => {
        // create the game with given parameters
        const thisGame = new Game(allPlayers, startingGold);
        
        // until game is won, loop through each player and playTurn 
        while (!thisGame.isWon()) { 
            console.log('About to play!')
            thisGame.playTurn();
        }
    });
});