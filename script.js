const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart-button');

let currentPlayer = 'x';
let board = ['', '', '', '', '', '', '', '', ''];

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function checkWin() {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}

function checkDraw() {
    return board.every(cell => cell);
}

function handleClick(event) {
    const index = event.target.dataset.index;

    if (board[index] || checkWin()) return;

    board[index] = currentPlayer;
    event.target.classList.add(currentPlayer);
    event.target.textContent = currentPlayer.toUpperCase();

    const winner = checkWin();
    if (winner) {
        alert(`${winner.toUpperCase()} wins!`);
    } else if (checkDraw()) {
        alert('Draw!');
    } else {
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    }
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'x';
    cells.forEach(cell => {
        cell.classList.remove('x', 'o');
        cell.textContent = '';
    });
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
