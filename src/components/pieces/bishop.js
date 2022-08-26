import React from 'react'
import '../../assets/styles/tile.css';

export default function Bishop({ color, img }) {
  return (
    <div className='tile-container'>
        <img className='chess-piece-image' src={img} alt='Bishop' />
    </div>
  )
}
