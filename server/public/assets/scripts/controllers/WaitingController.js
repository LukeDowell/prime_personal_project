/**
 * Created by lukedowell on 8/27/15.
 */
app.controller("WaitingController", ['$scope', '$window', 'socket', 'properties', function($scope, $window, socket, properties) {
    $scope.playerName = properties.get('name');

    if(properties.get("waitingtext")) {
        $scope.story = properties.get("waitingtext");
    }
    socket.on(CHANNEL.MINIGAME, function(msg) {
        $window.location.href = "#buttonpush";
    });
}]);