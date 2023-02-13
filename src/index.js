import React from 'react'
import ReactDOM from 'react-dom/client'
import Board from './components/board'
import { observeBoard } from './components/game'

const root = ReactDOM.createRoot(document.getElementById("root"));



observeBoard((boardPieces, check, checkmate, winner, promotionColor, promotionHidden, promotionXY) =>
  root.render(<Board boardPieces={boardPieces} check={check} winner={winner} checkmate={checkmate}
                          promotionColor={promotionColor} promotionHidden={promotionHidden} promotionXY={promotionXY} />)
)


