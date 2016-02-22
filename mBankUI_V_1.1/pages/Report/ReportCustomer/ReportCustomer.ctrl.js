
// create the module and name it scotchApp
var scotchApp = angular.module('app.ReportCustomer', ['ngRoute'])


scotchApp.controller('ReportCustomerController', function ($rootScope, $scope, $http, $routeParams, $location, $filter, $cookieStore) {
    $scope.CheckLogin = function () {if ($cookieStore.get('bankIDImg') == undefined) { $location.path('/'); }

    }


    var roughtDetails = $cookieStore.get('user');
    var imageIDData = $cookieStore.get('bankIDImg');
    $scope.imgIdDdURL = imageIDData;


    var linkglobal = $cookieStore.get('urlBanks');  //Bank Bhandara

    $scope.limit = 30;

    $scope.limitTo = function () {
        $scope.limit = $scope.limit + 30;
    }
    //Today Date
    $scope.Date1 = $filter('date')(new Date(), 'dd-MM-yyyy');
    var date2 = "'" + $scope.Date1 + "'";
    //Route Data
    $scope.trxData = $routeParams.exbank_id;

    $scope.exact_user = $routeParams.user_id;
    var exact = $scope.exact_user;

    //customer reload button
    $scope.doParseInt = function (val) {
        if (val && val != "")
            return parseInt(val);
    };

    //Requested Customer
    $http.get(linkglobal + '/customers?$filter=bank_id eq ' + imageIDData).success(function (response) { var cust1 = response; var cust2 = cust1.value; $scope.customers = cust2; var count = cust2.length; });

    //Get Customer Record
    $scope.getCustAllData = function () {
        var custRedId = this.custId;
        var agetRecord = this.agetRecord;
        $scope.tillDateTransaction = '';
        $http.get(linkglobal + '/agents?$filter=agent_id eq ' + agetRecord + ' and bank_id eq ' + imageIDData).success(function (response) { var cust1 = response; var cust2 = cust1.value; $scope.reportCustAgent = cust2[0].agent_name; });
        $http.get(linkglobal + '/trxn_views?$filter=cust_id eq ' + custRedId + ' and bank_id eq ' + imageIDData).success(function (response) { var cust1 = response; var cust2 = cust1.value; var count = cust2.length; var amt = 0; for (var i = 0; i <= count; i++) { amt = amt + cust2[i].amt; $scope.tillDateTransaction = amt; } });
    }


})
