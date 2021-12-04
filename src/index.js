document.addEventListener("DOMContentLoaded", () => {
    
    // when the plus symbol is clicked, a new player is created
    let startingGold = 1000;

    let player1 = new Player(startingGold, 1, 'Jim', 'placeholder');
    let player2 = new Player(startingGold, 2, 'Asjdalasdsesfgo', 'placeholder');
    let player3 = new Player(startingGold, 3, 'Blue Dog', 'placeholder');
    const players = [player1, player2, player3];

    let thisGame = new Game(players, startingGold);

    // until game is won, loop through each player and playTurn 
    while (!thisGame.isWon()) {
        thisGame.playTurn();
    }
});