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
    
    addIconToScreen(){
        // adds this card to the cards that display on the board
        console.log('In Equipment.addIconToScreen()')


        const newEquipEle = document.createElement('div')
        newEquipEle.classList.add('p-equip')
        newEquipEle.setAttribute('id', `equip-${this.id}`)

        const newEquipEmbed = document.createElement('embed')
        newEquipEmbed.setAttribute('src', `${this.img}`)
        newEquipEle.appendChild(newEquipEmbed)

        const thisPlayerBar = document.getElementById(`p${this.owner.turnId}`)
        const thisPlayerEquip = thisPlayerBar.children[2].children[2]
        // append newly created card div
        thisPlayerEquip.appendChild(newEquipEle)
    }
}

export class BootsEquipment extends Equipment {
    constructor(name, img, rarity, owner, price){
        // this.id = Math.floor(Math.random() * 100000)
        super(name, img, rarity, owner, price)
    }

    addToPlayer(player){
        player.diceNum += 1
    }

    removeFromPlayer(player){
        player.diceNum -= 1
    }
}

export class HatEquipment extends Equipment {
    constructor(name, img, rarity, owner, price){
        // this.id = Math.floor(Math.random() * 100000)
        super(name, img, rarity, owner, price)
    }

    addToPlayer(player){
        player.rerolls += 1
    }

    removeFromPlayer(player){
        player.rerolls -= 1
    }
}

export function giveTempEquipment(player){
    const boots = new BootsEquipment("Elven Boots", './assets/images/equip-boots.png', 'common', null, 250)
    // const charm = new BootsEquipment("Bountiful Charm", './assets/images/equip-charm.png', 'common', player, 250)
    // const crown = new BootsEquipment("King's Crown", './assets/images/equip-crown.png', 'legendary', player, 600)
    const hat = new HatEquipment("Wizard's Hat", './assets/images/equip-hat.png', 'common', null, 250)
    // const sword = new BootsEquipment("Pointy Stick", './assets/images/equip-sword.png', 'common', player, 250)

    const equipArr = [boots, hat];
    const randomEquip = equipArr[Math.round(Math.random())]; // give the boots or the hat
    player.equipment.push(boots);
    boots.owner = player;
    boots.addToPlayer(player);
    boots.addIconToScreen();
    console.log(`You've been given the ${boots.name}!`)
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