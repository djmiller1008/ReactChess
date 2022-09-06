import React from 'react'
import { DragPreviewImage, useDrag } from 'react-dnd';
import WhitePawn from './images/whitePawn.svg';
import BlackPawn from './images/blackPawn.svg';
import '../../assets/styles/tile.css';


export default function Pawn({ pieceColor, pos }) {

  const [ ,drag, preview] = useDrag(() => ({
    type: 'piece',
    item: { pos, pieceColor, piece: 'pawn'}
  }));

  const src = pieceColor === 'white' ? WhitePawn : BlackPawn;

  return (
    <>
      <DragPreviewImage connect={preview} src={src} />
      <img ref={drag} className='piece-image' src={src} alt='Pawn' />
    </>
  )
}
