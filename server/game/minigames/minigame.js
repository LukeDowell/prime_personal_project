/**
 * Created by lukedowell on 8/31/15.
 */


//A list of all the games we have with IDs
var GAMES = {
    BUTTON_PUSH: "buttonpush",
    SECRET_PHRASE: "secretphrase",
    SHAKE_IT: "shakeit"
};

/**
 * Minigame superclass
 * @param io
 *      socket io
 * @param adminSocketId
 *      The socket id of the admin connection
 * @param minplayers
 *      The minimum amount of players
 * @param maxplayers
 *      The maximum amount of players
 * @param participants
 *      The player objects that are participating in the minigame
 * @constructor
 */
function Game(io, adminSocketId, minplayers, maxplayers, participants) {
    this.io = io;
    this.adminSocketId = adminSocketId;
    this.minplayers = minplayers;
    this.maxplayers = maxplayers;
    this.participants = participants;
    this.isRunning = true;
}
Game.prototype.sendJoinRequest = function(game) {
    var length = this.participants.length;
    for(var i = 0; i < length; i++) {
        this.io.to(this.participants[i].socketid).emit(global.CHANNEL.MINIGAME, game);
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
Game.prototype.sendToAdmin = function(path, msg, callback) {
  this.io.sockets.connected[this.adminSocketId].emit(path, msg, callback);
};
Game.prototype.broadcast = function(path, msg) {
    var length = this.participants.length;
    for(var i = 0; i < length; i++) {
        this.io.to(this.participants[i].socketid).emit(path, msg);
    }
};
module.exports.Game = Game;
module.exports.GAMES = GAMES;
