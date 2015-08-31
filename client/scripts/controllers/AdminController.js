/**
 * Created by lukedowell on 8/27/15.
 */
app.controller("AdminController", function($scope, socket) {
    $scope.blueProgress = 33;
    $scope.redProgress = 66;
    $scope.events = [];

    $scope.startGame = function() {
        console.log("Starting game");
    };

    $scope.displayTeams = function() {
        console.log("Displaying teams");
    };

    //Apply to be the admin of this game
    socket.emit(CHANNEL.createRoom, "applicant", function(response) {
        if(response == true) {

        } else {

        }
    });

    //We receive a new event
    socket.on(CHANNEL.event, function(msg) {
        $scope.events.push(msg);
    });
});