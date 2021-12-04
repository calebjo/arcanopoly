
// The board should be an array containing all of the squares (node objects)

import { Square } from "./square";
import { TavernSquare } from "./square";
import { TomeSquare } from "./square";
import { DungeonSquare } from "./square";
import { MovementSquare } from "./square";
import { PropertySquare } from "./square";
import { ShopSquare } from "./square";
import { CastleSquare } from "./square";
import { DeckSquare } from "./square";

// constructor that calls createBoard

// createBoard function that maps the DOM elements to Square node objects

export class Board {
    constructor(){
        this.squares = this.createBoard()
    }

    createBoard(){
        // returns an array from 0-39 of all of the board squares
        const newBoard = [];

        // Manually construct each square, adding each square to the newBoard
        const sq0 = document.getElementById('sq-0')
        newBoard.push(new TavernSquare(0, sq0, []))
        const sq1 = document.getElementById('sq-1')
        newBoard.push(new PropertySquare(1, sq1, []))
        const sq2 = document.getElementById('sq-2')
        newBoard.push(new PropertySquare(2, sq2, []))
        const sq3 = document.getElementById('sq-3')
        newBoard.push(new PropertySquare(3, sq3, []))
        const sq4 = document.getElementById('sq-4')
        newBoard.push(new PropertySquare(4, sq4, []))
        const sq5 = document.getElementById('sq-5')
        newBoard.push(new PropertySquare(5, sq5, []))
        const sq6 = document.getElementById('sq-6')
        newBoard.push(new PropertySquare(6, sq6, []))
        const sq7 = document.getElementById('sq-7')
        newBoard.push(new PropertySquare(7, sq7, []))
        const sq8 = document.getElementById('sq-8')
        newBoard.push(new PropertySquare(8, sq8, []))
        const sq9 = document.getElementById('sq-9')
        newBoard.push(new PropertySquare(9, sq9, []))
        const sq10 = document.getElementById('sq-10')
        newBoard.push(new DungeonSquare(10, sq10, []))
        const sq11 = document.getElementById('sq-11')
        newBoard.push(new PropertySquare(11, sq11, []))
        const sq12 = document.getElementById('sq-12')
        newBoard.push(new PropertySquare(12, sq12, []))
        const sq13 = document.getElementById('sq-13')
        newBoard.push(new PropertySquare(13, sq13, []))
        const sq14 = document.getElementById('sq-14')
        newBoard.push(new PropertySquare(14, sq14, []))
        const sq15 = document.getElementById('sq-15')
        newBoard.push(new PropertySquare(15, sq15, []))
        const sq16 = document.getElementById('sq-16')
        newBoard.push(new PropertySquare(16, sq16, []))
        const sq17 = document.getElementById('sq-17')
        newBoard.push(new PropertySquare(17, sq17, []))
        const sq18 = document.getElementById('sq-18')
        newBoard.push(new PropertySquare(18, sq18, []))
        const sq19 = document.getElementById('sq-19')
        newBoard.push(new PropertySquare(19, sq19, []))
        const sq20 = document.getElementById('sq-20')
        newBoard.push(new TomeSquare(20, sq20, []))
        const sq21 = document.getElementById('sq-21')
        newBoard.push(new PropertySquare(21, sq21, []))
        const sq22 = document.getElementById('sq-22')
        newBoard.push(new PropertySquare(22, sq22, []))
        const sq23 = document.getElementById('sq-23')
        newBoard.push(new PropertySquare(23, sq23, []))
        const sq24 = document.getElementById('sq-24')
        newBoard.push(new PropertySquare(24, sq24, []))
        const sq25 = document.getElementById('sq-25')
        newBoard.push(new PropertySquare(25, sq25, []))
        const sq26 = document.getElementById('sq-26')
        newBoard.push(new PropertySquare(26, sq26, []))
        const sq27 = document.getElementById('sq-27')
        newBoard.push(new PropertySquare(27, sq27, []))
        const sq28 = document.getElementById('sq-28')
        newBoard.push(new PropertySquare(28, sq28, []))
        const sq29 = document.getElementById('sq-29')
        newBoard.push(new PropertySquare(29, sq29, []))
        const sq30 = document.getElementById('sq-30')
        newBoard.push(new MovementSquare(30, sq30, []))
        const sq31 = document.getElementById('sq-31')
        newBoard.push(new PropertySquare(31, sq31, []))
        const sq32 = document.getElementById('sq-32')
        newBoard.push(new PropertySquare(32, sq32, []))
        const sq33 = document.getElementById('sq-33')
        newBoard.push(new PropertySquare(33, sq33, []))
        const sq34 = document.getElementById('sq-34')
        newBoard.push(new PropertySquare(34, sq34, []))
        const sq35 = document.getElementById('sq-35')
        newBoard.push(new PropertySquare(35, sq35, []))
        const sq36 = document.getElementById('sq-36')
        newBoard.push(new PropertySquare(36, sq36, []))
        const sq37 = document.getElementById('sq-37')
        newBoard.push(new PropertySquare(37, sq37, []))
        const sq38 = document.getElementById('sq-38')
        newBoard.push(new PropertySquare(38, sq38, []))
        const sq39 = document.getElementById('sq-39')
        newBoard.push(new PropertySquare(39, sq39, []))
        
        return newBoard;
    }
}