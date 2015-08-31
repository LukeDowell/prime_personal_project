/**
 * Created by lukedowell on 8/29/15.
 */

var Mini = require('./minigame');

var MIN_PLAYERS = 5;
var MAX_PLAYERS = 10;

function SecretPhraseMinigame(participants) {
    Mini.Game.call(this, MIN_PLAYERS, MAX_PLAYERS, participants);
}
SecretPhraseMinigame.prototype = Object.create(Mini.Game.prototype);