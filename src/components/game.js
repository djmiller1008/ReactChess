let knightPositions = [[0, 1, 'black'], [0, 6, 'black'], [7, 1, 'white'], [7, 6, 'white']]
let observer = null

function emitChange() {
  return observer(knightPositions)
}

export function observeBoard(update) {
  if (observer) {
    throw new Error('Multiple observers not implemented.')
  }
 
  observer = update
  emitChange()
  console.log(knightPositions);
}

export function moveKnight(toX, toY, originalPosition) {
  let index;
  
  knightPositions.forEach((pos, i) => {
    if (pos[0] === originalPosition.pos[0] && pos[1] === originalPosition.pos[1]) {
        index = i;
    }
  });
  knightPositions[index] = [toX, toY, originalPosition.pieceColor];
  emitChange();
 
}

export function canMoveKnight(toX, toY, originalPosition) {
    
    
    const [x, y] = originalPosition.pos
    const dx = toX - x
    const dy = toY - y
    
    return (
      (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
      (Math.abs(dx) === 1 && Math.abs(dy) === 2)
    )
  }
  