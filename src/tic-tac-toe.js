class TicTacToe {
    constructor() {
        this.player = 'x';
        this.field = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
    }

    getCurrentPlayerSymbol() {
        return this.player;
    }

    nextTurn(rowIndex, columnIndex) {
        if (this.field[rowIndex][columnIndex] === null) {
            this.field[rowIndex][columnIndex] = this.player;
            this.player = this.player === 'x' ? 'o' : 'x';
        }
    }

    isFinished() {
        if (this.getWinner() || this.isDraw()) {
            return true;
        }
        return false;
    }

    getWinner() {
        const checkRow = (player) => {
            const filtered = this.field.filter(
                row => row.filter(
                    item => item === player).length === 3);
            return filtered.length < 1 ? null : player;
        };

        const row = checkRow('x') || checkRow('o');
        // console.log('row: ', row);

        const checkDiagonal = (player) => {
            let firstDiagonal = [];
            let secondDiagonal = [];

            for (let i = 0; i < this.field.length; i++) {
                firstDiagonal = [...firstDiagonal, this.field[i][i]];
            }
            // console.log('firstDiagonal: ', firstDiagonal);
            let j = this.field.length - 1;

            for (let i = 0; i < this.field.length; i++) {
                secondDiagonal = [...secondDiagonal, this.field[j][i]];
                j--;
            }
            
            // console.log('secDiagonal: ', secondDiagonal);
            const firstFiltered = firstDiagonal.filter(item => item === player);
            const secondFiltered = secondDiagonal.filter(item => item === player);

            return firstFiltered.length === 3 || secondFiltered.length === 3 ? player : null;
        };

        const diagonal = checkDiagonal('x') || checkDiagonal('o');
        // console.log('diagonal: ', diagonal);

        const checkColumn = (player) => {
            for (let i = 0; i < this.field.length; i++) {
                const filtered = this.field.filter(row => row[i] === player);
                if (filtered.length === 3) {
                    return player;
                }
            }

            return null;
        };

        const column = checkColumn('x') || checkColumn('o');
        // console.log('column: ',column);

        const winner = column || row || diagonal;
        // console.log('winner: ', winner);

        return winner;
    }

    noMoreTurns() {
        const arr = this.field.reduce((acc, row) => {
            const filteredCol = row.filter(item => item === null);
            return acc = [...acc, ...filteredCol];
        }, []);
        // console.log(arr);
        return arr.length === 0;
    }

    isDraw() {
        return this.noMoreTurns() && !this.getWinner();
    }

    getFieldValue(rowIndex, colIndex) {
        return this.field[rowIndex][colIndex];
    }
}

module.exports = TicTacToe;
