import goblinImage from '../img/goblin.png';

export default class Character {
    constructor() {
        this.character = document.createElement('img');
        this.character.src = goblinImage;
        this.character.alt = 'goblin';
        this.currentPosition = -1;
    }

    placeCharacter(cells) {
        const randomCell = this.getRandomInt(0, cells.length);
        cells[randomCell].append(this.character);
        this.currentPosition = randomCell;
    }

    moveCharacter(cells) {
        let newPosition = this.currentPosition;
        
        while (newPosition === this.currentPosition) {
            newPosition = this.getRandomInt(0, cells.length);
        }
        
        cells[this.currentPosition].removeChild(this.character);
        cells[newPosition].append(this.character);
        this.currentPosition = newPosition;
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}
