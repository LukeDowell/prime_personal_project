/**
 * Created by lukedowell on 8/25/15.
 */
var app = require('../app');
var io = app.io;

//Stores all of our rooms
rooms = [];

/**
 * Finds a room with a given name, case insensitive
 * @param name
 *      The name of the room to find
 * @returns {*}
 *      A Room, null if no rooms match
 */
function findRoom(name) {
    for(var i = 0; i < rooms.length; i++) {
        if(rooms[i].name === name) {
            return rooms[i];
        }
    }
    return null;
}

/**
 * A game instance
 * @param room
 * @param adminConnection
 *
 * @constructor
 */
function Room(room, adminConnection) {

    //Our room's name
    this.name = room.name;

    //Our admin's socket
    this.adminConnection = adminConnection;

    //All of our player connections. Socket id is key, player object is value
    this.players = new Map();

    //Assign our ID
    this.roomId = rooms.length + 1;

    //Whether or not this game is running
    this.isRunning = false;

    //Our teams
    this.team = {
        red: [],
        blue: []
    };

    //////////////////////////
    ////Namespace Events//////
    //////////////////////////

    this.channel.on('test', function(message) {
        console.log(message);
    });

    console.log("Room: " + this.name + " created with ID: " + this.roomId);
    console.log("The room's controller is socket: " + adminConnection.id);
    rooms.push(this);
}
Room.prototype.broadcast = function(path, msg) {

};

/**
 * Handles a join request to this room
 */
Room.prototype.assignNewPlayer = function(player, socket) {
    if(this.team.blue.length > this.team.red.length) {
        //Blue has more people
        player.team = "red";
    } else if(this.team.red.length > this.team.blue.length) {
        //Red has more people
        player.team = "blue";
    } else {
        //They are tied
        if(Math.random() > 0.5) {
            //Assign to blue
            player.team = "blue";
        } else {
            //Assign to red
            player.team = "red";
        }
    }

    //Add to whatever team
    this.team[player.team].push(player);
    this.players.set(socket.id, player);
    this.adminConnection.emit(CHANNEL.playerJoined, player);
    console.log("Adding " + player.name + " to room: " + this.name + " on team: " + player.team);
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

/**
 * A container for all of our socket requests, just to keep them organized
 */
var CHANNEL = {
    createRoom: "create room",
    joinRoom: "join room",
    playerJoined: "player joined",
    startGameRequest: "start game",
    error: "application error"
};

/**
 * Socket entry point
 */
io.on('connection', function(socket) {
    console.log("Socket connected: " + socket.id);

    /**
     * A create room request.
     */
    socket.on(CHANNEL.createRoom, function(msg) {
        new Room(msg, this);
    });

    /**
     * A join room request
     */
    socket.on(CHANNEL.joinRoom, function(msg) {
        //a join room request is an array, [roomname, playername]
        var room = findRoom(msg[0]);
        if(room) {
            if(msg[1]) {
                var playerName = msg[1];
                var player = new Player(playerName);
                room.assignNewPlayer(player, this);
            }
        }
    });
});

module.exports.rooms = rooms;
module.exports.Room = Room;