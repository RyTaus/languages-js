"use strict"

class Tape {
    constructor(str) {
        this.cells = str.split('');
        this.pointer = 0;
    }

    moveRight() {
        this.pointer += 1;
        if (this.pointer > (this.cells).length) {
            this.cells.push('#');
        }
        return this;

    }

    moveLeft() {
        this.pointer -= 1;
        if (this.pointer < 0) {
            this.pointer = 0;
        }
        return this;

    }

    readCell() {
        return this.cells[this.pointer];
    }

    writeCell(char) {
        this.cells[this.pointer] = char;
        return this;
    }

    toString() {
        let str = this.cells.join("");
        return str.slice(0, this.pointer) + "." + str.slice(this.pointer);
    }
}

module.exports = Tape;