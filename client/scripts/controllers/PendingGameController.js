/**
 * Created by lukedowell on 8/27/15.
 */
app.controller("PendingGameController", ['$scope', '$window', 'socket', function($scope, $window, socket) {

    $scope.redTeam = [];
    $scope.blueTeam = [];

    $scope.startGame = function() {
        socket.emit(CHANNEL.startGameRequest, "nonessential message");
        $window.location.href = "#admin"
    };

    socket.on(CHANNEL.playerJoined, function(player) {
        console.log(player);
        if(player.team == "blue") {
            $scope.blueTeam.push(player);
        } else {
            $scope.redTeam.push(player);
        }
        $scope.$apply();
    });
}]);