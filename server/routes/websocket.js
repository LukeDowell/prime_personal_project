/**
 * Created by lukedowell on 8/30/15.
 */

var io = require('../app').io;
var GAME = require('../game/game-controller');

/**
 * A container for all of our socket requests, just to keep them organized
 */
var CHANNEL = {
    createRoom: "create room",
    joinRequest: "join request",
    playerJoined: "player joined",
    startGameRequest: "start game",
    error: "application error"
};

/**
 * Separates out our networking stuff from our game logic
 * @param socket
 */
function handle(socket) {
    console.log("Socket connected: " + socket.id);


    socket.on(CHANNEL.joinRequest, function(msg, callback) {
        callback(GAME.handleNewPlayer(msg, this));
    });

    socket.on(CHANNEL.playerJoined, function(msg) {
    });

    socket.on(CHANNEL.startGameRequest, function(msg) {

    });

    socket.on(CHANNEL.error, function(msg) {
        console.log(msg);
    });
}

module.exports.handle = handle;