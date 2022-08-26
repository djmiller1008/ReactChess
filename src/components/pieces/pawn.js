import React from 'react'
import { useDrag } from 'react-dnd';
import '../../assets/styles/tile.css';

export default function Pawn({ color, img }) {

 

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'piece',
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  return (

      <img ref={drag} className='chess-piece-image' src={img} alt='Pawn' />
 
  )
}
