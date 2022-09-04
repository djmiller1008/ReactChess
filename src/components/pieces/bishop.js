import React from 'react'
import { DragPreviewImage, useDrag } from 'react-dnd';
import WhiteBishop from './images/whiteBishop.svg';
import BlackBishop from './images/blackBishop.svg';
import '../../assets/styles/tile.css';

export default function Bishop({ pieceColor, pos }) {

   
 
    const [ ,drag, preview] = useDrag(() => ({
      type: 'piece',
      item: { pos, pieceColor, piece: 'bishop' }
    }));

  


  const src = pieceColor === 'white' ? WhiteBishop : BlackBishop;
 

  return (
    <>
      <DragPreviewImage connect={preview} src={src} />
      <img ref={drag} src={src} alt='Bishop' className='piece-image' />
    </>
  )
}
