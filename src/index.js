import {Game} from './scripts/game.js';
import {Player} from './scripts/player.js';

document.addEventListener("DOMContentLoaded", () => {
    
    // the main button starts by saying "Start"
    const mainButton = document.getElementById('main-button');
    mainButton.children[0].innerText = 'Start';

    // Game options (refactor later)
    const startingGold = 1000;
    const allPlayers = [new Player(startingGold, 0, 'LoremDude', './assets/images/player-orange.png')];

    // if the "+" button is clicked on, a player will be created and added to the game
    const addPlayerButton = document.getElementById('add-player');
    // add the new player
    addPlayerButton.addEventListener("click", addPlayer);
    function addPlayer(){
        const player = new Player(startingGold, allPlayers.length, 'IpsumGal', './assets/images/player-green.png');
        allPlayers.push(player);
    }
    
    // wait for the first player to press "Start", then create game and start game loop
    mainButton.addEventListener("click", makeGame);
    // create and run the game with given parameters
    function makeGame(){
        mainButton.removeEventListener("click", makeGame);
        addPlayerButton.removeEventListener("click", addPlayer);
        addPlayerButton.remove();

        const thisGame = new Game(allPlayers, startingGold);
        thisGame.onGameStart();
    }
});