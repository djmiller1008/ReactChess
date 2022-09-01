import React from 'react'
import { DragPreviewImage, useDrag } from 'react-dnd';
import WhiteKnight from './images/whiteKnight.svg';
import BlackKnight from './images/blackKnight.svg';
import '../../assets/styles/tile.css';

export default function Knight({ pieceColor, pos }) {
 

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: 'piece',
    item: { pos, pieceColor, piece: 'knight' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  const src = pieceColor === 'white' ? WhiteKnight : BlackKnight;
  
  return (
    <>
        <DragPreviewImage connect={preview} src={src}></DragPreviewImage>
        <img ref={drag} src={src} alt='Knight'  className='piece-image'></img>
    </>
  )
}
