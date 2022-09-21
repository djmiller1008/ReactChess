import React from "react";
import Tile from "./tile";
import Knight from "./pieces/knight";
import Bishop from "./pieces/bishop";
import Rook from "./pieces/rook";
import Queen from "./pieces/queen";
import King from "./pieces/king";
import Pawn from "./pieces/pawn";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import '../assets/styles/board.css';

export default function Board({ boardPieces, check, checkmate, winner }) {

    function renderSquare(x, y, boardPieces) {
        const black = (x + y) % 2 === 1;
        
        let pieceColor = null;
        let pieceComponent = null;
        Object.keys(boardPieces).forEach(piece => {
            boardPieces[piece].forEach((pieceInfo, i) => {
                if (x === pieceInfo[0] && y === pieceInfo[1]) {
                    pieceColor = pieceInfo[2];
                    if (piece === 'knight') {
                        pieceComponent = <Knight pieceColor={pieceColor}  pos={[x, y]} />
                    } else if (piece === 'bishop') {
                        pieceComponent = <Bishop pieceColor={pieceColor} pos={[x, y]} />
                    } else if (piece === 'rook') {
                        pieceComponent = <Rook pieceColor={pieceColor} pos={[x, y]} />
                    } else if (piece === 'queen') {
                        pieceComponent = <Queen pieceColor={pieceColor} pos={[x, y]} />
                    } else if (piece === 'king') {
                        pieceComponent = <King pieceColor={pieceColor} pos={[x, y]} />
                    } else if (piece === 'pawn') {
                        pieceComponent = <Pawn pieceColor={pieceColor} pos={[x, y]} />
                    }
                }
            })
        })
        
        const piece = pieceComponent ? pieceComponent : null;

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
    
    let checkMessage = check ? 'Check!' : '';
    let checkmateMessage = checkmate ? 'Checkmate!' : '';
    let winningMessage = '';
    if (winner === 'white') {
        winningMessage = 'White is the winner!';
    } else if (winner === 'black') {
        winningMessage = 'Black is the winner!';
    }
   
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="game-container">
                <h1 className="title">React Chess</h1>

                <section className="game-area">
                    <div className="board-container">
                        {renderBoard()}
                    </div>
                    <p className="message-box">
                        {checkMessage}
                        {checkmateMessage}
                        {winningMessage}
                    </p>
                   
                </section>
                
            </div>
            
        </DndProvider>
        )
}