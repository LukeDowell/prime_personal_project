/**
 * Created by lukedowell on 8/31/15.
 */

//A list of all the games we have with IDs
var GAMES = {
    BUTTON_PUSH: 0,
    SECRET_PHRASE: 1,
    SHAKE_IT: 2
};

/**
 * Minigame superclass
 * @param minplayers
 *      The minimum amount of players
 * @param maxplayers
 *      The maximum amount of players
 * @param participants
 *      The player objects htat are participating in the minigame
 * @constructor
 */
function Game(minplayers, maxplayers, participants) {
    this.minplayers = minplayers;
    this.maxplayers = maxplayers;
    this.participants = participants;
}

module.exports.Game = Game;
module.exports.GAMES = GAMES;
