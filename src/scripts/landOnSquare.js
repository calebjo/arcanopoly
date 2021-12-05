
// handle individual logic for a player landing on any square
export function landOnSquare(game, player, squareType, position){
    switch (squareType) {
        case ('tavern'):
            landOnTavern(game, player, squareType, position)
            break;
        case ('tome'):
            landOnTome(game, player, squareType, position)
            break;
        case ('dungeon'):
            landOnDungeon(game, player, squareType, position)
            break;
        case ('movement'):
            landOnMovement(game, player, squareType, position)
            break;
        case ('property'):
            landOnProperty(game, player, squareType, position)
            break;
        case ('shop'):
            landOnShop(game, player, squareType, position)
            break;
        case ('castle'):
            landOnCastle(game, player, squareType, position)
            break;
        case ('deck'):
            landOnDeck(game, player, squareType, position)
            break;
    }

    function landOnTavern(){
        // if turnNum is greater than 1, current player gains 100 gold
    }

    function landOnTome(){
        // current player may discard any number of their cards and draw new ones from the moon deck
    }

    function landOnDungeon(){
        // current player goes to the "just visiting" area of the dungeon
    }

    function landOnMovement(){
        // check what type of movement square
        // if 'go to dungeon', go to dungeon as prisoner
        // else if 'forward' type, reroll your dice and go forward that amount
        // else if 'backward' type, reroll your dice and go backward that amount
    }

    function landOnProperty(){
        // check if property is owned
        // if owned, check if owned by current player
        //   if owned by current player, do nothing
        //   if owned by non-current player, charge current player the rent
        // if unowned, check if current player's gold is above price
        //   if so, prompt current player to buy the property
        //     if they do, add it to their properties and change property's owner to current player
        //     if not, do nothing
        //   if not, say 'Sorry, you don't have enough gold...'
    }

    function landOnShop(){
        // open up shop UI (ONLY VISIBLE TO CURRENT PLAYER)
        //     allows current player to view and buy 4 cards and 2 equipment
        //     3 of the cards are "sun deck" cards and 1 is a "moon deck" card
        //     each item displays a picture and a price in gold
        //     on click, each "purchase" button will transfer the item to the player and charge them gp
        //     Any item that costs more than the player's gold total will be displayed in red + unclickable
    }

    function landOnCastle(){
        // charges all other players 25 gp * the number of cards in the currentplayer's hand
    }

    function landOnDeck(){
        // check which deck type the square is
        // if 'sun' deck type, current player draws 3 cards from the 'sun' deck
        // else if 'moon' deck type, current player draws 2 cards from the 'moon' deck
    }

}