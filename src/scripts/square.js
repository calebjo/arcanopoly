
// A square should be a node object corresponding to a static DOM element

// Instance variables should include:
// domRef : the DOM element that the square refers to
// type   : string that is one of the following:
//            ['tavern', 'property', 'shop', 'movement', 'castle', 'tome', 'dungeon']
// owner  : the instance of the player that owns the square (only for properties). null if unowned
// ------------------------------------------------------------------------------------------------
// Various subclasses of square:
// NOTE: each subclass should hold logic for what happens when a player lands on the square
// tavernSquare
// tomeSquare
// dungeonSquare
// movementSquare
// propertySquare
// shopSquare
// castleSquare
// ------------------------------------------------------------------------------------------------

export class Square {
    constructor(position, domRef, playersOn){
        this.position = position
        this.domRef = domRef
        this.playersOn = playersOn
    }
}

export class TavernSquare extends Square {
    constructor(position, domRef, playersOn){
        super(position, domRef, playersOn)
    }
}

export class TomeSquare extends Square {
    constructor(position, domRef, playersOn){
        super(position, domRef, playersOn)
    }
}

export class DungeonSquare extends Square {
    constructor(position, domRef, playersOn, visitors, prisoners){
        super(position, domRef, playersOn)
        this.visitors = visitors
        this.prisoners = prisoners
    }
}

export class MovementSquare extends Square {
    constructor(position, domRef, playersOn, moveType){
        super(position, domRef, playersOn)
        this.moveType = moveType
    }
}

export class PropertySquare extends Square {
    constructor(position, domRef, playersOn, price, group, owned, mortgaged){
        super(position, domRef, playersOn)
        this.price = price
        this.group = group
        this.owned = owned
        this.mortgaged = mortgaged
    }
}

export class ShopSquare extends Square {
    constructor(position, domRef, playersOn){
        super(position, domRef, playersOn)
    }
}

export class CastleSquare extends Square {
    constructor(position, domRef, playersOn){
        super(position, domRef, playersOn)
    }
}

export class DeckSquare extends Square {
    constructor(position, domRef, playersOn, deck){
        super(position, domRef, playersOn)
        this.deck = deck
    }
}