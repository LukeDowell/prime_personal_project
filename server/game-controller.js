/**
 * Created by lukedowell on 8/25/15.
 */
var io = require('./app').io;


//Stores all of our rooms
rooms = [];

/**
 * A room instance
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

    //All of our mobile connections
    this.mobileConnections = [];

    //Assign our ID and push
    this.roomId = rooms.length + 1;

    /**
     * Handles a join request to this room
     * @param socket
     */
    this.handleConnection = function(socket) {

    };

    console.log("Room: " + this.name + " created with ID: " + this.roomId);
    console.log("The room's controller is: " + adminConnection.handshake.headers['user-agent']);
    rooms.push(this);
}

/**
 * A container for all of our socket requests, just to keep them organized
 */
var CHANNEL = {
    createRoom: "create room",
    joinRoom: "join room"
};

/**
 * A handler for all of our IO stuff
 * @param socketConnection
 */
function handleConnection(socket) {

    /**
     * A create room request.
     */
    socket.on(CHANNEL.createRoom, function(msg) {
        new Room(msg, this);
    });

    socket.on(CHANNEL.joinRoom, function(msg) {

    });
}

module.exports.rooms = rooms;
module.exports.handleConnection = handleConnection;