/**
 * Created by lukedowell on 8/27/15.
 */
app.controller("WaitingController", ['$scope', 'socket', 'properties', function($scope, socket, properties) {
    $scope.playerName = properties.get('name');
}]);