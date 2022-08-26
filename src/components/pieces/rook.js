import React from 'react'
import '../../assets/styles/tile.css';

export default function Rook({ color, img }) {


  return (
    <div className='tile-container'>
        <img className='chess-piece-image' src={img} alt='Rook' />
    </div>
  )
}
