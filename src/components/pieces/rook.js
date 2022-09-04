import React from 'react'
import { DragPreviewImage, useDrag } from 'react-dnd';
import WhiteRook from './images/whiteRook.svg';
import BlackRook from './images/blackRook.svg';
import '../../assets/styles/tile.css';

export default function Rook({ pieceColor, pos }) {

  const [ , drag, preview] = useDrag(() => ({
    type: 'piece',
    item: { pos, pieceColor, piece: 'rook' }
  }));

  const src = pieceColor === 'white' ? WhiteRook : BlackRook;

  return (
    <>
      <DragPreviewImage connect={preview} src={src} />
      <img ref={drag} className='piece-image' src={src} alt='Rook' />
    </>
  )
}
