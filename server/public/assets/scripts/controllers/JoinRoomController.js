/**
 * Created by lukedowell on 8/27/15.
 */
//Join room page controller
app.controller("JoinRoomController", ['$scope', '$http', '$window', 'socket', function($scope, $http, $window, socket) {
    //Rooms available
    $scope.rooms = [];

    $http.get('/game/rooms').then(function(response) {
        $scope.rooms = response.data;
    });

    $scope.joinRoom = function(roomName) {
        var name = $scope.player.name;
        socket.emit(CHANNEL.joinRoom, [roomName, name]);
        $window.location.href = "#waiting";
    };
}]);