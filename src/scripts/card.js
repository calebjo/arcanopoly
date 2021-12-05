import { Player } from "./player"
// all cards have an id, rarity, and price
// each card will also have a play() method, which can be invoked on the owner's turn

// -----------------------------------------------------------------------------------
// Parent class
export class Card {
    constructor(id, name, img, rarity, owner, price) {
        this.name = name
        this.img = img
        this.rarity = rarity
        this.id = id
        this.owner = owner
        this.price = price
    }
}
// -----------------------------------------------------------------------------------
// Subclasses related to common functionality

export class MoneyCard extends Card {
    // cards that add or subtract gold from 1 or more targets
    constructor(id, name, img, rarity, owner, price, moneyDiff, moneyMod, ...targetPlayers){
        super(id, name, img, rarity, owner, price)
        this.moneyDiff = moneyDiff
        this.moneyMod = moneyMod
        this.targetPlayers = targetPlayers
    }

    // apply the money change to each target
    play(){
        for (let i = 0; i < this.targetPlayers.length; i++){
            this.targetPlayers[i].moneyChange(this.moneyDiff * this.moneyMod)
        }
    }
}

export class PropertyCard extends Card {
    // cards that give or take properties from players
    constructor(id, name, img, rarity, owner, price, propertyTarget, ...targetPlayers){
        super(id, name, img, rarity, owner, price)
        this.propertyTarget = propertyTarget
        this.targetPlayers = targetPlayers
    }

    play(){
        for (let i = 0; i < this.targetPlayers.length; i++){
            this.targetPlayers[i].moneyChange(this.moneyDiff * this.moneyMod)
        }
    }
}

export class MovementCard extends Card {
    // cards that move the target to a certain square (including self)
    constructor(id, name, img, rarity, owner, price, targetSquare, targetPlayer){
        super(id, name, img, rarity, owner, price)
        this.targetSquare = targetSquare
        this.targetPlayer = targetPlayer
    }

    play() {
        targetPlayer.movePlayer
    }
}

export class ModifierCard extends Card {
    // cards that modify an existing stat, like the rent of properties
    constructor(id, name, img, rarity, owner, price, targetStat, modifier, timer){
        super(id, name, img, rarity, owner, price)
        this.targetStat = targetStat
        this.modifier = modifier
        this.timer = timer
    }
}
// -----------------------------------------------------------------------------------
// Specific Cards
// Each card inherits an id, owner, price from Card
// Each card should have a name, rarity, price of its own
// the play() methods that are inherited should work for every subclass Card

// MONEY CARDS
//new MoneyCard(id, name, img, rarity, owner, price, moneyDiff, moneyMod, ...targetPlayers)
// new MoneyCard(1, 'Loot', img, 'common', null, price, 50, 1, null)
// new MoneyCard(2, 'Collection', img, 'common', null, price, 25, moneyMod, null)
// new MoneyCard(3, 'Tithe', img, 'rare', null, price, moneyDiff, moneyMod, null)
// new MoneyCard(4, 'Rose', img, 'rare', null, price, moneyDiff, moneyMod, null)
// new MoneyCard(4, 'Annihilation', './assets/images/card-annihilation.svg', legendary, null, price, 1000, moneyMod, null)

