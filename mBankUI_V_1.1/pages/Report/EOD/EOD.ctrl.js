
// create the module and name it scotchApp
var scotchApp = angular.module('app.EOD', ['ngRoute'])


scotchApp.controller('EODController', function ($rootScope, $scope, $http, $routeParams, $location, $filter, $cookieStore) {
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
    $scope.doParseInt = function (val) {
        if (val && val != "")
            return parseInt(val);
    };
     
    //Today's Transactions
    $scope.todayDates = $filter('date')(new Date(), 'dd-MM-yyyy');
    $http.get(linkglobal + "/trxn_views?$filter=trx_dt eq " + date2 + ' and bank_id eq ' + imageIDData).success(function (response) {
        var trans1 = response; var user1 = trans1.value; $scope.todayRecordTrans = user1;
        var count = user1.length; var amt = 0; var count = user1.length;
        for (var i = 0; i < count; i++) { amt = amt + user1[i].amt; }
    });
    
    //Get Agent todays Report
    $scope.agetTodayReport = function () {
        var agentIDData = this.agentIDData;
        $http.get(linkglobal + '/trxn_views?$filter=agent_id eq ' + agentIDData + ' and trx_dt eq ' + date2 + ' and bank_id eq ' + imageIDData).success(function (response) {
            var trans1 = response; var user1 = trans1.value;
            var count = user1.length;
            var amt = 0;
            $scope.agentTodayTotalTrx = user1.length;
            var count = user1.length;
            for (var i = 0; i < count; i++) { amt = amt + user1[i].amt; $scope.agentTodayTotalColl = amt; }
        });
    }

    //Get Agent Data
    $scope.agetCustReport = function () {
        var agentIDData = this.agentIDData;
        $http.get(linkglobal + '/trxn_views?$filter=agent_id eq ' + agentIDData + ' and trx_dt eq ' + date2 + ' and bank_id eq ' + imageIDData).success(function (response) {
            var trans1 = response; var user1 = trans1.value; var count = user1.length; $scope.agentTodayTotalCust = user1;
        });
    }

    //Get Customer Todays Data
    $scope.custTodayReport = function () {
        var custIDData = this.custIDData;
        $http.get(linkglobal + '/trxn_views?$filter=cust_id eq ' + custIDData + ' and trx_dt eq ' + date2 + ' and bank_id eq ' + imageIDData)
           .success(function (response) {
               var trans1 = response;
               var user1 = trans1.value;

               var count = user1.length;
               var amt = 0;
               $scope.custTodayTotalCusts = user1.length;


               var count = user1.length;
               for (var i = 0; i < count; i++) {

                   amt = amt + user1[i].amt;
                   $scope.custTodayTotalCustsColl = amt;

               }


           });

    }

    //Get Customer Data
    $scope.custCustReport = function () {
        var custIDData = this.custIDData;
        $http.get(linkglobal + '/trxn_views?$filter=cust_id eq ' + custIDData + ' and trx_dt eq ' + date2 + ' and bank_id eq ' + imageIDData)
           .success(function (response) {
               var trans1 = response;
               var user1 = trans1.value;

               var count = user1.length;
               var amt = 0;
               $scope.custTodayTotalCust = user1;

           });

        $http.get(linkglobal + '/customers?$filter=cust_id eq ' + custIDData + ' and bank_id eq ' + imageIDData)
      .success(function (response) {
          var cust1 = response;
          var cust2 = cust1.value;
          $scope.custAddReport = cust2[0].cust_local_add;
          $scope.custMobileReport = cust2[0].cust_phno_1;


      });

    }

    $scope.filterDatesfound = [];
    //get Report By Data
    $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData)
    .success(function (response) {var dt1 = response;var dt2 = dt1.value;$scope.trxndate = dt2;var count = dt2.length;
        for (var i = 0; i <= count; i++) {
            var getDateDataRecM = (dt2[i].trx_dt).slice(-7, 5);
            var getDateDataRecD = (dt2[i].trx_dt).slice(-10, 2);
            var getDateDataRecY = (dt2[i].trx_dt).slice(-4);
            var exactDataDate = '"' + getDateDataRecM + '-' + getDateDataRecD + '-' + getDateDataRecY + '"';

            $scope.filterDatesfound.push({
                getMonths: exactDataDate,
                getMonths2: getDateDataRecM + '-' + getDateDataRecY,
                getYear: getDateDataRecY})
        }
    })

    $scope.sevenDaysCollection = [];

    var datess;
    var amtst;
    var anamse;
    var amt123 = 0;
    $scope.showBackData = function () {
        $scope.sevenDaysCollection = [];
        amt123 = 0;
        $scope.showWhenClickDate = true;

        var getDateDataRecM = ($scope.recordDates).slice(-7, 5);
        var getDateDataRecD = ($scope.recordDates).slice(-10, 2);
        var getDateDataRecY = ($scope.recordDates).slice(-4);
        var exactDataDate = '"' + getDateDataRecM + '-' + getDateDataRecD + '-' + getDateDataRecY + '"';

        var today = new Date(exactDataDate);
        for (var d = 0; d <= 7; d++) {
            var lastWeeks = new Date(today.getFullYear(), today.getMonth(), today.getDate() - d);
            var lastWeekdates = "'" + $filter('date')(lastWeeks, 'dd-MM-yyyy') + "'";

            $http.get(linkglobal + '/trxn_views?$filter=trx_dt eq ' + lastWeekdates + ' and bank_id eq ' + imageIDData).success(function (response) {
                var trx = response;
                var transaction = trx.value;
                $scope.datedata = transaction;
                var datedata = $scope.datedata;
                var count = transaction.length;
                for (var i = 0; i < count; i++) {
                    $scope.sevenDaysCollection.push({
                        datess: datedata[i].trx_dt,
                        amtst: datedata[i].amt,
                        anamse: datedata[i].agent_name
                    });

                    amt123 = amt123 + datedata[i].amt;
                    $scope.amountFound = amt123;
                }
            });
        }
    }

    //Show Record in Month Selection
    $scope.monDaysCollection = [];

    var mdatess;
    var mamtst;
    var manamse;
    var mamt123 = 0;
    $scope.showMonthsData = function () {

        $scope.monDaysCollection = [];
        mamt123 = 0;
        $scope.showWhenClickMon = true;
        var getDateDataRecM = ($scope.recordMonts).slice(-11, 3);
        var getDateDataRecY = ($scope.recordMonts).slice(-5, 11);
        var foundata = getDateDataRecM + '-' + getDateDataRecY;

        $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData).success(function (response) {
            var trx = response;
            var datedata = trx.value;
            var count = datedata.length;

            for (var i = 0; i < count; i++) {
                var getServerYear = (datedata[i].trx_dt).slice(-7);
                if (getServerYear == foundata) {
                    $scope.monDaysCollection.push({
                        manamse: datedata[i].agent_name,
                        mdatess: datedata[i].trx_dt,
                        mamtst: datedata[i].amt
                    })
                    mamt123 = mamt123 + datedata[i].amt;
                }
                $scope.amountFFound = mamt123;
            }
        })
    }


    //Show Record By Year
    $scope.yearDaysCollection = [];

    var ymdatess;
    var ymamtst;
    var ymanamse;
    var ymamt123 = 0;
    $scope.showYearData = function () {
        $scope.yearDaysCollection = [];
        ymamt123 = 0;
        $scope.showWhenClickYear = true;

        $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData).success(function (response) {
            var trx = response;
            var datedata = trx.value;
            var count = datedata.length;
            for (var i = 0; i < count; i++) {
                var getServerYear = (datedata[i].trx_dt).slice(-4);
                if (getServerYear == $scope.recordYear) {
                    $scope.yearDaysCollection.push({
                        ymanamse: datedata[i].agent_name,
                        ymdatess: datedata[i].trx_dt,
                        ymamtst: datedata[i].amt
                    })
                    ymamt123 = ymamt123 + datedata[i].amt;
                }
                $scope.amountYFound = ymamt123;
            }

        });
    }



    //Show Record Beetween Two Dates

    $scope.beetWDaysCollection = [];

    var bdatess;
    var bamtst;
    var banamse;
    var bamt123 = 0;

    $scope.showBeetwData = function () {
        var date1 = $filter('date')($scope.sdates, 'yyyy-MM-dd');
        var date2 = $filter('date')($scope.edates, 'yyyy-MM-dd');
        // First we split the values to arrays date1[0] is the year, [1] the month and [2] the day
        date1 = date1.split('-');
        date2 = date2.split('-');
        // Now we convert the array to a Date object, which has several helpful methods
        date1 = new Date(date1[0], date1[1], date1[2]);
        date2 = new Date(date2[0], date2[1], date2[2]);
        // We use the getTime() method and get the unixtime (in milliseconds, but we want seconds, therefore we divide it through 1000)
        date1_unixtime = parseInt(date1.getTime() / 1000);
        date2_unixtime = parseInt(date2.getTime() / 1000);
        // This is the calculated difference in seconds
        var timeDifference = date2_unixtime - date1_unixtime;
        // in Hours
        var timeDifferenceInHours = timeDifference / 60 / 60;
        // and finaly, in days :)
        var timeDifferenceInDays = timeDifferenceInHours / 24;
        $scope.beetWDaysCollection = [];
        bamt123 = 0;
        $scope.showWhenClickBDate = true;
        var dateDetailsHere = $filter('date')($scope.edates, 'dd-MM-yyyy');
        var getDateDataRecM = (dateDetailsHere).slice(-7, 5);
        var getDateDataRecD = (dateDetailsHere).slice(-10, 2);
        var getDateDataRecY = (dateDetailsHere).slice(-4);
        var exactDataDate = '"' + getDateDataRecM + '-' + getDateDataRecD + '-' + getDateDataRecY + '"';
        var today = new Date(exactDataDate);
        // alert(today + '' + getDateDataRecM + '-' + getDateDataRecD + '-' + getDateDataRecY);
        for (var d = 0; d <= timeDifferenceInDays; d++) {
            var lastWeeks = new Date(today.getFullYear(), today.getMonth(), today.getDate() - d);
            var lastWeekdates = "'" + $filter('date')(lastWeeks, 'dd-MM-yyyy') + "'";

            $http.get(linkglobal + '/trxn_views?$filter=trx_dt eq ' + lastWeekdates + ' and bank_id eq ' + imageIDData).success(function (response) {
                var trx = response;
                var datedata = trx.value;
                var count = datedata.length;
                for (var i = 0; i < count; i++) {
                    $scope.beetWDaysCollection.push({
                        bdatess: datedata[i].trx_dt,
                        bamtst: datedata[i].amt,
                        banamse: datedata[i].agent_name
                    });
                    bamt123 = bamt123 + datedata[i].amt;
                    $scope.amountDBFound = bamt123;
                }
            });
        }
    }
})
