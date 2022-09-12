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

let check = false;



let observer = null

let turn = 'white';


function emitChange() {
  return observer(boardPieces, check)
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

  if (putSelfInCheck(toX, toY, originalInfo, pieceColor)) {
    alert("Cannot put yourself in check!");
    return;
  }

  
  if (!isFriendlyPiece(toX, toY, pieceColor) && isPlayerTurn(pieceColor)) {
    willCapturePiece(toX, toY, pieceColor, boardPieces);
  
    boardPieces[originalInfo.piece][index] = [toX, toY, pieceColor];

    // check if king is in check


    switchTurns();
    if (nowInCheck(originalInfo.piece, pieceColor, toX, toY)) {
      check = true;
    } else {
      check = false;
    }
    emitChange();
  }
 

}

function nowInCheck(piece, pieceColor, x, y, boardPiecesCopy) {
  let enemyKing;
  let originalInfo = { pos: [x, y], piece: piece }
  boardPieces['king'].forEach(king => {
    if (king[2] !== pieceColor) {
      enemyKing = king;
    }
  });

  
  switch (piece) {
    case 'bishop':
      return canMoveBishop(enemyKing[0], enemyKing[1], originalInfo, pieceColor, boardPiecesCopy);
    case 'knight':
      return canMoveKnight(enemyKing[0], enemyKing[1], originalInfo, pieceColor);
    case 'queen':
      return canMoveQueen(enemyKing[0], enemyKing[1], originalInfo, pieceColor);
    case 'pawn':
      return canMovePawn(enemyKing[0], enemyKing[1], originalInfo, pieceColor);
    default:
      return false;
  }
}

