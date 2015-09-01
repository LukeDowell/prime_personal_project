/**
 * Created by lukedowell on 8/25/15.
 */
var io = require('../app').io;
var Mini = require('./minigames/minigame');
var ChildProcess = require('child_process');

//Minigames
var ButtonPushGame = require('./minigames/button-push');

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
     * Handles a request to start the game
     * @param socketid
     *      The socket id making a request
     * @returns {boolean}
     *      True if game started, false otherwise
     */
    startGame: function(socketid) {
        if (!GAME.isRunning && socketid === GAME.adminConnection) {
            console.log("Starting game...");
            GAME.isRunning = true;
            GAME.runTestGame();
            return true;
        }
        return false;
    },

    /**
     * Handles a new player request
     * @param name
     *      The name of the player
     * @param socket
     *      The socket that belongs to the player
     * @returns
     *      Player object if successful, null if not
     */
    handleNewPlayer: function(name, socket) {
        var player = null;
        if(GAME.players.get(socket.id) === undefined && !GAME.isRunning) {

            player = new Player(name);
            GAME.players.set(socket.id, player);

            if(GAME.team.blue.length > GAME.team.red.length) {
                player.team = "red";
            } else if (GAME.team.red.length > GAME.team.blue.length) {
                player.team = "blue";
            } else if (Math.random() > 0.5) {
                player.team = "red";
            } else {
                player.team = "blue";
            }
            GAME.team[player.team].push(player);
            console.log("Added new player: " + player.name + " to team: " + player.team);
        }
        return player;
    },

    /**
     * Places everyone in an arbitrary game to test very basic functionality
     */
    runTestGame: function() {
        var allPlayers = [];
        for(var player of GAME.players.values()) {
            allPlayers.push(player);
        }
        var buttonPushGame = new ButtonPushGame(io, allPlayers);
        console.log(buttonPushGame);
    }
};

/**
 * Minigame pool functionality
 */
var POOL = {

    //An array of all active minigames we have running
    activeGames: []
};

/**
 * Represents a player in our game
 * @param name
 *      The player's name
 * @param socketid
 *      The player's socket id
 * @constructor
 */
function Player(name, socketid) {

    //This player's name
    this.name = name;

    //This player's socket id
    this.socketid = socketid;

    //This player's team
    this.team = null;
}

module.exports = GAME;
module.exports.POOL = POOL;