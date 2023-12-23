const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const status = document.querySelector('.status');
const restartBtn = document.querySelector('.restart-btn');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(e) {
  const clickedCell = e.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell'));

  if (gameState[clickedCellIndex] !== '' || !gameActive) return;

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
  clickedCell.style.pointerEvents = 'none';

  checkWin();
  checkDraw();

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (
      gameState[a] !== '' &&
      gameState[a] === gameState[b] &&
      gameState[b] === gameState[c]
    ) {
      gameActive = false;
      status.textContent = `Player ${gameState[a]} wins!`;
      highlightWinningCells(winningConditions[i]);
      break;
    }
  }
}

function highlightWinningCells(cellsArray) {
  cellsArray.forEach((cellIndex) => {
    cells[cellIndex].classList.add('win');
  });
}

function checkDraw() {
  if (!gameState.includes('') && gameActive) {
    gameActive = false;
    status.textContent = `It's a draw!`;
  }
}

function restartGame() {
  currentPlayer = 'X';
  gameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];
  status.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach((cell) => {
    cell.textContent = '';
    cell.style.pointerEvents = 'auto';
    cell.classList.remove('win');
  });
}

cells.forEach((cell) => {
  cell.addEventListener('click', handleCellClick);
});

restartBtn.addEventListener('click', restartGame);

status.textContent = `Player ${currentPlayer}'s turn`;
