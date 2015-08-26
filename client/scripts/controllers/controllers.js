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
        $window.location.href = "#createroom";
    };

    $scope.showJoinRoom = function() {
        $window.location.href = '#joinroom';
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

    $scope.joinRoom = function(roomName) {
        var name = $scope.player.name;
        socket.emit(CHANNEL.joinRoom, [roomName, name]);
    };

    $http.get('/game/rooms').then(function(response) {
        $scope.rooms = response.data;
    })
}]);


app.controller("PendingGameController", ['$scope', function($scope) {

    $scope.redTeam = [];

    $scope.blueTeam = [];

    socket.on(CHANNEL.playerJoined, function(player) {
        if(player.team === "blue") {
            if($scope.redTeam.includes(player) === -1) {
                $scope.redTeam.push(player);
            }
        } else {
            if($scope.blueTeam.indexOf(name) === -1) {
                $scope.blueTeam.push(player);
            }
        }
    });
}]);