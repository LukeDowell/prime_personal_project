/**
 * Created by lukedowell on 8/24/15.
 */

//Index controller
app.controller("MainController", ['$scope', function($scope) {
    socket.emit("test", "Testing connection!");
}]);

//Home page controller
app.controller("HomeController", ['$scope', '$window', function($scope, $window) {

    $scope.showCreateRoom = function() {
        $window.location.href = "#createRoom";
    };

    $scope.showJoinRoom = function() {
        $window.location.href = '#joinRoom';
    };

}]);

//Create room page controller
app.controller("CreateRoomController", ['$scope', function($scope) {
    $scope.submitRoom = function(room) {
        console.log(room);
    }
}]);

//Join room page controller
app.controller("JoinRoomController", ['$scope', function($scope) {
    //Rooms available
    $scope.rooms = [];
}]);