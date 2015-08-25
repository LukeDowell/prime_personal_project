/**
 * Created by lukedowell on 8/24/15.
 */
var router = require('express').Router();
var io = require('../app').io;
var game = require('../game-controller');

/**
 * Receives a request to get a list of all rooms
 */
router.get('/rooms', function(req, res) {
    var roomNames = [];
    for(room in game.rooms) {
        var name = room.name;
        roomNames.push(room.name);
    }
    res.send(roomNames);
});

module.exports = router;