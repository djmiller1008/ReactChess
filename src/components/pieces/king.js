import React from 'react'
import { DragPreviewImage, useDrag } from 'react-dnd';
import WhiteKing from './images/whiteKing.svg';
import BlackKing from './images/blackKing.svg';
import '../../assets/styles/tile.css';

export default function King({ pieceColor, pos }) {

  const [ ,drag, preview] = useDrag(() => ({
    type: 'piece',
    item: { pos, pieceColor, piece: 'king'}
  }));

  const src = pieceColor === 'white' ? WhiteKing : BlackKing;

  return (
    <>
      <DragPreviewImage connect={preview} src={src} />
      <img ref={drag} className='piece-image' src={src} alt='King' />
    </>
  )
}
