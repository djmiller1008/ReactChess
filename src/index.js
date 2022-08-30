import React from 'react'
import ReactDOM from 'react-dom'
import Board from './components/board'
import { observeBoard } from './components/game'

const root = document.getElementById('root')

observeBoard((knightPositions) =>
  ReactDOM.render(<Board knightPositions={knightPositions} />, root)
)


