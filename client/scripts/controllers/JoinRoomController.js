/**
 * Created by lukedowell on 8/27/15.
 */
//Join room page controller
app.controller("JoinRoomController", ['$scope', '$http', 'socket', function($scope, $http, socket) {
    //Rooms available
    $scope.rooms = [];

    $scope.joinRoom = function(roomName) {
        var name = $scope.player.name;
        socket.emit(CHANNEL.joinRoom, [roomName, name]);
    };

    $http.get('/game/rooms').then(function(response) {
        $scope.rooms = response.data;
    })
}]);