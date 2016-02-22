
// create the module and name it scotchApp
var scotchApp = angular.module('app.ReportAgent', ['ngRoute'])


scotchApp.controller('ReportAgentController', function ($rootScope, $scope, $http, $routeParams, $location, $filter, $cookieStore) {
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

    //Get Agent Data
    $http.get(linkglobal + '/agents?$filter=bank_id eq ' + imageIDData).success(function (response) {var agent = response;var user = agent.value;$scope.agents = user;});

    //Get Record Report
    $scope.getAgentAllData = function () {
        var agentRecId = this.agentRecId;
        $scope.tillDateAgentTransaction = '';
        $http.get(linkglobal + '/customers?$filter=agent_id eq ' + agentRecId + ' and bank_id eq ' + imageIDData).success(function (response) { var cust1 = response; var cust2 = cust1.value; $scope.agentRecordCustomers = cust2.length; });
        $http.get(linkglobal + '/trxn_views?$filter=agent_id eq ' + agentRecId + ' and bank_id eq ' + imageIDData).success(function (response) { var cust1 = response; var cust2 = cust1.value; var count = cust2.length; var amt = 0; for (var i = 0; i <= count; i++) { amt = amt + cust2[i].amt; $scope.tillDateAgentTransaction = amt; } });

        for (var d = 0; d <= 7; d++) {

            var amtdd = 0; var today = new Date();
            var lastWeeks = new Date(today.getFullYear(), today.getMonth(), today.getDate() - d);
            var lastWeekdates = $filter('date')(lastWeeks, 'dd-MM-yyyy');
            $http.get(linkglobal + "/trx_details?$filter=trx_dt eq '" + lastWeekdates + "' and agent_id eq " + agentRecId + ' and bank_id eq ' + imageIDData).success(function (response) { var trx = response; var transaction = trx.value; var count = transaction.length; amtdd = amtdd + transaction[0].amt; })
                .success(function () { $scope.weekAgentCollectionDAte = amtdd; });
        }
    }
})
