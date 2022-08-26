import React, { useEffect, useState } from 'react'
import Rook from './pieces/rook';
import Knight from './pieces/knight';
import Bishop from './pieces/bishop';
import Queen from './pieces/queen';
import Pawn from './pieces/pawn';
import King from './pieces/king';
import Tile from './tile';
import BlackPawn from '../assets/images/Pawn_black.svg';
import BlackKing from '../assets/images/King_black.svg';
import BlackQueen from '../assets/images/Queen_black.svg';
import BlackBishop from '../assets/images/Bishop_black.svg';
import BlackKnight from '../assets/images/Knight_black.svg';
import BlackRook from '../assets/images/Rook_black.svg';
import WhitePawn from '../assets/images/Pawn_white.svg';
import WhiteRook from '../assets/images/Rook_white.svg';
import WhiteKnight from '../assets/images/Knight_white.svg';
import WhiteBishop from '../assets/images/Bishop_white.svg';
import WhiteQueen from '../assets/images/Queen_white.svg';
import WhiteKing from '../assets/images/King_white.svg';
import '../assets/styles/board.css';

const BOARD_SIZE = 8;

export default function Board() {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    setupBoard();
  }, []);
  

  const setupBoard = () => {
    let grid = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
        const row = setupRow(i);
        grid.push(row);
    }
    setBoard(grid);
  }
  
  const setupRow = (rowNumber) => {
    let row = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
        if (rowNumber === 0) {
            if (i === 0 || i === 7) {
                row.push(<Tile child={<Rook color='black' img={BlackRook} />}></Tile>)
            } else if (i === 1 || i === 6) {
                row.push(<Tile child={<Knight color='black' img={BlackKnight} />}></Tile>)
            } else if (i === 2 || i === 5) {
                row.push(<Tile child={<Bishop color='black' img={BlackBishop} />}></Tile>)
            } else if (i === 3) {
                row.push(<Tile child={<Queen color='black' img={BlackQueen} />}></Tile>)
            } else if (i === 4) {
                row.push(<Tile child={<King color='black' img={BlackKing} />}></Tile>)
            }
        } else if (rowNumber === 1) {
            row.push(<Tile child={<Pawn color='black' img={BlackPawn} />}> </Tile>)
        } else if (rowNumber === 6) {
            row.push(<Tile child={<Pawn color='white' img={WhitePawn} />}> </Tile>)
        } else if (rowNumber === 7) {
            if (i === 0 || i === 7) {
                row.push(<Tile child={<Rook color='white' img={WhiteRook} />}></Tile>)
            } else if (i === 1 || i === 6) {
                row.push(<Tile child={<Knight color='white' img={WhiteKnight} />}></Tile>)
            } else if (i === 2 || i === 5) {
                row.push(<Tile child={<Bishop color='white' img={WhiteBishop} />}></Tile>)
            } else if (i === 3) {
                row.push(<Tile child={<Queen color='white' img={WhiteQueen} />}></Tile>)
            } else if (i === 4) {
                row.push(<Tile child={<King color='white' img={WhiteKing} />}></Tile>)
            }
        } else {
            row.push(<Tile child={null} position={[rowNumber, i]} key={i} />)
        }
    }
    return <div key={rowNumber} className='row-container'>{row}</div>;
  }

  return (
    <div className='board-container'>
        {board}
    </div>
  )
}
