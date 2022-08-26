import React from 'react'
import '../../assets/styles/tile.css';

export default function Pawn({ color, img }) {
  return (
    <div className='tile-container'>
        <img className='chess-piece-image' src={img} alt='Pawn' />
    </div>
  )
}
