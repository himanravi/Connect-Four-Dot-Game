class ConnectFour {
    constructor() {
        this.ROWS = 6;
        this.COLS = 7;
        this.board = Array(this.ROWS).fill().map(() => Array(this.COLS).fill(0));
        this.currentPlayer = 1;
        this.gameActive = true;
        this.lastMove = null;
        this.isComputerMode = true; // Enable computer player by default
        this.isComputerTurn = false;

        console.log('Initializing Connect Four game');
        this.initializeBoard();
        this.setupEventListeners();
    }

    initializeBoard() {
        const boardElement = document.getElementById('board');
        if (!boardElement) {
            console.error('Board element not found');
            return;
        }

        boardElement.innerHTML = '';
        console.log('Creating board cells');

        for (let row = 0; row < this.ROWS; row++) {
            for (let col = 0; col < this.COLS; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.col = col;
                cell.dataset.row = row;
                boardElement.appendChild(cell);
            }
        }
        console.log('Board initialization complete');
    }

    setupEventListeners() {
        const boardElement = document.getElementById('board');
        if (!boardElement) {
            console.error('Board element not found for event listeners');
            return;
        }

        console.log('Setting up event listeners');

        boardElement.addEventListener('click', (e) => {
            console.log('Click detected on board');
            if (!this.gameActive || this.isComputerTurn) {
                console.log('Game is not active or computer is thinking');
                return;
            }

            const cell = e.target;
            if (cell.classList.contains('cell')) {
                console.log(`Clicked column: ${cell.dataset.col}`);
                const col = parseInt(cell.dataset.col);
                this.makeMove(col);
            }
        });

        const resetButton = document.getElementById('reset-button');
        if (resetButton) {
            resetButton.addEventListener('click', () => {
                console.log('Reset button clicked');
                this.resetGame();
            });
        }

        const newGameModal = document.getElementById('new-game-modal');
        if (newGameModal) {
            newGameModal.addEventListener('click', () => {
                console.log('New game button clicked in modal');
                this.resetGame();
                const modal = bootstrap.Modal.getInstance(document.getElementById('victoryModal'));
                if (modal) modal.hide();
            });
        }
    }

    makeMove(col) {
        console.log(`Attempting move in column ${col}`);
        const row = this.getLowestEmptyRow(col);
        if (row === null) {
            console.log('Column is full');
            return;
        }

        console.log(`Placing piece at row ${row}, column ${col}`);
        this.board[row][col] = this.currentPlayer;
        this.animateDrop(row, col);

        if (this.checkWin(row, col)) {
            console.log(`Player ${this.currentPlayer} wins!`);
            this.handleWin();
        } else if (this.checkDraw()) {
            console.log('Game is a draw');
            this.handleDraw();
        } else {
            this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
            this.updateStatus();

            // If it's computer's turn, make a move after a short delay
            if (this.isComputerMode && this.currentPlayer === 2 && this.gameActive) {
                this.isComputerTurn = true;
                setTimeout(() => this.makeComputerMove(), 1000);
            }
        }
    }

    makeComputerMove() {
        if (!this.gameActive) return;

        // Get all valid columns (not full)
        const validColumns = Array.from({length: this.COLS}, (_, i) => i)
            .filter(col => this.getLowestEmptyRow(col) !== null);

        if (validColumns.length === 0) return;

        // Pick a random valid column
        const randomCol = validColumns[Math.floor(Math.random() * validColumns.length)];
        this.isComputerTurn = false;
        this.makeMove(randomCol);
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
        const message = this.currentPlayer === 1 ? "You win!" : "Computer wins!";
        document.getElementById('victory-message').textContent = message;
        modal.show();
    }

    handleDraw() {
        this.gameActive = false;
        const modal = new bootstrap.Modal(document.getElementById('victoryModal'));
        document.getElementById('victory-message').textContent = "It's a draw!";
        modal.show();
    }

    updateStatus() {
        const statusText = this.currentPlayer === 1 ? "Your Turn" : "Computer's Turn";
        document.getElementById('current-player').textContent = statusText;
    }

    resetGame() {
        this.board = Array(this.ROWS).fill().map(() => Array(this.COLS).fill(0));
        this.currentPlayer = 1;
        this.gameActive = true;
        this.lastMove = null;
        this.isComputerTurn = false;

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
    console.log('DOM loaded, initializing game');
    window.game = new ConnectFour();
});