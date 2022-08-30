import React from 'react'
import { useDrop } from 'react-dnd'
import '../assets/styles/tile.css'


export default function Tile({ child }) {

  const [, drop] = useDrop(
    () => ({
      accept: 'piece'
    })
  )

  return (
    <div ref={drop} className='tile-container'>
        {child}
    </div>
  )
}
