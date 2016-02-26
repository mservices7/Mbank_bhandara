
// create the module and name it scotchApp
var scotchApp = angular.module('app.dd', ['ngRoute', 'ngCookies'])


scotchApp.controller('ddController', function ($rootScope, $interval, $timeout, $scope, $http, $routeParams, $location, $filter, $cookieStore) {

    $scope.CheckLogin = function () {
        if ($cookieStore.get('bankIDImg') == undefined) { $location.path('/'); }

    }

    var roughtDetails = $cookieStore.get('user');
    var imageIDData = $cookieStore.get('bankIDImg');
    $scope.imgIdDdURL = imageIDData;


    $scope.savingMenu = true;
        $scope.rd = true;
        $scope.dd = true;
        $scope.fd = true;
        $scope.saving1 = true;
   

    $scope.imgDetails = [
        {
            bankIDimg: 2,
            imgUrl: "images/bankimg/Anjali_fincorp_solution.png"
        },
        {
            bankIDimg: 1,
            imgUrl: "images/bankimg/demo.png"
        }
    ];

    var linkglobal = $cookieStore.get('urlBanks');  //Bank Bhandara

    //Today Date
    $scope.Date1 = $filter('date')(new Date(), 'dd-MM-yyyy');
    var date2 = "'" + $scope.Date1 + "'";
    //Route Data
    $scope.trxData = $routeParams.exbank_id;

   // alert(linkglobal);
 
    $http.get(linkglobal + '/View_Customer?$filter=bank_id eq ' + imageIDData + ' and trx_type eq 1')
                               .success(function (response) {
                                   var trans1 = response;
                                   var user1 = trans1.value;
                                   $scope.transDetailsAccTypes = user1;

                                   var count = user1.length;
                                   //alert(count);
                               });


    
    //for showing next 30 records..

    $scope.limit = 30;

    $scope.next = function () {
        $scope.limit = $scope.limit + 30;
    };
     
   
})
