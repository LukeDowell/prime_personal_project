/**
 * Created by lukedowell on 8/27/15.
 */
app.controller("AdminController", function($scope, socket) {
    $scope.blueProgress = 0;
    $scope.redProgress = 0;
    $scope.events = [];

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