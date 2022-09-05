import React from 'react'
import { DragPreviewImage, useDrag } from 'react-dnd';
import WhiteQueen from './images/whiteQueen.svg';
import BlackQueen from './images/blackQueen.svg';
import '../../assets/styles/tile.css';

export default function Queen({ pieceColor, pos }) {

  const [ ,drag, preview] = useDrag(() => ({
    type: 'piece',
    item: { pos, pieceColor, piece: 'queen'}
  }));

  const src = pieceColor === 'white' ? WhiteQueen : BlackQueen;

  return (
  <>
    <DragPreviewImage connect={preview} src={src} />
    <img ref={drag} className='piece-image' src={src} alt='Queen' />
  </>  
  )
}
