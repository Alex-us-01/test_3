import Board from './Board';
import Character from './Character';

export default class GamePlay {
    constructor() {
        this.board = new Board();
        this.goblin = new Character();
        this.countDead = document.querySelector('.dead');
        this.countLost = document.querySelector('.lost');
        this.count = 0;
        this.cursor = document.querySelector('.cursor');
        this.gameInterval = null;
        this.cells = null;
    }

    startGame() {
        // Создаем игровое поле
        this.board.createGrid();
        this.cells = document.querySelectorAll('.cell');
        
        // Размещаем гоблина на поле
        this.goblin.placeCharacter(this.cells);
        
        // Добавляем обработчики событий
        this.addEventListeners();
        
        // Запускаем игровой цикл
        this.gameInterval = setInterval(() => {
            this.goblin.moveCharacter(this.cells);
            this.updateCounters();
            this.checkResult();
        }, 1000);
    }

    addEventListeners() {
        // Добавляем обработчик клика на каждую клетку
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', (event) => {
                this.showCursor(event);
                
                // Проверяем, есть ли гоблин в клетке
                if (cell.contains(this.goblin.character)) {
                    cell.removeChild(this.goblin.character);
                    this.countDead.textContent = parseInt(this.countDead.textContent) + 1;
                } else {
                    this.countLost.textContent = parseInt(this.countLost.textContent) + 1;
                }
                
                // Проверяем результат игры
                this.checkResult();
                this.count = 0;
                
                // Скрываем курсор через 200 мс
                setTimeout(() => {
                    this.hideCursor();
                }, 200);
            });
        });
    }

    updateCounters() {
        // Обновляем счетчик промахов
        this.countLost.textContent = parseInt(this.countLost.textContent) + this.count;
        
        // Обновляем счетчик
        if (this.count !== 1) {
            setTimeout(() => this.count = 1, 1000);
        }
    }

    checkResult() {
        // Проверяем победу
        if (parseInt(this.countDead.textContent) > 10) {
            alert('Победа!');
            this.reset();
            return;
        }
        
        // Проверяем поражение
        if (parseInt(this.countLost.textContent) > 5) {
            alert('Поражение!');
            this.reset();
        }
    }

    showCursor(event) {
        // Показываем курсор в месте клика
        this.cursor.classList.add('active');
        this.cursor.style.left = event.clientX + 'px';
        this.cursor.style.top = event.clientY + 'px';
    }

    hideCursor() {
        // Скрываем курсор
        this.cursor.classList.remove('active');
    }

    reset() {
        // Сброс счетчиков
        this.countDead.textContent = 0;
        this.countLost.textContent = 0;
        this.count = 0;
        
        // Пересоздаем игровое поле
        this.board.createGrid();
        this.cells = document.querySelectorAll('.cell');
        this.goblin.placeCharacter(this.cells);
    }
}
