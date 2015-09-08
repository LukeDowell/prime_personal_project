/**
 * Created by lukedowell on 8/31/15.
 */
var Mini = require('./minigame');

var MIN_PLAYERS = 1;
var MAX_PLAYERS = 5;

//How long the game should run in milliseconds
var GAME_TIME = 1000 * 15;

//Events that pertain to this minigame
var EVENT = {
    click: "click"
};

function ButtonPushMinigame(io, adminConnection, participants) {
    Mini.Game.call(this, io, adminConnection, MIN_PLAYERS, MAX_PLAYERS, participants);
    this.sendJoinRequest(Mini.GAMES.BUTTON_PUSH);

    this.redPoints = 0;
    this.bluePoints = 0;
    setTimeout(function(game) {
        //Game is over
        game.sendToAdmin(global.CHANNEL.event, "ButtonPush over! Red team: " + game.redPoints + " -- Blue team: " + game.bluePoints);
        game.sendToAdmin(global.CHANNEL.MINIGAME, {blue: game.bluePoints, red: game.redPoints});
        var winningTeam = "";
        if(game.bluePoints > game.redPoints) {
            winningTeam = "blue";
        } else if(game.redPoints > game.bluePoints) {
            winningTeam = "red";
        } else {
            //Everyone loses
            winningTeam = "nobody";
        }
        game.broadcast(global.CHANNEL.finished, winningTeam);
        game.isRunning = false;
    }, (GAME_TIME), this);
}
ButtonPushMinigame.prototype = Object.create(Mini.Game.prototype);
ButtonPushMinigame.prototype.handleSocket = function(socket, msg, callback) {
    if(msg.event) {
        switch(msg.event) {

            //The client is sending the number of clicks they have made in the last few seconds
            case EVENT.click:
                var team = this.getPlayerBySocket(socket.id).team;
                if(team === "red") {
                    this.redPoints += parseInt(msg.data);
                } else {
                    this.bluePoints += parseInt(msg.data);
                }
                break;

            //Shouldn't ever happen, probably famous last words though
            default:
                console.log("Unhandled event: " + msg.event + ", msg: " + msg.data);
                break;
        }
    }
};

module.exports = ButtonPushMinigame;