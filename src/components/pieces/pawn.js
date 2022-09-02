import React from 'react'
import '../../assets/styles/tile.css';


export default function Pawn({ color, img }) {

  return (

      <img className='chess-piece-image' src={img} alt='Pawn' />
 
  )
}
