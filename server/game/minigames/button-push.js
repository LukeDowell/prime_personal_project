/**
 * Created by lukedowell on 8/31/15.
 */
var Mini = require('./minigame');

var MIN_PLAYERS = 1;
var MAX_PLAYERS = 5;


function ButtonPushMinigame(io, participants) {
    Mini.Game.call(this, MIN_PLAYERS, MAX_PLAYERS, participants);

    process.on('message', function(message) {
        console.log("ButtonPushInstance: " , message);
    });
}
ButtonPushMinigame.prototype = Object.create(Mini.Game.prototype);

module.exports = ButtonPushMinigame;