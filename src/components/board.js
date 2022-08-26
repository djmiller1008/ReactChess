import React, { useState } from 'react'
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
  

  const renderBoard = () => {
    let board = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
        const row = renderRow(i);
        board.push(row);
    }
    return board;
  }
  
  const renderRow = (rowNumber) => {
    let row = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
        if (rowNumber === 0) {
            if (i === 0 || i === 7) {
                row.push(<Rook color={'black'} img={BlackRook} />)
            } else if (i === 1 || i === 6) {
                row.push(<Knight color={'black'} img={BlackKnight} />)
            } else if (i === 2 || i === 5) {
                row.push(<Bishop color={'black'} img={BlackBishop} />)
            } else if (i === 3) {
                row.push(<Queen color={'black'} img={BlackQueen} />)
            } else if (i === 4) {
                row.push(<King color={'black'} img={BlackKing} />)
            }
        } else if (rowNumber === 1) {
            row.push(<Pawn color={'black'} img={BlackPawn} />)
        } else if (rowNumber === 6) {
            row.push(<Pawn color={'white'} img={WhitePawn} />)
        } else if (rowNumber === 7) {
            if (i === 0 || i === 7) {
                row.push(<Rook color={'white'} img={WhiteRook} />)
            } else if (i === 1 || i === 6) {
                row.push(<Knight color={'white'} img={WhiteKnight} />)
            } else if (i === 2 || i === 5) {
                row.push(<Bishop color={'white'} img={WhiteBishop} />)
            } else if (i === 3) {
                row.push(<Queen color={'white'} img={WhiteQueen} />)
            } else if (i === 4) {
                row.push(<King color={'white'} img={WhiteKing} />)
            }
        } else {
            row.push(<Tile />)
        }
    }
    return <div className='row-container'>{row}</div>;
  }

  return (
    <div className='board-container'>
        {renderBoard()}
    </div>
  )
}
