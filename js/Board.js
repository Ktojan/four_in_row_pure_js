class Board {
    constructor() {
        this.rows = 6;
        this.columns = 7;
        this.spaces = this.createSpaces();
    }

    /**
     * Generates 2D array of spaces
     * @return {Array} An array of space objects
     */

    createSpaces() {
        const spaces = [];

        for (let c = 0; c < this.columns; c++) {
            const column = [];

            for (let r = 0; r < this.rows; r++) {
                column.push(new Space(c, r));
            }

            spaces.push(column);
        }
        console.log('SPACES\n');
        console.log(spaces);
        return spaces;
    }

    drawHTMLBoard() {
        // this.spaces.forEach(column => {
        //     for (let c = 0; c < this.column.length; c++) {
        //         column[c].drawSVGSpace();
        //     }
        // });
        for (let column of this.spaces) {
            for (let space of column) {
                space.drawSVGSpace();
            }
        }
    }  

}