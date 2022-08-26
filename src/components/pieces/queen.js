import React from 'react'
import '../../assets/styles/tile.css';

export default function Queen({ color, img }) {
  return (
  
    <img className='chess-piece-image' src={img} alt='Queen' />
    
  )
}
