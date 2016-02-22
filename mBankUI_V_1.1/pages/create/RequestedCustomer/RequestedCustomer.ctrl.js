
// create the module and name it scotchApp
var scotchApp = angular.module('app.RequestedCustomer', ['ngRoute'])


scotchApp.controller('RequestedCustomerController', function ($rootScope, $scope, $http, $routeParams, $location, $filter, $cookieStore) {
    $scope.CheckLogin = function () {if ($cookieStore.get('bankIDImg') == undefined) { $location.path('/'); }

    }

    var roughtDetails = $cookieStore.get('user');
    var imageIDData = $cookieStore.get('bankIDImg');
    $scope.imgIdDdURL = imageIDData;


    var linkglobal = $cookieStore.get('urlBanks');  //Bank Bhandara

    //Today Date
    $scope.Date1 = $filter('date')(new Date(), 'dd-MM-yyyy');
    var date2 = "'" + $scope.Date1 + "'";
    //Route Data
    
    $scope.limit = 10;
    $scope.next = function () {
        $scope.limit = $scope.limit + 10;
    };
    //Get Requested Customer 
    $http.get(linkglobal + '/CustomerAccounts?$filter=bank_id eq ' + imageIDData + ' and status eq ' + 0).success(function (response) {
        var cust1 = response; var cust2 = cust1.value; $scope.reqcustomers = cust2;

});



})
