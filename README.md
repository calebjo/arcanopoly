# Background

Arcanopoly is a variation on the classic friendship-testing board game Monopoly that adds 'Roguelike' elements! The game is fantasy-themed and players traverse a board filled with fantasy location names. Players can pick up cards and equipment that drastically alter the normal Monopoly game. Now you can ruin the family get together even worse than before!

# Functionality & MVPs

In a game of Arcanopoly, users will be able to:
* Select a token to use as a character sprite
* Roll dice to traverse a circular board full of properties
* Buy and sell properties, draw cards, and gain equipment (_very basic cards/equipment for the MVP_)
* Play cards on their turn to benefit themselves or hinder an opponent

The project will also include:
* An instructions tab that details the rules and interactions players can perform.
* A production README

# Mockup
![arcanopoly mockup image](https://i.imgur.com/N1lNQD8.png)

* Central game board with squares
* Dice rolling (not pictured) in the center of the board between decks
* Card decks and player's hand in the center
* List of players on the left, generated with JS
* Properties, game history, and "chat window" (_you'll be talking to robots if I don't add multiplayer_)

# Technologies, Libraries, APIs

Arcanopoly will be implemented with the following (_tentative_) technologies:
* Webpack and NPM for project JS bundling and management.
* [Matter.js](https://brm.io/matter-js/) for object physics simulation.
* <span style="color:purple">(_BONUS FEATURE_)</span> [Howler.js](https://howlerjs.com/) for any and all music and sounds.
* <span style="color:purple">(_BONUS FEATURE_)</span> Colyseus.io for multiplayer game hosting with Node.js.

# Implementation Timeline

* **Thursday(PM):** Finish final proposal.
* **Thursday(PM) - Friday:** Create project base files/directories. Create static html and css framework for empty board with suitable tags for JS manipulation.
* **Saturday - Sunday:** Create overall game logic in JS with no frills. Allow players to roll dice, move to square, buy square, etc.
* **Sunday - Monday:** Implement card and equipment logic into the vanilla Monopoly game. Start with extremely basic cards (_effectively community chest/chance to start_). Finalize any remaining vanilla Monopoly logic.
* **Tuesday - Wednesday:** CSS! JS! Visuals!!! Add animations, transitions, JS tooltips. Make UI/UX decent enough to show to peers. Start easier bonus goals if able.
* **Wednesday - Thursday(AM):** Add bonus goals if possible based on the "Bonus features" table below. Deploy to github if no backend, heroku if backend. Make production README.

# Bonus features

* Add bonus features according to difficulty (easiest first):

| Feature Name | Difficulty | Description |
| ------------ | ---------- | ----------- |
| Music/Sounds | <span style="color:green">**Easy-ish** </span>| Use [Howler.js](https://howlerjs.com/) to add ambient music and sound effects to player actions. |
| Less terrible AI | <span style="color:yellow">**Medium** </span> | Instead of random decisions, make computer players somewhat intelligent about properties, cards, and other players.|
| Add Cards/Equipment | <span style="color:orange">**Medium-hard** </span> | Add additional, more complex cards and equipment. OOP FTW! |
| Add Options | <span style="color:orange">**Medium-hard** </span> | Add game options to the start of any game (this might actually be fairly easy, just low priority).
| Online Multiplayer | <span style="color:red">**Very Hard** </span> | Add support for actual human players via [Colyseus.io's](https://www.colyseus.io/) server setup process. Deploy on Heroku. |
