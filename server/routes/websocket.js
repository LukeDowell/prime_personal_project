/**
 * Created by lukedowell on 8/30/15.
 */

var io = require('../app').io;
var controller = require('../game/game-controller');

/**
 * A container for all of our socket requests, just to keep them organized
 */
var CHANNEL = {
    MINIGAME: "minigame",
    createRoom: "create room",
    joinRequest: "join request",
    playerJoined: "player joined",
    startGameRequest: "start game",
    event: "event",
    error: "application error"
};

/**
 * Separates out our networking stuff from our game logic
 * @param socket
 */
function handle(socket) {

    socket.on(CHANNEL.MINIGAME, function(msg, callback) {
        var instance = controller.pool.getInstanceForSocket(this.id);
        if(instance) {
            instance.minigame.handleSocket(this, msg, callback);
        }
    });

    //Player join request
    socket.on(CHANNEL.joinRequest, function(msg, callback) {
        var newPlayer = controller.game.handleNewPlayer(msg, this);
        if(newPlayer) {
            io.to(controller.game.adminConnection).emit(CHANNEL.event, "Player joined: " + socket.id);
        }
        callback(newPlayer);
    });

    //Receive application to be admin
    socket.on(CHANNEL.createRoom, function(msg, callback) {
        if(controller.game.adminConnection === undefined || controller.game.adminConnection == this.id) {
            controller.game.adminConnection = this.id;
            callback(true);
        } else {
            callback(false);
        }

    });

    //Request to start the game
    socket.on(CHANNEL.startGameRequest, function(msg, callback) {
        callback(controller.game.startGame(this.id));
    });

    socket.on("disconnect", function() {
       handleDisconnect(this);
    });
}

/**
 * Handles a socket being dropped
 * @param socket
 */
function handleDisconnect(socket) {
    if(controller.game.players.get(socket.id)) {
        console.log(controller.game.players.get(socket.id).name + " is dropped.");
    }
    console.log("Socket " + socket.id + " disconnected");
}

module.exports.handle = handle;
module.exports.handleDisconnect = handleDisconnect;