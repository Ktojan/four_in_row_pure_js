class Token {
    constructor(index, owner) {
        this.owner = owner;
        this.id = `token-${index}-${owner.id}`;
        this.dropped = false;
        this.columnLocation = 3;
    }

    drawHTMLToken() {
        const token = document.createElement('div');
        document.getElementById('game-board-underlay').appendChild(token);
        token.setAttribute('id', this.id);
        token.setAttribute('class', 'token');
        token.style.left = `${this.columnLocation * 76}px`; /* placing new token at the center (column 3) */
        token.style.backgroundColor = this.owner.color;
    }

    get htmlToken() {
        return document.getElementById(this.id);
    }
    /** 
     * Gets left offset of html element.
     * @return  {number}   Left offset of token object's htmlToken.
     */
    get offsetLeft() {
        return this.htmlToken.offsetLeft;
    }
    /** 
    * Moves html token one column to left.
    */
    moveLeft() {
        if (this.columnLocation > 0) {
            this.htmlToken.style.left = this.offsetLeft - 76;
            this.columnLocation--;
           // console.log(this.htmlToken.style.left + '   ' + this.columnLocation);
        }
    }
    /** 
    * Moves html token one column to right.
    * @param   {number}    columns - number of columns in the game board
    */
    moveRight(columns) {
        if (this.columnLocation < columns - 1) {
            this.htmlToken.style.left = this.offsetLeft + 76;
            this.columnLocation++;
            //console.log(this.htmlToken.style.left + '   ' + this.columnLocation);
        }
    }

    /** 
     * Drops html token into targeted board space.
     * @param   {Object}   target - Targeted space for dropped token.
     * @param   {function} reset  - The reset function to call after the drop animation has completed.
     */
    drop(target, reset) {
        this.dropped = true;

        $(this.htmlToken).animate({
            top: (target.y * target.diameter)
        }, 750, 'easeOutBounce', reset);
    }
}