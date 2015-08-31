/**
 * Created by lukedowell on 8/24/15.
 */
//Modules
var http = require('http');
var app = require('express')();
var server = http.createServer(app);
var io = require('socket.io')(server);

//Export all of our useful modules
//There has to be a better way to export these correctly
module.exports.io = io;
module.exports.server = server;
module.exports.app = app;


var routes = require('./routes/routes');
var socketHandler = require('./routes/websocket');



//App data
app.set('port', (process.env.PORT || 5000));

//Start server
routes.init(app);
server.listen(app.get('port'), function() {
   console.log("Server started! Listening on port: " + app.get('port'));
});

io.on('connection', function(socket) {
    socketHandler.handle(socket);
});