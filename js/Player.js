class Player {
    constructor(name, id, color, active = false) {
        this.name = name;
        this.id = id;
        this.color = color;
        this.active = active;
        this.tokens = this.createTokens(21);
    }
    /**
    * Creates token array for each player, 
    * @param   {integer}  num - number of tokens to be created 
    * @return  {array}  tokens - an array of new token objects
    */

    createTokens(num) {
        const tokens = [];

        for (let k = 0; k < num; k++) {   //field is 6x7 so we have 21 spaces for each player
            let token = new Token(k, this);
            tokens.push(token);
        }
        
        return tokens;
    }

    get unusedTokens() {
        return this.tokens.filter(token => !token.dropped);
    }

    get activeToken() {
        return this.unusedTokens[0];
    }

     /**
    * Check if a player has any undropped tokens left
    * @return {Boolean} 
    */
    areTokensLeft() {
    return this.unusedTokens.length == 0 ? false : true;
    }   


    /**
     * TODO you could add a feature to the game that displays the
     *  number of remaining tokens for each player on their turn.
     */
}