import React from "react";
import Tile from "./tile";
import Knight from "./pieces/knight";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import '../assets/styles/board.css';
import { moveKnight, canMoveKnight } from "./game";

export default function Board({ boardPieces }) {

    function renderSquare(x, y, boardPieces) {
        const black = (x + y) % 2 === 1;
        
        let pieceColor = null;
        let isKnightHere = null;
        Object.keys(boardPieces).forEach(piece => {
            boardPieces[piece].forEach((pieceInfo, i) => {
                if (x === pieceInfo[0] && y === pieceInfo[1]) {
                    isKnightHere = true;
                    pieceColor = pieceInfo[2];
                }
            })
        })
        
        const piece = isKnightHere ? <Knight pieceColor={pieceColor}  pos={[x, y]} /> : null;

        return <div><Tile x={x} y={y} black={black}>{piece}</Tile></div>
    }

    

    function renderBoard() {
        let board = [];
      
        for (let i = 0; i < 8; i++) {
            let row = [];
            for (let j = 0; j < 8; j++) {
                row.push(renderSquare(i, j, boardPieces));
            }
            board.push(row);
        }
        return board;
    }
    
    
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="board-container">
                {renderBoard()}
            </div>
        </DndProvider>
        )
}