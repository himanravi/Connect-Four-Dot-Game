class ConnectFour {
    constructor() {
        this.ROWS = 6;
        this.COLS = 7;
        this.board = Array(this.ROWS).fill().map(() => Array(this.COLS).fill(0));
        this.currentPlayer = 1;
        this.gameActive = true;
        this.lastMove = null;

        this.initializeBoard();
        this.setupEventListeners();
    }

    initializeBoard() {
        const boardElement = document.getElementById('board');
        boardElement.innerHTML = '';

        for (let row = 0; row < this.ROWS; row++) {
            for (let col = 0; col < this.COLS; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.col = col;
                cell.dataset.row = row;
                boardElement.appendChild(cell);
            }
        }
    }

    setupEventListeners() {
        document.getElementById('board').addEventListener('click', (e) => {
            if (!this.gameActive) return;
            const cell = e.target;
            if (cell.classList.contains('cell')) {
                const col = parseInt(cell.dataset.col);
                this.makeMove(col);
            }
        });

        document.getElementById('reset-button').addEventListener('click', () => this.resetGame());
        document.getElementById('new-game-modal').addEventListener('click', () => {
            this.resetGame();
            const modal = bootstrap.Modal.getInstance(document.getElementById('victoryModal'));
            modal.hide();
        });
    }

    makeMove(col) {
        const row = this.getLowestEmptyRow(col);
        if (row === null) return;

        this.board[row][col] = this.currentPlayer;
        this.animateDrop(row, col);

        if (this.checkWin(row, col)) {
            this.handleWin();
        } else if (this.checkDraw()) {
            this.handleDraw();
        } else {
            this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
            this.updateStatus();
        }
    }

    getLowestEmptyRow(col) {
        for (let row = this.ROWS - 1; row >= 0; row--) {
            if (this.board[row][col] === 0) return row;
        }
        return null;
    }

    animateDrop(row, col) {
        const cell = this.getCellElement(row, col);
        cell.classList.add('dropping');
        cell.classList.add(`player${this.currentPlayer}`);
        
        setTimeout(() => {
            cell.classList.remove('dropping');
        }, 500);
    }

    getCellElement(row, col) {
        return document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    }

    checkWin(row, col) {
        const directions = [
            [[0, 1], [0, -1]], // Horizontal
            [[1, 0], [-1, 0]], // Vertical
            [[1, 1], [-1, -1]], // Diagonal /
            [[1, -1], [-1, 1]]  // Diagonal \
        ];

        for (const [dir1, dir2] of directions) {
            let count = 1;
            count += this.countDirection(row, col, dir1[0], dir1[1]);
            count += this.countDirection(row, col, dir2[0], dir2[1]);
            
            if (count >= 4) {
                this.highlightWinningCells(row, col, dir1, dir2);
                return true;
            }
        }
        return false;
    }

    countDirection(row, col, deltaRow, deltaCol) {
        let count = 0;
        let currentRow = row + deltaRow;
        let currentCol = col + deltaCol;

        while (
            currentRow >= 0 && currentRow < this.ROWS &&
            currentCol >= 0 && currentCol < this.COLS &&
            this.board[currentRow][currentCol] === this.currentPlayer
        ) {
            count++;
            currentRow += deltaRow;
            currentCol += deltaCol;
        }

        return count;
    }

    highlightWinningCells(row, col, dir1, dir2) {
        const winningCells = [[row, col]];
        
        // Check in both directions
        [dir1, dir2].forEach(([deltaRow, deltaCol]) => {
            let currentRow = row + deltaRow;
            let currentCol = col + deltaCol;

            while (
                currentRow >= 0 && currentRow < this.ROWS &&
                currentCol >= 0 && currentCol < this.COLS &&
                this.board[currentRow][currentCol] === this.currentPlayer
            ) {
                winningCells.push([currentRow, currentCol]);
                currentRow += deltaRow;
                currentCol += deltaCol;
            }
        });

        winningCells.forEach(([r, c]) => {
            this.getCellElement(r, c).classList.add('winner');
        });
    }

    checkDraw() {
        return this.board[0].every(cell => cell !== 0);
    }

    handleWin() {
        this.gameActive = false;
        const modal = new bootstrap.Modal(document.getElementById('victoryModal'));
        document.getElementById('victory-message').textContent = `Player ${this.currentPlayer} wins!`;
        modal.show();
    }

    handleDraw() {
        this.gameActive = false;
        const modal = new bootstrap.Modal(document.getElementById('victoryModal'));
        document.getElementById('victory-message').textContent = "It's a draw!";
        modal.show();
    }

    updateStatus() {
        document.getElementById('current-player').textContent = this.currentPlayer;
    }

    resetGame() {
        this.board = Array(this.ROWS).fill().map(() => Array(this.COLS).fill(0));
        this.currentPlayer = 1;
        this.gameActive = true;
        this.lastMove = null;

        // Reset UI
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.className = 'cell';
        });
        this.updateStatus();
    }
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ConnectFour();
});
