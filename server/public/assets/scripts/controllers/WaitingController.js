/**
 * Created by lukedowell on 8/27/15.
 */
app.controller("WaitingController", ['$scope', '$window', 'socket', 'properties', function($scope, $window, socket, properties) {
    $scope.playerName = properties.get('name');

    socket.on("minigame", function() {
        $window.location.href = "#buttonpush";
    });
}]);