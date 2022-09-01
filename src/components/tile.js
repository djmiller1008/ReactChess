import React from 'react'
import { useDrop } from 'react-dnd';
import '../assets/styles/tile.css'
import { canMovePiece, movePiece } from './game';




export default function Tile({ x, y, black, children }) {

  const [{ canDrop }, drop] = useDrop(
    () => ({
      accept: 'piece',
      drop: (item) => movePiece(x, y, item),
      canDrop: (item) => canMovePiece(x, y, item),
      collect: (monitor) => ({
        canDrop: !!monitor.canDrop(),
       
      })
    }),
    [x, y]
  )
 
  const fill = black ? 'brown' : 'white';
  const stroke = black ? 'white' : 'brown';

  return (
    <div ref={drop} style={{backgroundColor: canDrop ? 'yellow' : fill, color: stroke }} className='tile-container'>
        {children}
    </div>
  )
}
