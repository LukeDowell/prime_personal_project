/**
 * Created by lukedowell on 9/1/15.
 */

//Events that pertain to this minigame
var EVENTS = {
    click: "click:"
};

app.controller('ButtonPushController', function($scope, $interval, socket) {
    $scope.clicks = 0;

    $scope.pushedButton = function() {
        $scope.clicks++;
    };

    //Send a message to the server every two seconds with how many clicks there are
    //TODO: destroy this task, interval tasks aren't destroyed automatically
    var task = $interval(function() {
        socket.emit(CHANNEL.MINIGAME, EVENTS.click + "" + $scope.clicks);
    }, 2000);
});