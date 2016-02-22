
// create the module and name it scotchApp
var scotchApp = angular.module('app.search_agentss', ['ngRoute'])


scotchApp.controller('search_agentssController', function ($rootScope, $scope, $http, $routeParams, $location, $filter, $cookieStore) {
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
    $scope.trxData = $routeParams.exbank_id;

    $scope.exact_user = $routeParams.user_id;
    var exact = $scope.exact_user;

    //customer reload button
    $scope.limit = 10;
    $scope.next = function () {
        $scope.limit = $scope.limit + 10;
    };

    $http.get(linkglobal + '/agents?$filter=bank_id eq ' + imageIDData )
   .success(function (response) {
       var agent = response;
       var user = agent.value;
       $scope.agents = user;
   });

    //code for refresh

    $scope.refresh = function () {
        $scope.agents = null;

        $http.get(linkglobal + '/agents?$filter=bank_id eq ' + imageIDData + ' and trx_data ne 3')
   .success(function (response) {
       var agent = response;
       var user = agent.value;
       $scope.agents = user;
   });
    }
  

})
