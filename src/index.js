import {Game} from './scripts/game.js';
import {Player} from './scripts/player.js';

document.addEventListener("DOMContentLoaded", () => {
    // -------------------------------------------------------------
    // AUDIO CONTROL SETTINGS
    const muteButton = document.getElementsByClassName('mute-button')[0]
    muteButton.addEventListener("click", muteUnmute)

    let gameMuted = false;
    function muteUnmute(){
        // changes global volume to mute or 100%
        if (!gameMuted){
            Howler.volume(0);
            gameMuted = true;
        } else {
            Howler.volume(1);
            gameMuted = false;
        }
    }
    // -------------------------------------------------------------

    // Game options (refactor later)
    const startingGold = 500;
    const allPlayers = [new Player(startingGold, 0, 'LoremDude', './assets/images/player-cyan.png')];
    const playerSprites = [
        './assets/images/player-blue.png',
        './assets/images/player-cyan.png',
        './assets/images/player-green.png',
        './assets/images/player-orange.png',
        './assets/images/player-pink.png',
        './assets/images/player-purple.png',
        './assets/images/player-red.png',
        './assets/images/player-yellow.png'
    ]
    const playerNames = [
        'Wedaste14',
        'LingRos742',
        'Amesson16',
        'MetrWr42',
        'RozeBro36',
        'Geando64',
        'ArriErt74',
        'Gantuanloa24',
        'Candalourgian9',
        'Safann60',
        'OceedAn84',
        'Rsearcher10',
    ]
    // if the "+" button is clicked on, a player will be created and added to the game
    const addPlayerButton = document.getElementById('add-player');
    addPlayerButton.addEventListener("click", addPlayer);
    // add the new player
    function addPlayer(){
        const pressSound = new Howl({
            src: ['./assets/sounds/pop-alert.mp3']
        });
        // Play the sound on button click
        pressSound.volume(0.1)
        pressSound.play();

        // add a random player with placeholder values
        const randomSprite = playerSprites[Math.floor(Math.random()*playerSprites.length)]
        const randomName = playerNames[Math.floor(Math.random()*playerNames.length)]

        const player = new Player(startingGold, allPlayers.length, randomName, randomSprite);
        allPlayers.push(player);
    }
    
    // the main button starts by saying "Start"
    const mainButton = document.getElementById('main-button');
    mainButton.children[0].innerText = 'Start';
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