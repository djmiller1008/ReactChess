import React from 'react'
import ReactDOM from 'react-dom'
import Board from './components/board'
import { observeBoard } from './components/game'

const root = document.getElementById('root')

observeBoard((boardPieces) =>
  ReactDOM.render(<Board boardPieces={boardPieces} />, root)
)


