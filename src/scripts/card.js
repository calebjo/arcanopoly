// all cards have an id, rarity, and price
// each card will also have a play() method, which can be invoked on the owner's turn

// -----------------------------------------------------------------------------------
// Parent class
export class Card {
    constructor(id, rarity, price)
}
// -----------------------------------------------------------------------------------
// Subclasses related to common functionality

export class MoneyCard extends Card {
    // cards that add or subtract gold from 1 or more targets
}

export class MovementCard extends Card {
    // cards that move the target to a certain square (including self)
}

export class ModifierCard extends Card {
    // cards that modify an existing stat, like the rent of properties
}
// -----------------------------------------------------------------------------------
// Specific Card classes
export class BalanceCard extends Card {
    
}