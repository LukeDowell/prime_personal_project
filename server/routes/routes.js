/**
 * Created by lukedowell on 8/24/15.
 */
var index = require('./index');

function init(app) {
    app.use('/', index);
    console.log("Routes initialized!");
}

module.exports.init = init;