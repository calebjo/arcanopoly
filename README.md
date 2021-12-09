# Background

[Arcanopoly](https://calebjo.github.io/arcanopoly/) is a variation on the classic friendship-testing board game Monopoly that adds "Roguelike" elements! The game is fantasy-themed and players traverse a board filled with fantasy location names. Players can pick up cards and equipment that drastically alter the normal Monopoly game. Now you can ruin the family get-together even more than before!

# Instructions

* To add a player, click the yellow "+" button on the left.
* After up to 6 total players are in the game, click the "Start" button in the middle.
* The Start button will become "Roll": click it to roll dice and have fun!
* Property buying is currently implemented in a confirm() window.
* Click a card to play it, and then press the "Confirm" button

# Gameplay
![arcanopoly gameplay image](https://i.imgur.com/tzTpQ4k.png)

In a game of Arcanopoly, users can:
* Play as a character sprite on a board
* Roll dice to traverse a circular board full of properties
* Buy properties, draw cards, and gain equipment (_very basic cards/equipment for now_)
* Play cards on their turn to benefit themselves or hinder an opponent

# Technologies, Libraries, APIs

Arcanopoly is implemented with the following (_tentative_) technologies:
* Pure vanilla JavaScript DOM manipulation for all of the game logic and animations.
```js
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
```
Endless vanilla!
```js
endGameTurn() {
        this.checkWinner(); // if there is a winner, game over
        this.allowCardPlay();
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
```
(_and so on.._)
* Additionally:
    * <span style="color:purple">[Howler.js](https://howlerjs.com/)</span> for game sound support.


And will eventually make use of:
* <span style="color:purple">Colyseus.io</span> for multiplayer game hosting with Node.js.
* One or two different web scraping APIs.

# Future features:

* Add bonus features according to difficulty (easiest first):

| Feature Name | Difficulty | Description |
| ------------ | ---------- | ----------- |
| Computer players | <span style="color:green">**Not too intensive** </span> | Instead of random decisions, make computer players somewhat intelligent about properties, cards, and other players.|
| Add Cards/Equipment | <span style="color:yellow">**As difficult as the idea!** </span> | Add additional, more complex cards and equipment. OOP FTW! |
| Add Options | <span style="color:orange">**Not intensive, low priority** </span> | Add game options to the start of any game (this might actually be fairly easy, just low priority).
| Online Multiplayer | <span style="color:red">**Intensive** </span> | Add support for actual human players via [Colyseus.io's](https://www.colyseus.io/) server setup process. Deploy on Heroku. |

# Attribution

* **Styles**
    * reset.css:  https://meyerweb.com/eric/tools/css/reset/
    * Fonts: Beleren from https://upfonts.com/
* **Images**:
    * Square/Dice Icons: https://fontawesome.com/, various
    * Property Icons: https://game-icons.net/, various
    * Card Clipart: Copyright-free clipart found on Google
    * Equipment Icons: https://craftpix.net/, various
* **Names**:
    * Random usernames: https://jimpix.co.uk/words/random-username-generator.asp
