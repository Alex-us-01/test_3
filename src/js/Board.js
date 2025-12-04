import goblinImage from '../img/goblin.png';

export default class Board {
    constructor() {
        this.board = document.getElementById('gameField');
        this.fieldSize = 4;
    }

    createGrid() {
        for (let i = 0; i < this.fieldSize * this.fieldSize; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            this.board.append(cell);
        }
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}
