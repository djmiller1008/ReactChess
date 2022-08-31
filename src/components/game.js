let boardPieces = {
  knight: [[0, 1, 'black'], [0, 6, 'black'], [7, 1, 'white'], [7, 6, 'white']]
}

let observer = null

function emitChange() {
  return observer(boardPieces)
}

export function observeBoard(update) {
  if (observer) {
    throw new Error('Multiple observers not implemented.')
  }
 
  observer = update
  emitChange()
  console.log(boardPieces);
}

export function moveKnight(toX, toY, originalInfo) {
  let index;
  let pieceColor;
  boardPieces.knight.forEach((pos, i) => {
    if (pos[0] === originalInfo.pos[0] && pos[1] === originalInfo.pos[1]) {
        pieceColor = pos[2];
        index = i;
    }
  });

  willCapturePiece(toX, toY, originalInfo);
  if (!isFriendlyPiece(toX, toY, originalInfo)) {
    
    boardPieces.knight[index] = [toX, toY, pieceColor];
    emitChange();
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
        boardPieces[piece][index] = []
      }
    })
  })

}

export function canMoveKnight(toX, toY, originalInfo) {
    
    
    const [x, y] = originalInfo.pos
    const dx = toX - x
    const dy = toY - y
    
    return (
      (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
      (Math.abs(dx) === 1 && Math.abs(dy) === 2)
    )
  }
  