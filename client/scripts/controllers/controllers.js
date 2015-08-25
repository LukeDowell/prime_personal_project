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
app.controller("CreateRoomController", ['$scope', '$window', function($scope, $window) {
    $scope.submitRoom = function(room) {
        socket.emit(CHANNEL.createRoom, room);
        $window.location.href = "#pendinggame";
    }
}]);

//Join room page controller
app.controller("JoinRoomController", ['$scope', '$http', function($scope, $http) {
    //Rooms available
    $scope.rooms = [];
    $http.get('/game/rooms').then(function(response) {
        console.log(response);
    });
}]);


app.controller("PendingGameController", ['$scope', function($scope) {
    $scope.teamOne = {
        testPlayer: {
            name: "Luke Dowell"
        },
        testPlayerTwo: {
            name: "Maria Stommes"
        }
    };

    $scope.teamTwo = {
        testPlayer: {
            name: "Luke Dowell"
        },
        testPlayerTwo: {
            name: "Maria Stommes"
        }
    }
}]);