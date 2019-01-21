class Game {
    constructor() {
        this.ready = false;
        this.board = new Board();
        this.players = this.createPlayers();
    }

    /**
     * Creates 2 players objects
     * @return {array} An array of two players objects
     */
    createPlayers() {
        const players = [ new Player('Garry Right', 1, '#76323F'),
                          new Player('Simon Left', 2, '#C0C0C0', true)];
        const token = document.createElement('div');
        document.getElementById('right-player').appendChild(token);  
        token.setAttribute('class', 'right-player');                
        token.innerText = players[0].name;
        const token2 = document.createElement('div');
        document.getElementById('left-player').appendChild(token2);  
        token2.setAttribute('class', 'left-player');                
        token2.innerText = players[1].name;
        return players;
    }

    /**
     * Gets game ready for play
     */
    startGame() {
        this.board.drawHTMLBoard();
        this.activePlayer.activeToken.drawHTMLToken();
        this.ready = true;
    }

    /**
     * Detects a player that can make a move now
     * @return {Object} player - The active player
     */
    get activePlayer() {
        let aP = this.players.find(player => player.active);
        return aP;
    }

    /**
    * Branches code, depending on what key player presses
    * @param   {Object}    e - Keydown event object
    */
    handleKeydown(event) {
        if (!this.ready) return;
        switch(event.key) {
            case 'ArrowLeft':
            this.activePlayer.activeToken.moveLeft();
            break;

            case 'ArrowRight':
            this.activePlayer.activeToken.moveRight(this.board.columns);
            break; 

            case 'ArrowDown':
            let colLocation = this.activePlayer.activeToken.columnLocation;
            console.log(colLocation);
            this.playToken();
            break;
        }
    }

    /**
     * Finds a Space object to drop active token into, drops the token
     */
    playToken() {
        let spaces = this.board.spaces;
        let activeToken = this.activePlayer.activeToken;
        let targetColumn = spaces[activeToken.columnLocation];
        let targetSpace = null;
        let game = this;

        for (let space of targetColumn) {
            if (space.token === null) {
                targetSpace = space;
            }
        }

        if (targetSpace !== null) {
            game.ready = false;
            activeToken.drop(targetSpace, function() {
                game.updateGameState(activeToken, targetSpace);
            });
        }
    }

    /** 
    * Switches active player. 
    */
    switchPlayers() {
        for(let player of this.players) {
            player.active = !player.active;
        }
    }

    /** 
    * Displays game over message.
    * @param {string} message - Game over message.      
    */
    gameOver(message) {
        const messageDiv = document.getElementById('game-over');
        messageDiv.style.display = 'block';
        messageDiv.innerText = message;
    }

     /** 
    * Updates game state after token is dropped. 
    * @param   {Object}  token  -  The token that's being dropped.
    * @param   {Object}  target -  Targeted space for dropped token.
    */
    updateGameState(token, target) {
        target.mark(token);
        console.log(token);

        if (!this.checkForWin(target)) {
            this.switchPlayers();

            if (this.activePlayer.areTokensLeft()) {
                this.activePlayer.activeToken.drawHTMLToken();
                this.ready = true;
            } else {
                this.gameOver('No more tokens, its a draw, folks!');
            }
        } else {
            this.switchPlayers();
            this.gameOver('Game over! ' + this.activePlayer.name + ' won. Yeah....\n For replaying just refresh the page.');
        }
    }
   

    /** 
    * Checks if there a winner on the board after each token drop.
    * @param   {Object}    Targeted space for dropped token.
    * @return  {boolean}   Boolean value indicating whether the game has been won (true) or not (false)
    */
    checkForWin(target) {
        const owner = target.token.owner;
        let win = false;

        // vertical
        for (let x = 0; x < this.board.columns; x++ ){
            for (let y = 0; y < this.board.rows - 3; y++){
                if (this.board.spaces[x][y].owner === owner && 
                    this.board.spaces[x][y+1].owner === owner && 
                    this.board.spaces[x][y+2].owner === owner && 
                    this.board.spaces[x][y+3].owner === owner) {
                        win = true;
                }           
            }
        }

        // horizontal
        for (let x = 0; x < this.board.columns - 3; x++ ){
            for (let y = 0; y < this.board.rows; y++){
                if (this.board.spaces[x][y].owner === owner && 
                    this.board.spaces[x+1][y].owner === owner && 
                    this.board.spaces[x+2][y].owner === owner && 
                    this.board.spaces[x+3][y].owner === owner) {
                        win = true;
                }           
            }
        }

        // diagonal
        for (let x = 3; x < this.board.columns; x++ ){
            for (let y = 0; y < this.board.rows - 3; y++){
                if (this.board.spaces[x][y].owner === owner && 
                    this.board.spaces[x-1][y+1].owner === owner && 
                    this.board.spaces[x-2][y+2].owner === owner && 
                    this.board.spaces[x-3][y+3].owner === owner) {
                        win = true;
                }           
            }
        }

        // diagonal
        for (let x = 3; x < this.board.columns; x++ ){
            for (let y = 3; y < this.board.rows; y++){
                if (this.board.spaces[x][y].owner === owner && 
                    this.board.spaces[x-1][y-1].owner === owner && 
                    this.board.spaces[x-2][y-2].owner === owner && 
                    this.board.spaces[x-3][y-3].owner === owner) {
                        win = true;
                }           
            }
        }

        return win;
    }

}