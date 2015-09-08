/**
 * Created by lukedowell on 9/1/15.
 */

//Events that pertain to this minigame
var EVENT = {
    click: "click"
};

app.controller('ButtonPushController', function($scope, $interval, $window,  socket, properties) {
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

    socket.on(CHANNEL.finished, function(msg) {
        if(task) {
            $interval.cancel(task);
            console.log("Killed interval task");
        }
        var endText = "";
        if(msg.toLowerCase() == properties.get("team")) {
            //we won!
            endText = "Congratulations " + properties.get("name") +
                ", you and your comrades have secured victory for your team. " +
                properties.get("team") + " prevails! A new mission will be coming shortly.";
        } else {
            //they won!
            endText = "The enemy is victorious! We must do better...await further orders.";
        }
        properties.set("waitingtext", endText);
        console.log("ButtonPushed finished");
        $window.location.href = "#waiting";
    });


});