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
            .when('/createRoom', {
                templateUrl: "/assets/views/routes/createRoom.html",
                controller: "CreateRoomController"
            })
            .when('/joinRoom', {
                templateUrl: "/assets/views/routes/joinRoom.html",
                controller: "JoinRoomController"
            })
            .when('/pendinggame', {
                templateUrl: "/assets/views/routes/pendinggame.html",
                controller: "PendingGameController"
            })
            .otherwise({
                redirectTo: '/home'
            })
    }]);

//Socket.io client
var socket = io();

/**
 * A container for all of our socket requests, just to keep them organized
 */
var CHANNEL = {
    createRoom: "create room",
    joinRoom: "join room"
};