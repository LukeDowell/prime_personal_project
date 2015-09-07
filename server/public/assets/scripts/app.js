/**
 * Created by lukedowell on 8/24/15.
 */

//Angular app
var app = angular.module('primeApp', ['ngRoute', 'ngMaterial'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/joinroom', {
                templateUrl: "/assets/views/routes/joinroom.html",
                controller: "JoinRoomController"
            })
            .when('/waiting', {
                templateUrl:  "/assets/views/routes/waiting.html",
                controller: "WaitingController"
            })
            .when('/admin', {
                templateUrl: "/assets/views/routes/admin.html",
                controller: "AdminController"
            })
            .when('/buttonpush', {
                templateUrl: "/assets/views/routes/minigames/buttonpush.html",
                controller: "ButtonPushController"
            })
            .otherwise({
                redirectTo: '/joinroom'
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
        },
        changeNamespace: function(namespace) {
            socket = io(namespace);
        }
    };
});

//Service for passing values between controllers
app.factory('properties', function() {
    var props = {};
    return {
        get: function(key) {
            return props[key];
        },
        set: function(key, value) {
            props[key] = value;
        },
        remove: function(key) {
            delete props[key];
        }
    }
});

/**
 * A container for all of our socket requests, just to keep them organized
 */
var CHANNEL = {
    MINIGAME: "minigame",
    finished: "finished",
    createRoom: "create room",
    joinRequest: "join request",
    playerJoined: "player joined",
    startGameRequest: "start game",
    event: "event",
    error: "application error"
};