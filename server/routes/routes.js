/**
 * Created by lukedowell on 8/24/15.
 */
var index = require('./index');
var game = require('./game');

function init(app) {
    app.use('/game', game);
    app.use('/', index);
    console.log("Routes initialized!");
}

module.exports.init = init;