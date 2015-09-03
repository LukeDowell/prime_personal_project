/**
 * Created by lukedowell on 8/31/15.
 */
var Mini = require('./minigame');

var MIN_PLAYERS = 1;
var MAX_PLAYERS = 5;

//Events that pertain to this minigame
var EVENT = {
    click: "click"
};

function ButtonPushMinigame(io, participants) {
    Mini.Game.call(this, io, MIN_PLAYERS, MAX_PLAYERS, participants);
    this.sendJoinRequest();
}
ButtonPushMinigame.prototype = Object.create(Mini.Game.prototype);
ButtonPushMinigame.prototype.handleSocket = function(socket, msg, callback) {
    if(msg.event) {
        switch(msg.event) {
            case EVENT.click:
                console.log("Receiving " + msg.data + " clicks from: " + socket.id);
                break;
            default:
                console.log("Unhandled event: " + msg.event);
                break;
        }
    }
};

module.exports = ButtonPushMinigame;