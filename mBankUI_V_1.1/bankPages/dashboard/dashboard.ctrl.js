
// create the module and name it app
var app = angular.module('app.dashboard', ['ngRoute']);

// create the controller and inject Angular's $scope
app.controller('dashboardController', function ($rootScope, $scope, $http, $location, $routeParams, $filter) {

    $scope.dashboard = 'Dashboard';


    $scope.login = function () {
        alert('You Login');
    }

});
