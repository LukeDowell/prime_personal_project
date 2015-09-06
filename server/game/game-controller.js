/**
 * Created by lukedowell on 8/25/15.
 */
var io = require('../app').io;
var Mini = require('./minigames/minigame');
var ChildProcess = require('child_process');

//Minigames
var ButtonPushGame = require('./minigames/button-push');

//Game namespace
var game = {

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
        if (!game.isRunning && socketid === game.adminConnection) {
            console.log("Starting game...");
            game.isRunning = true;
            game.runTestGame();
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
        if(game.players.get(socket.id) === undefined && !game.isRunning) {

            player = new Player(name, socket.id);
            game.players.set(socket.id, player);

            if(game.team.blue.length > game.team.red.length) {
                player.team = "red";
            } else if (game.team.red.length > game.team.blue.length) {
                player.team = "blue";
            } else if (Math.random() > 0.5) {
                player.team = "red";
            } else {
                player.team = "blue";
            }
            game.team[player.team].push(player);
            console.log("Added new player: " + player.name + " to team: " + player.team);
        }
        return player;
    },

    /**
     * Places everyone in an arbitrary game to test very basic functionality
     */
    runTestGame: function() {

        var allPlayers = [];
        for(var player of game.players.values()) {
            allPlayers.push(player);
        }
        var buttonPushGame = new ButtonPushGame(io, game.adminConnection, allPlayers);
        var gameInstance = new GameInstance(buttonPushGame, allPlayers);
        pool.activeGames.push(gameInstance);
    }
};

/**
 * Minigame pool functionality
 */
var pool = {

    //An array of GameInstances
    activeGames: [],

    /**
     * Gets the game instance that owns a particular socket
     * @param socketid
     * @returns {*}
     */
    getInstanceForSocket: function(socketid) {
        for(var i = 0, length = pool.activeGames.length; i < length; i++) {
            if(pool.activeGames[i].containsSocket(socketid)) {
                return pool.activeGames[i];
            }
        }
        return null;
    }
};

/**
 * Represents an instance of a minigame
 * @param minigame
 *      The actual minigame this instance contains
 * @param players
 *      The players that are a part of the minigame
 * @constructor
 */
function GameInstance(minigame, players) {
    this.minigame = minigame;
    this.players = players;

    /**
     * Checks whether or not this game instance has a specific socket id
     * @param socketid
     * @returns {boolean}
     */
    this.containsSocket = function(socketid) {
        for(var i = 0, length = this.players.length; i < length; i++) {
            if(this.players[i].socketid === socketid) {
                return true;
            }
        }
        return false;
    }
}

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

module.exports.game = game;
module.exports.pool = pool;