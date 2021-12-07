
// A deck is a collection of Card objects. Each deck can have different card numbers and types.

import { MoneyCard } from "./card";
import { PropertyCard } from "./card";
import { MovementCard } from "./card";
import { ModifierCard } from "./card";
import { animateCardDraw } from "./generateAnimations";

// generateDeck(type) function
// takes in deck type string (e.g. 'sun', 'moon')
// based on type, assembles a shuffled, complete deck of cards

export class Deck {
    constructor(id, domRef) {
        this.id = id
        this.domRef = domRef
    }

    // All decks should be able to shuffle in the same way
    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            // iterating from top to bottom, swap random cards
            let j = Math.floor(Math.random() * (i + 1));
            let swap = array[i];
            array[i] = array[j];
            array[j] = swap;
        }
    }

    draw(player, amount) {
        for (let i = 0; i < amount; i++){
            if (player.hand.length > 7){
                console.log('Player has too many cards!')
                break;
            }
            let thisCard = this.cards[i];
            player.changeCard(thisCard, true) // give card to player
            this.cards.splice(i, 1) // remove the card from the deck
            animateCardDraw()
        }
    }
}

// DECK SUBCLASSES -----------------------------------------------------------

export class SunDeck extends Deck {
    // subclass of Deck that constructs a list of more common cards
    constructor(id, domRef) {
        super(id, domRef)
        this.cards = this.createDeck()
    }

    createDeck() {
        // create a deck of 30 cards: 20 common and 10 rare
        const cardsArray = [
            new MoneyCard(1, 'Loot', './assets/images/card-loot.png', 'common', null, 25, 50, 1, null),
            new MoneyCard(2, 'Loot', './assets/images/card-loot.png', 'common', null, 25, 50, 1, null),
            new MoneyCard(3, 'Loot', './assets/images/card-loot.png', 'common', null, 25, 50, 1, null),
            new MoneyCard(4, 'Loot', './assets/images/card-loot.png', 'common', null, 25, 50, 1, null),
            new MoneyCard(5, 'Loot', './assets/images/card-loot.png', 'common', null, 25, 50, 1, null),
            new MoneyCard(6, 'Loot', './assets/images/card-loot.png', 'common', null, 25, 50, 1, null),
            new MoneyCard(7, 'Loot', './assets/images/card-loot.png', 'common', null, 25, 50, 1, null),
            new MoneyCard(8, 'Loot', './assets/images/card-loot.png', 'common', null, 25, 50, 1, null),
            new MoneyCard(9, 'Loot', './assets/images/card-loot.png', 'common', null, 25, 50, 1, null),
            new MoneyCard(10, 'Loot', './assets/images/card-loot.png', 'common', null, 25, 50, 1, null),
            new MoneyCard(11, 'Collection', './assets/images/card-collection.png', 'common', null, 50, 25, null, null),
            new MoneyCard(12, 'Collection', './assets/images/card-collection.png', 'common', null, 50, 25, null, null),
            new MoneyCard(13, 'Collection', './assets/images/card-collection.png', 'common', null, 50, 25, null, null),
            new MoneyCard(14, 'Collection', './assets/images/card-collection.png', 'common', null, 50, 25, null, null),
            new MoneyCard(15, 'Collection', './assets/images/card-collection.png', 'common', null, 50, 25, null, null),
            new MoneyCard(16, 'Collection', './assets/images/card-collection.png', 'common', null, 50, 25, null, null),
            new MoneyCard(17, 'Collection', './assets/images/card-collection.png', 'common', null, 50, 25, null, null),
            new MoneyCard(18, 'Collection', './assets/images/card-collection.png', 'common', null, 50, 25, null, null),
            new MoneyCard(19, 'Collection', './assets/images/card-collection.png', 'common', null, 50, 25, null, null),
            new MoneyCard(20, 'Collection', './assets/images/card-collection.png', 'common', null, 50, 25, null, null),
            new MoneyCard(21, 'Tithe', './assets/images/card-tithe.png', 'rare', null, 35, 50, 1, null),
            new MoneyCard(22, 'Tithe', './assets/images/card-tithe.png', 'rare', null, 35, 50, 1, null),
            new MoneyCard(23, 'Tithe', './assets/images/card-tithe.png', 'rare', null, 35, 50, 1, null),
            new MoneyCard(24, 'Tithe', './assets/images/card-tithe.png', 'rare', null, 35, 50, 1, null),
            new MoneyCard(25, 'Tithe', './assets/images/card-tithe.png', 'rare', null, 35, 50, 1, null),
            new MoneyCard(26, 'Rose', './assets/images/card-rose.png', 'rare', null, 75, 200, 1, null),
            new MoneyCard(27, 'Rose', './assets/images/card-rose.png', 'rare', null, 75, 200, 1, null),
            new MoneyCard(28, 'Rose', './assets/images/card-rose.png', 'rare', null, 75, 200, 1, null),
            new MoneyCard(29, 'Rose', './assets/images/card-rose.png', 'rare', null, 75, 200, 1, null),
            new MoneyCard(30, 'Rose', './assets/images/card-rose.png', 'rare', null, 75, 200, 1, null)
        ];

        this.shuffle(cardsArray);
        return cardsArray;
    }
}

