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
        console.log("Finished Reached");
        if(task) {
            $interval.cancel(task);
            console.log("Killed interval task");
        }
        console.log("ButtonPushed finished");
        var endText = "";
        if(msg.toLowerCase() == properties.get("team")) {
            //we won!
            endText = "Congratulations " + properties.get("name") +
                ", you and your comrades have secured victory for your team. " +
                properties.get("team") + " prevails! A new mission will be coming shortly.";
        } else {
            //they won!
            //Too harsh probably
            endText = "You have failed your country and your fellow team mates. Await further orders, and do try harder this time.";
        }
        properties.set("waitingtext", endText);
        $window.location.href = "#waiting";
    });


});