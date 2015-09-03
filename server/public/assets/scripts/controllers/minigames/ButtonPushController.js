/**
 * Created by lukedowell on 9/1/15.
 */

//Events that pertain to this minigame
var EVENT = {
    click: "click"
};

app.controller('ButtonPushController', function($scope, $interval, socket) {
    $scope.clicks = 0;

    $scope.pushedButton = function() {
        $scope.clicks++;
    };

    var lastClickAmount = 0;

    var task = $interval(function() {
        var amount = $scope.clicks - lastClickAmount;
        socket.emit(CHANNEL.MINIGAME, {event: EVENT.click, data: amount});
        console.log("Ping sent");
        lastClickAmount = $scope.clicks;
    }, 2000);
});