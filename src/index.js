import React from 'react'
import ReactDOM from 'react-dom'
import Board from './components/board'
import { observeBoard } from './components/game'

const root = document.getElementById('root')



observeBoard((boardPieces, check, checkmate, winner) =>
  ReactDOM.render(<Board boardPieces={boardPieces} check={check} winner={winner} checkmate={checkmate} />, root)
)


