/**
 * Created by lukedowell on 8/24/15.
 */
//Modules
var http = require('http');
var bodyParser = require('body-parser');
var app = require('express')();
var game = require('./game/game-controller');
var server = http.createServer(app);
var io = require('socket.io')(server);

//Routes
var routes = require('./routes/routes');

//App data
app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Start server
routes.init(app);
server.listen(app.get('port'), function() {
   console.log("Server started! Listening on port: " + app.get('port'));
});

//Socket.IO
io.on('connection', function(socket) {
    console.log("User connected: " + socket.handshake.headers['user-agent']);
    game.handleConnection(socket);
});

//Export all of our useful modules
module.exports.io = io;
module.exports.server = server;
module.exports.app = app;