function putSelfInCheck(toX, toY, originalInfo, pieceColor) {
  let boardPiecesCopy = JSON.parse(JSON.stringify(boardPieces)); //make copy of pieces struct
  let index;
  boardPiecesCopy[originalInfo.piece].forEach((pieceInfo, i) => {     //find moving piece in pieces struct
    if (originalInfo.pos[0] === pieceInfo[0] && originalInfo.pos[1] === pieceInfo[1]) {
      index = i;
    }
  })

  boardPiecesCopy[originalInfo.piece][index] = [toX, toY, pieceColor];  // move piece in pieces struct copy
  willCapturePiece(toX, toY, pieceColor, boardPiecesCopy); // capture enemy piece if necessary (in copy)

  let check = false;
  
  Object.keys(boardPiecesCopy).forEach(piece => { // loop through enemy pieces
    boardPiecesCopy[piece].forEach(pieceInfo => {
     if (pieceInfo[2] !== pieceColor) {
      
      if (nowInCheck(piece, pieceInfo[2], pieceInfo[0], pieceInfo[1], boardPiecesCopy)) {
        check = true;
      }
     }
      
      
    })
  })
  return check;
  
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

function willCapturePiece(toX, toY, pieceColor, piecesStruct) {
  Object.keys(piecesStruct).forEach(piece => {
    piecesStruct[piece].forEach(pieceInfo => {
      if (pieceInfo[2] !== pieceColor && pieceInfo[0] === toX && pieceInfo[1] === toY) {
        const index = piecesStruct[piece].indexOf(pieceInfo);
        piecesStruct[piece][index] = [];
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
    case 'pawn':
      return canMovePawn(toX, toY, originalInfo, pieceColor);
    case 'king':
      return canMoveKing(toX, toY, originalInfo, pieceColor);
    default:
      return;
  }
}

function isOccupiedByEnemy(x, y, pieceColor) {
  let occupied = false;
  Object.keys(boardPieces).forEach((piece, i) => {
    boardPieces[piece].forEach((pieceInfo, i) => {
    
      if (x === pieceInfo[0] && y === pieceInfo[1] && pieceColor !== pieceInfo[2]) {
        occupied = true;
      }
    })
  });
  return occupied;
}

function canMovePawn(toX, toY, originalInfo, pieceColor) {
  if (isFriendlyPiece(toX, toY, pieceColor)) {
    return false;
  }
  const [x, y] = originalInfo.pos
  const dx = toX - x;
  const dy = toY - y;
  const occupiedByEnemy = isOccupiedByEnemy(toX, toY, pieceColor);

  if (pieceColor === 'white') {
    if (x === 6) {
      if (dx === -2 && dy === 0 && !occupiedByEnemy) {
        return true;
      } else if (dx === -1 && dy === 0 && !occupiedByEnemy) {
        return true;
      }
    } else {
      if (dx === -1 && dy === 0 && !occupiedByEnemy) {
        return true;
      }
    }

    if (dx === -1 && dy === 1 && occupiedByEnemy) {
      return true;
    } else if (dx === -1 && dy === -1 && occupiedByEnemy) {
      return true;
    }

  } else {
    if (x === 1) {
      if (dx === 2 && dy === 0 && !occupiedByEnemy) {
        return true;
      } else if (dx === 1 && dy === 0 && !occupiedByEnemy) {
        return true;
      }
    } else {
      if (dx === 1 && dy === 0 && !occupiedByEnemy) {
        return true;
      }
    }

    if (dx === 1 && dy === 1 && occupiedByEnemy) {
      return true;
    } else if (dx === 1 && dy === -1 && occupiedByEnemy) {
      return true;
    }
    
  }
  return false;
}

function canMoveKing(toX, toY, originalInfo, pieceColor) {
  if (isFriendlyPiece(toX, toY, pieceColor)) {
    return false;
  }

  const [x, y] = originalInfo.pos;
  const dx = toX - x;
  const dy = toY - y;

  if (isOneSquareAway(dx, dy)) {
    return true;
  }
}






function canMoveKnight(toX, toY, originalInfo, pieceColor) {
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

function canMoveBishop(toX, toY, originalInfo, pieceColor, piecesStruct=boardPieces) {
  if (isFriendlyPiece(toX, toY, pieceColor)) {
    return false;
  }

  const [x, y] = originalInfo.pos;
  const dx = toX - x;
  const dy = toY - y;
  
  if (isOnDiagonal(dx, dy) && !isBlockedOnDiagonal(toX, toY, dx, dy, x, y, piecesStruct)) {
    return true;
   
    
  }
  return false;
}

function canMoveRook(toX, toY, originalInfo, pieceColor) {
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

function canMoveQueen(toX, toY, originalInfo, pieceColor) {
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

function isOnDiagonal(dx, dy) {
  return Math.abs(dx) === Math.abs(dy);
}

function isBlockedOnDiagonal(toX, toY, dx, dy, x, y, piecesStruct) {
  let xDirection = dx > 0 ? 1 : -1;
  let yDirection = dy > 0 ? 1 : -1;
  let blocked = false;
 
  let stepX = x;
  let stepY = y;
  for (let i = 0; i < Math.abs(dx); i++) {
    stepX = stepX + xDirection;
    stepY = stepY + yDirection;
    
    if (isOccupied(stepX, stepY, piecesStruct)) {
    
      if (stepX !== toX && stepY !== toY) {
        blocked = true;
      } 
    }
  }
  return blocked;
}
  

function isOneSquareAway(dx, dy) {
  if (Math.abs(dx) === 1 && Math.abs(dy) === 1) {
    return true;
  } else if (Math.abs(dx) === 0 && Math.abs(dy) === 1) {
    return true;
  } else if (Math.abs(dx) === 1 && Math.abs(dy) === 0) {
    return true;
  }
  return false;
}

function isOnStraightLine(dx, dy) {
  return dx === 0 || dy === 0;
}

function isBlockedOnStraightLine(toX, toY, dx, dy, x, y) {
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

function isOccupied(x, y, piecesStruct=boardPieces) {
  let occupied = false;
  Object.keys(piecesStruct).forEach((piece, i) => {
    piecesStruct[piece].forEach((pieceInfo, i) => {
    
      if (x === pieceInfo[0] && y === pieceInfo[1]) {
        occupied = true;
      }
    })
  });
  return occupied;
}



  