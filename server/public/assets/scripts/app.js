/**
 * Created by lukedowell on 8/24/15.
 */

//Angular app
var app = angular.module('primeApp', ['ngRoute', 'ngMaterial'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: "/assets/views/routes/home.html",
                controller: "HomeController"
            })
            .when('/createroom', {
                templateUrl: "/assets/views/routes/createroom.html",
                controller: "CreateRoomController"
            })
            .when('/joinroom', {
                templateUrl: "/assets/views/routes/joinroom.html",
                controller: "JoinRoomController"
            })
            .when('/pendinggame', {
                templateUrl: "/assets/views/routes/pendinggame.html",
                controller: "PendingGameController"
            })
            .when('/admin', {
                templateUlr: "/assets/views/routes/admin.html",
                controller: "AdminController"
            })
            .otherwise({
                redirectTo: '/home'
            })
    }]);

//Create a service for socket.io
app.factory('socket', function($rootScope) {
    var socket = io();
    return {
        on: function(eventName, callback) {
            socket.on(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    if(callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        }
    };
});

/**
 * A container for all of our socket requests, just to keep them organized
 */
var CHANNEL = {
    createRoom: "create room",
    joinRoom: "join room",
    playerJoined: "player joined"
};