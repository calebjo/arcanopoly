// all equipment have an id, name, img, rarity, owner, and price
// Each equipment will either be a StatEquipment or an EventEquipment
// StatEquipment change some statistic of the player's, like dice total or reroll total
// EventEquipment (most equipment) change some property or event to the player's benefit

export class Equipment {
    constructor(name, img, rarity, owner, price){
        this.id = Math.floor(Math.random() * 100000)
        this.name = name
        this.img = img
        this.rarity = rarity
        this.owner = owner
        this.price = price
    }

    addToScreen(){
        console.log(`Adding ${this.name} to the screen.`)
    }
    removeFromScreen(){
        console.log(`Removing ${this.name} from the screen.`)
    }

    addToScreen(){
        // adds this card to the cards that display on the board
        console.log('In addToScreen()')
        const myHand = document.getElementsByClassName('player-equipment')[0]
        const newCardEle = document.createElement('div')
        newCardEle.classList.add('my-card')
        newCardEle.setAttribute('id', `card-${this.id}`)
        const newCardEmbed = document.createElement('embed')
        newCardEmbed.setAttribute('src', `${this.img}`)
        newCardEle.appendChild(newCardEmbed)
        // append newly created card div
        myHand.appendChild(newCardEle)
    }

    removeFromScreen(){
        // removes this card from the cards that display on the board
        console.log('In removeFromScreen()')
        const thisCardEle = document.getElementById(`card-${this.id}`)
        thisCardEle.remove()
    }
}

// EQUIPMENT LIST ---------------------
// --- COMMON
// Bard's Lyre
// Bountiful Ring
// Elven Boots
// Pointy Stick

// ---- RARE
// Holy Shield          -- HARD
// Luck Potion
// Thieves' Lockpick    -- HARD

// ---- LEGENDARY
// King's Crown
// -------------------------------------