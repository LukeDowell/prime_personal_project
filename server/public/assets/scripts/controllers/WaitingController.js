/**
 * Created by lukedowell on 8/27/15.
 */
app.controller("WaitingController", ['$scope', 'socket', function($scope, socket) {
    socket.on(CHANNEL.joinRoom, function(message) {
        socket.join
    });

    socket.on(CHANNEL.startGameRequest, function(msg) {
        console.log("Starting game...");
    });
}]);