
// create the module and name it scotchApp
var scotchApp = angular.module('app.rd', ['ngRoute', 'ngCookies'])


scotchApp.controller('rdController', function ($rootScope, $interval, $timeout, $scope, $http, $routeParams, $location, $filter, $cookieStore) {

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


    $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData + ' and trx_data eq 2')
                               .success(function (response) {
                                   var trans1 = response;
                                   var user1 = trans1.value;
                                   $scope.transDetailsAccTypes = user1;

                                   var count = user1.length;
                                   //alert(count);
                               });










    /////rohit
    $scope.customerDetails = function () {

        alert(this.ID);
        var custmerId = this.ID;
        $scope.customerDetails = false;
        $scope.customerinfo = true;
        $scope.divCustomerAccountDetails = true;



        $http.get(linkglobal + '/accounts?$filter=cust_id eq ' + custmerId).success(function (response) {
            var cust1 = response; var cust2 = cust1.value; $scope.customers = cust2; var count = cust2.length;
            var gettrxDetails = cust2[0].trx_type;
            $http.get(linkglobal + '/trxn_views?$filter=cust_id eq ' + custmerId + ' and trx_data eq ' + gettrxDetails).success(function (response) {
                var customer1 = response;
                var customer2 = customer1.value;
                $scope.datadetails = customer2;
                var count = customer2.length;

                $scope.gettrxDetails = customer2[0].trx_data;

                $scope.gettrxDetails = customer2[0].trx_data;
                $scope.getDetails = customer2[0].trx_data;
                console.log(gettrxDetails);

            });
        });

        custmerId = null;

    }




    //customer Search
    $scope.customerName = function () {

        // alert('working...');


        // $location.path('/dd');

        $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData + ' and trx_data eq 2')
                               .success(function (response) {
                                   var trans1 = response;
                                   var user1 = trans1.value;
                                   $scope.transDetailsAccTypes = user1;

                                   var count = user1.length;
                               });



    }
})
