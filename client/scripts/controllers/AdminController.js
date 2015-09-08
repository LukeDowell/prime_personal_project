/**
 * Created by lukedowell on 8/27/15.
 */
app.controller("AdminController", function($scope, socket) {

    //The code below should really be server side, ideally the admin client would just get a percentage to display
    //but whatever man this stuff is due tomorrow
    var target_score = 20;
    var bluePoints = 0;
    var redPoints = 0;

    $scope.blueProgress = 0;
    $scope.redProgress = 0;

    $scope.events = [];

    $scope.startGame = function() {
        socket.emit(CHANNEL.startGameRequest, "pls", function(response) {
            if(response == true) {
                console.log("Starting game!");
            } else {
                console.log("Not starting game... :[");
            }
        });
    };

    $scope.displayTeams = function() {
        console.log("Displaying teams");
    };

    //Apply to be the admin of this game
    socket.emit(CHANNEL.createRoom, "applicant", function(response) {
        if(response == true) {
            console.log("Admin request approved");
        } else {
            console.log("Admin request denied");
        }
    });

    //We receive a new event
    socket.on(CHANNEL.event, function(msg) {
        $scope.events.push(msg);
    });

    //we receive the scores for our only minigame
    socket.on(CHANNEL.MINIGAME, function(msg) {
        bluePoints += parseInt(msg.blue);
        redPoints += parseInt(msg.red);

        $scope.blueProgress = Math.round((bluePoints / target_score) * 100);
        $scope.redProgress = Math.round((redPoints / target_score) * 100);
        if($scope.redProgress >= 100 && $scope.blueProgress >= 100) {
            $scope.events.push("Both teams are victorious, nationalism crumbles and the world rejoices as one!"); //drama
        } else  if($scope.redProgress >= 100) {
            $scope.events.push("Red team is victorious!");
        } else if($scope.blueProgress >= 100) {
            $scope.events.push("Blue team is victorious!");
        }
    });
});