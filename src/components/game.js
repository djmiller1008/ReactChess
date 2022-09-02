let boardPieces = {
  knight: [[0, 1, 'black'], [0, 6, 'black'], [7, 1, 'white'], [7, 6, 'white']],
  bishop: [[0, 2, 'black'], [0, 5, 'black'], [7, 2, 'white'], [7, 5, 'white']]
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
  boardPieces[originalInfo.piece].forEach((pos, i) => {
    if (pos[0] === originalInfo.pos[0] && pos[1] === originalInfo.pos[1]) {
        pieceColor = pos[2];
        index = i;
    }
  });

  
  if (!isFriendlyPiece(toX, toY, originalInfo) && isPlayerTurn(pieceColor)) {
    willCapturePiece(toX, toY, originalInfo);
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

function isFriendlyPiece(toX, toY, originalInfo) {
  const pieceColor = originalInfo.pieceColor;
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

function willCapturePiece(toX, toY, originalInfo) {
 
  const pieceColor = originalInfo.pieceColor;
  Object.keys(boardPieces).forEach(piece => {
    
    boardPieces[piece].forEach((pieceInfo, i) => {
      if (pieceInfo[2] !== pieceColor && pieceInfo[0] === toX && pieceInfo[1] === toY) {
        const index = boardPieces[piece].indexOf(pieceInfo);
        boardPieces[piece][index] = [];
        
      }
    })
  })

}


export function canMovePiece(toX, toY, originalInfo) {
  switch (originalInfo.piece) {
    case 'knight':
      return canMoveKnight(toX, toY, originalInfo);
    case 'bishop':
      return canMoveBishop(toX, toY, originalInfo);
    default:
      return;
  }
}

export function canMoveKnight(toX, toY, originalInfo) {
    if (isFriendlyPiece(toX, toY, originalInfo)) {
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

export function canMoveBishop(toX, toY, originalInfo) {
  if (isFriendlyPiece(toX, toY, originalInfo)) {
    return false;
  }

  const [x, y] = originalInfo.pos
  const dx = toX - x;
  const dy = toY - y;
  
  return (Math.abs(dx) === Math.abs(dy));

}
  