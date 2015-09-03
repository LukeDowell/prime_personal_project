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
    this.sendJoinRequest(Mini.GAMES.BUTTON_PUSH);

    this.redPoints = 0;
    this.bluePoints = 0;
    setTimeout(function() {
        //Game is over
        this.sendToAdmin("ButtonPush over! Red team: " + this.redPoints + " -- Blue team: " + this.bluePoints);
    }, (1000 * 10));
}
ButtonPushMinigame.prototype = Object.create(Mini.Game.prototype);
ButtonPushMinigame.prototype.handleSocket = function(socket, msg, callback) {
    if(msg.event) {
        switch(msg.event) {
            case EVENT.click:
                var team = this.getPlayerBySocket(socket.id).team;
                if(team === "red") {
                    this.redPoints += parseInt(msg.data);
                } else {
                    this.bluePoints += parseInt(msg.data);
                }
                break;
            default:
                console.log("Unhandled event: " + msg.event);
                break;
        }
    }
};

module.exports = ButtonPushMinigame;