export class MoonDeck extends Deck {
    // subclass of Deck that constructs a list of rarer cards 
    constructor(id, domRef) {
        super(id, domRef)
        this.cards = this.createDeck()
    }

    createDeck() {
        // create a deck of 30 cards: 10 common, 15 rare, 5 legendary
        const cardsArray = [
            new MoneyCard(31, 'Loot', './assets/images/card-loot.png', 'common', null, 25, 50, 1, null),
            new MoneyCard(32, 'Loot', './assets/images/card-loot.png', 'common', null, 25, 50, 1, null),
            new MoneyCard(33, 'Loot', './assets/images/card-loot.png', 'common', null, 25, 50, 1, null),
            new MoneyCard(34, 'Loot', './assets/images/card-loot.png', 'common', null, 25, 50, 1, null),
            new MoneyCard(35, 'Loot', './assets/images/card-loot.png', 'common', null, 25, 50, 1, null),
            new MoneyCard(36, 'Collection', './assets/images/card-collection.png', 'common', null, 50, 25, null, null),
            new MoneyCard(37, 'Collection', './assets/images/card-collection.png', 'common', null, 50, 25, null, null),
            new MoneyCard(38, 'Collection', './assets/images/card-collection.png', 'common', null, 50, 25, null, null),
            new MoneyCard(39, 'Collection', './assets/images/card-collection.png', 'common', null, 50, 25, null, null),
            new MoneyCard(40, 'Collection', './assets/images/card-collection.png', 'common', null, 50, 25, null, null),
            new MoneyCard(41, 'Tithe', './assets/images/card-tithe.png', 'rare', null, 35, 50, 1, null),
            new MoneyCard(42, 'Tithe', './assets/images/card-tithe.png', 'rare', null, 35, 50, 1, null),
            new MoneyCard(43, 'Tithe', './assets/images/card-tithe.png', 'rare', null, 35, 50, 1, null),
            new MoneyCard(44, 'Tithe', './assets/images/card-tithe.png', 'rare', null, 35, 50, 1, null),
            new MoneyCard(45, 'Tithe', './assets/images/card-tithe.png', 'rare', null, 35, 50, 1, null),
            new MoneyCard(46, 'Tithe', './assets/images/card-tithe.png', 'rare', null, 35, 50, 1, null),
            new MoneyCard(47, 'Tithe', './assets/images/card-tithe.png', 'rare', null, 35, 50, 1, null),
            new MoneyCard(48, 'Tithe', './assets/images/card-tithe.png', 'rare', null, 35, 50, 1, null),
            new MoneyCard(49, 'Rose', './assets/images/card-rose.png', 'rare', null, 75, 200, 1, null),
            new MoneyCard(50, 'Rose', './assets/images/card-rose.png', 'rare', null, 75, 200, 1, null),
            new MoneyCard(51, 'Rose', './assets/images/card-rose.png', 'rare', null, 75, 200, 1, null),
            new MoneyCard(52, 'Rose', './assets/images/card-rose.png', 'rare', null, 75, 200, 1, null),
            new MoneyCard(53, 'Rose', './assets/images/card-rose.png', 'rare', null, 75, 200, 1, null),
            new MoneyCard(54, 'Rose', './assets/images/card-rose.png', 'rare', null, 75, 200, 1, null),
            new MoneyCard(55, 'Rose', './assets/images/card-rose.png', 'rare', null, 75, 200, 1, null),
            new MoneyCard(55, 'Annihilation', './assets/images/card-annihilation.png', 'legendary', null, 150, -500, 1, null),
            new MoneyCard(56, 'Annihilation', './assets/images/card-annihilation.png', 'legendary', null, 150, -500, 1, null),
            new MoneyCard(57, 'Annihilation', './assets/images/card-annihilation.png', 'legendary', null, 150, -500, 1, null),
            new MoneyCard(58, 'Annihilation', './assets/images/card-annihilation.png', 'legendary', null, 150, -500, 1, null),
            new MoneyCard(59, 'Annihilation', './assets/images/card-annihilation.png', 'legendary', null, 150, -500, 1, null)
        ];

        this.shuffle(cardsArray);
        return cardsArray;
    }
}