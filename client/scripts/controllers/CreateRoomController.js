/**
 * Created by lukedowell on 8/27/15.
 */
//Create room page controller
app.controller("CreateRoomController", ['$scope', '$window', 'socket', function($scope, $window, socket) {
    $scope.submitRoom = function(room) {
        socket.emit(CHANNEL.createRoom, room);
        $window.location.href = "#pendinggame";
    }
}]);