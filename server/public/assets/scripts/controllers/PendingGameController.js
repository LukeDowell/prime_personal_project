/**
 * Created by lukedowell on 8/27/15.
 */
app.controller("PendingGameController", ['$scope', 'socket', function($scope, socket) {

    $scope.redTeam = [];
    $scope.blueTeam = [];

    socket.on(CHANNEL.playerJoined, function(player) {
        console.log(player);
        if(player.team == "blue") {
            $scope.blueTeam.push(player);
        } else {
            $scope.redTeam.push(player);
        }
    });
}]);