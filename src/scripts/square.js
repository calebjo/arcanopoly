
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