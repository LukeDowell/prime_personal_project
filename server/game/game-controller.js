/**
 * Created by lukedowell on 8/25/15.
 */
var io = require('../app').io;

//Game namespace
var GAME = {

    //Whether or not the game has started
    isRunning: false,

    //The admin socket connection
    adminConnection: undefined,

    //Player map. SocketID is key, player is value
    players: new Map(),

    //The teams. Contains socket IDs
    team: {
        red: [],
        blue: []
    },

    /**
     * Handles a new player request
     * @param name
     *      The name of the player
     * @param socket
     *      The socket that belongs to the player
     * @returns
     *      Player object if successful, false if not
     */
    handleNewPlayer: function(name, socket) {
        if(GAME.players.get(socket.id)) {
            return false;
        } else {
            var player = new Player(name);
            GAME.players.set(socket.id, player);
        }
        return player;
    }
};


/**
 * Represents a player in our game
 * @param name
 *      The player's name
 * @constructor
 */
function Player(name) {

    //This player's name
    this.name = name;

    //This player's team
    this.team = null;
}

module.exports = GAME;