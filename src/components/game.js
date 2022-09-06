let boardPieces = {
  knight: [[0, 1, 'black'], [0, 6, 'black'], [7, 1, 'white'], [7, 6, 'white']],
  bishop: [[0, 2, 'black'], [0, 5, 'black'], [7, 2, 'white'], [7, 5, 'white']],
  rook: [[0, 0, 'black'], [0, 7, 'black'], [7, 0, 'white'], [7, 7, 'white']],
  queen: [[0, 3, 'black'], [7, 3, 'white']],
  king: [[0, 4, 'black'], [7, 4, 'white']],
  pawn: [[1, 0, 'black'], [1, 1, 'black'], [1, 2, 'black'], [1, 3, 'black'], [1, 4, 'black'],
          [1, 5, 'black'], [1, 6, 'black'], [1, 7, 'black'], [6, 0, 'white'], [6, 1, 'white'],
          [6, 2, 'white'], [6, 3, 'white'], [6, 4, 'white'], [6, 5, 'white'], [6, 6, 'white'],
          [6, 7, 'white']]
}

let observer = null

let turn = 'white';

function emitChange() {
  return observer(boardPieces)
}

export function observeBoard(update) {
  if (observer) {
    throw new Error('Multiple observers not implemented.')
  }
  observer = update
  emitChange()
}

export function movePiece(toX, toY, originalInfo) {
  let index;
  let pieceColor;


  // Loop to find the moving piece in the data struct boardPieces
  // Find index and the piececolor 
  boardPieces[originalInfo.piece].forEach((pos, i) => {          
    if (pos[0] === originalInfo.pos[0] && pos[1] === originalInfo.pos[1]) {
        pieceColor = pos[2];
        index = i;
    }
  });

  
  if (!isFriendlyPiece(toX, toY, pieceColor) && isPlayerTurn(pieceColor)) {
    willCapturePiece(toX, toY, originalInfo, pieceColor);
  
    boardPieces[originalInfo.piece][index] = [toX, toY, pieceColor];
    switchTurns();

    emitChange();
  }
 

}

function isPlayerTurn(pieceColor) {
  if (turn === pieceColor) {
    return true;
  } else {
    alert(`It is ${turn}'s turn`);
    return false;
  }
}

function switchTurns() {
  if (turn === 'white') {
    turn = 'black';
  } else {
    turn = 'white';
  }
}

function isFriendlyPiece(toX, toY, pieceColor) {
  
  let isFriendly = false;
  Object.keys(boardPieces).forEach(piece => {
    boardPieces[piece].forEach((pieceInfo, i) => {
    
      if (pieceInfo[2] === pieceColor && pieceInfo[0] === toX && pieceInfo[1] === toY) {
        
        isFriendly = true;
      }
    })
  })
  return isFriendly;
}

function willCapturePiece(toX, toY, pieceColor) {
  Object.keys(boardPieces).forEach(piece => {
    boardPieces[piece].forEach(pieceInfo => {
      if (pieceInfo[2] !== pieceColor && pieceInfo[0] === toX && pieceInfo[1] === toY) {
        const index = boardPieces[piece].indexOf(pieceInfo);
        boardPieces[piece][index] = [];
      }
    })
  })

}

export function canMovePiece(toX, toY, originalInfo) {
  let pieceColor = null;
  boardPieces[originalInfo.piece].forEach(pos => {          
    if (pos[0] === originalInfo.pos[0] && pos[1] === originalInfo.pos[1]) {
        pieceColor = pos[2];
    }
  });
 
  switch (originalInfo.piece) {
    case 'knight':
      return canMoveKnight(toX, toY, originalInfo, pieceColor);
    case 'bishop':
      return canMoveBishop(toX, toY, originalInfo, pieceColor);
    case 'rook':
      return canMoveRook(toX, toY, originalInfo, pieceColor);
    case 'queen':
      return canMoveQueen(toX, toY, originalInfo, pieceColor);
    default:
      return;
  }
}

