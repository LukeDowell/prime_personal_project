/**
 * Created by lukedowell on 8/27/15.
 */
//Home page controller
app.controller("HomeController", ['$scope', '$window', function($scope, $window) {

    $scope.showCreateRoom = function() {
        $window.location.href = "#createroom";
    };

    $scope.showJoinRoom = function() {
        $window.location.href = '#joinroom';
    };

}]);