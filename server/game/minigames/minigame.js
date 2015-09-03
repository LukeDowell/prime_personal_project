/**
 * Created by lukedowell on 8/31/15.
 */

var adminConnection = require('../game-controller').adminConnection;

//A list of all the games we have with IDs
var GAMES = {
    BUTTON_PUSH: "buttonpush",
    SECRET_PHRASE: "secretphrase",
    SHAKE_IT: "shakeit"
};

/**
 * Minigame superclass
 * @param io
 *
 * @param minplayers
 *      The minimum amount of players
 * @param maxplayers
 *      The maximum amount of players
 * @param participants
 *      The player objects htat are participating in the minigame
 * @constructor
 */
function Game(io, minplayers, maxplayers, participants) {
    this.io = io;
    this.minplayers = minplayers;
    this.maxplayers = maxplayers;
    this.participants = participants;
}
Game.prototype.sendJoinRequest = function(game) {
    var length = this.participants.length;
    for(var i = 0; i < length; i++) {
        this.io.to(this.participants[i].socketid).emit("minigame", game);
    }
};
Game.prototype.getPlayerBySocket = function(socketid) {
    var length = this.participants.length;
    for(var i = 0; i < length; i++) {
        if(this.participants[i].socketid === socketid) {
            return this.participants[i];
        }
    }
    return null;
};
Game.prototype.sendToAdmin = function(msg, callback) {
  this.io.sockets.connected[adminConnection].emit("event", msg, callback);
};
module.exports.Game = Game;
module.exports.GAMES = GAMES;
