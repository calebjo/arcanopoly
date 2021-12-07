
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
    constructor(position, domRef, playersOn, name, price, rent, group, owned, owner, mortgaged){
        super(position, domRef, playersOn)
        this.name = name
        this.price = price
        this.rent = rent
        this.group = group
        this.owned = owned
        this.owner = owner
        this.mortgaged = mortgaged
    }

    addToScreen() {
        const thisPlayerProperties = document.getElementsByClassName('my-prop-list')[0]
        // add to DOM
        const newProp = document.createElement('div')
        newProp.classList.add('my-property')
        newProp.setAttribute('id', `${this.position}`) // id is the property square's position
        const newPropName = document.createElement('div')
        newPropName.classList.add('my-prop-name')
        newPropName.innerText = `${this.name}`;
        newProp.appendChild(newPropName)

        // append children (image and price) to info
        const newPropInfo = document.createElement('div')
        newPropInfo.classList.add('my-prop-info')
        const newPropImage = document.createElement('div')
        newPropImage.classList.add('my-prop-image')
        const newPropImageEmbed = document.createElement('embed')
        const embedSrc = this.domRef.children[0].getAttribute('src')
        newPropImageEmbed.setAttribute('src', `${embedSrc}`)
        newPropImage.appendChild(newPropImageEmbed)
        
        newPropInfo.appendChild(newPropImage)
        const newPropPrice = document.createElement('div')
        newPropPrice.classList.add('my-prop-price')
        newPropPrice.innerText = `${this.price}`;
        newPropInfo.appendChild(newPropPrice)

        newProp.appendChild(newPropInfo)
        thisPlayerProperties.appendChild(newProp)
    }

    removeFromScreen() {
        const thisPlayerProperties = document.getElementsByClassName('my-prop-list')[0]
        const thisProperty = document.getElementById(`${this.position}`)
        thisPlayerProperties.removeChild(thisProperty)
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
    constructor(position, domRef, playersOn, deckType, deckRef){
        super(position, domRef, playersOn)
        this.deckType = deckType
        this.deckRef = deckRef
    }
}