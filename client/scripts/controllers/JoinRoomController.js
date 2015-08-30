/**
 * Created by lukedowell on 8/27/15.
 */
//Join room page controller
app.controller("JoinRoomController", ['$scope', '$window', '$mdDialog', 'socket', 'properties', function($scope, $window, $mdDialog, socket, properties) {

    $scope.joinGame = function(name) {
        //TODO: scrub the name for illegal characters
        if(name === undefined || name.length <= 2) {
            $mdDialog.show(
                $mdDialog.alert()
                .clickOutsideToClose(true)
                .title("Uh oh...")
                .content("You either haven't input a name or it is too short. Try using more than 2 characters.")
                .ok("Okie dokie")
            );
        } else {
            socket.emit(CHANNEL.joinRequest, name, function(response) {
                if(response == true) {
                    properties.set('name', name);
                    $window.location.href = "#waiting";
                } else {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title("Super bummer dude")
                            .content("You were unable to join the game. \n It may have already started, or you name may be taken.")
                            .ok("Okay")
                    );
                }
            });
        }
    };
}]);