export function canMoveKnight(toX, toY, originalInfo, pieceColor) {
    if (isFriendlyPiece(toX, toY, pieceColor)) {
      return false;
    }
    
    const [x, y] = originalInfo.pos
    const dx = toX - x
    const dy = toY - y
    
    return (
      (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
      (Math.abs(dx) === 1 && Math.abs(dy) === 2)
    )
}

export function canMoveBishop(toX, toY, originalInfo, pieceColor) {
  if (isFriendlyPiece(toX, toY, pieceColor)) {
    return false;
  }

  const [x, y] = originalInfo.pos;
  const dx = toX - x;
  const dy = toY - y;
  
  if (isOnDiagonal(dx, dy) && !isBlockedOnDiagonal(toX, toY, dx, dy, x, y)) {  // is on a diagonal
    return true;
  }
  return false;
}

export function canMoveRook(toX, toY, originalInfo, pieceColor) {
  if (isFriendlyPiece(toX, toY, pieceColor)) {
    return false;
  }

  const [x, y] = originalInfo.pos;
  const dx = toX - x;
  const dy = toY - y;
  
  if (isOnStraightLine(dx, dy) && !isBlockedOnStraightLine(toX, toY, dx, dy, x, y)) {
    return true;
  }
  return false;
}

export function canMoveQueen(toX, toY, originalInfo, pieceColor) {
  if (isFriendlyPiece(toX, toY, pieceColor)) {
    return false;
  }

  const [x, y] = originalInfo.pos;
  const dx = toX - x;
  const dy = toY - y;

  if (isOneSquareAway(dx, dy)) {
    return true;
  } else if (isOnStraightLine(dx, dy) && !isBlockedOnStraightLine(toX, toY, dx, dy, x, y)) {
    return true;
  } else if (isOnDiagonal(dx, dy) && !isBlockedOnDiagonal(toX, toY, dx, dy, x, y)) {
    return true;
  }
  return false;
}

export function isOnDiagonal(dx, dy) {
  return Math.abs(dx) === Math.abs(dy);
}

export function isBlockedOnDiagonal(toX, toY, dx, dy, x, y) {
  let xDirection = dx > 0 ? 1 : -1;
  let yDirection = dy > 0 ? 1 : -1;
  let blocked = false;
 
  let stepX = x;
  let stepY = y;
  for (let i = 0; i < Math.abs(dx); i++) {
    stepX = stepX + xDirection;
    stepY = stepY + yDirection;
    
    if (isOccupied(stepX, stepY)) {
    
      if (stepX !== toX && stepY !== toY) {
        blocked = true;
      } 
    }
  }
  return blocked;
}
  

export function isOneSquareAway(dx, dy) {
  if (Math.abs(dx) === 1 && Math.abs(dy) === 1) {
    return true;
  } else if (Math.abs(dx) === 0 && Math.abs(dy) === 1) {
    return true;
  } else if (Math.abs(dx) === 1 && Math.abs(dy) === 0) {
    return true;
  }
  return false;
}

export function isOnStraightLine(dx, dy) {
  return dx === 0 || dy === 0;
}

export function isBlockedOnStraightLine(toX, toY, dx, dy, x, y) {
  let blocked = false;
    let xDirection = 0; 
    let yDirection = 0;
    if (dx === 0) {
      yDirection = dy > 0 ? 1 : -1;
    } else {
      xDirection = dx > 0 ? 1 : -1;
    }

    let stepX = x;
    let stepY = y;
    

    for (let i = 0; i < (Math.abs(dx) + Math.abs(dy)); i++) {
      
      stepX = stepX + xDirection;
      stepY = stepY + yDirection;
      if (isOccupied(stepX, stepY)) {
        if (stepX !== toX && stepY === toY) {
          blocked = true;
        } else if (stepX === toX && stepY !== toY) {
          blocked = true;
        }
      }
    }
    return blocked;
}

export function isOccupied(x, y) {
  let occupied = false;
  Object.keys(boardPieces).forEach((piece, i) => {
    boardPieces[piece].forEach((pieceInfo, i) => {
    
      if (x === pieceInfo[0] && y === pieceInfo[1]) {
        occupied = true;
      }
    })
  });
  return occupied;
}

  