import React from 'react'
import '../../assets/styles/tile.css';

export default function King({ color, img }) {
  return (
    <div className='tile-container'>
        <img className='chess-piece-image' src={img} alt='King' />
    </div>
  )
}
