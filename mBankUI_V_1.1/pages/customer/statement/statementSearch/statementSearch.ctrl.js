
// create the module and name it scotchApp
var scotchApp = angular.module('app.statementSearch', ['ngRoute', 'ngCookies'])


scotchApp.controller('statementSearchController', function ($rootScope, $interval, $timeout, $scope, $http, $routeParams, $location, $filter, $cookieStore) {

    $scope.CheckLogin = function () {
        if ($cookieStore.get('bankIDImg') == undefined) { $location.path('/'); }

    }
    //alert('working..');
    var roughtDetails = $cookieStore.get('user');
    var imageIDData = $cookieStore.get('bankIDImg');
    $scope.imgIdDdURL = imageIDData;
    $scope.CustId = $routeParams.Cust_ID;

    //alert($scope.imgIdDdURL);
    $scope.saving = true;

    $scope.serachConditionDiv = true;
    $scope.showRecordsDiv = false;
    $scope.backDiv = false;
    $scope.fromTodate = false;

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

    $http.get(linkglobal + '/View_Customer?$filter=cust_id eq ' + $scope.CustId + 'and bank_id eq ' + imageIDData).success(function (response) {
        var cust1 = response;
        var cust2 = cust1.value;
        var customer2 = cust2;
        // console.log('Data=' + customer2);
        var count = cust2.length;
        $scope.txtcust_name = customer2[0].cust_name;
        $scope.txtcust_phoneno = customer2[0].cust_phno_1;
        $scope.txtcust_emailId = customer2[0].cust_email_id;
        $scope.txtcust_accNo = customer2[0].external_account_id;

    })

    $scope.Back = function () {
        $scope.serachConditionDiv = true;
        $scope.showRecordsDiv = false;
        $scope.backDiv = false;
        $scope.fromTodate = false;

    }

    $scope.BackToDetails = function () {
        // alert('work');
        $location.path('acc_detail/' + $scope.CustId);
    }
    $scope.LastMonth = function () {
        $scope.serachConditionDiv = false;
        $scope.showRecordsDiv = true;
        $scope.backDiv = true;
        $scope.fromTodate = false;

        $scope.CustomerRecordStatement = [];




        var today = new Date();
        var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 31, 0);

        $http.get(linkglobal + '/trxn_views?$filter=cust_id eq ' + $scope.CustId + ' and bank_id eq ' + imageIDData)
            .success(function (response) {
                var trx = response;
                var datedata = trx.value;
                var count = datedata.length;
                // console.log(datedata);
                for (var i = 31; i >= 0; i--) {
                    var day = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i, 0);
                    var transactionDate = $filter('date')(day, 'dd-MM-yyyy');

                    for (var x = 0; x < count; x++) {
                        if (datedata[x].trx_dt == String(transactionDate)) {
                            if (datedata[x].trx_type == "dbt") {
                                $scope.CustomerRecordStatement.push({
                                    Date: datedata[x].trx_dt,
                                    Debit: datedata[x].amt,
                                    Credit: 0.0,
                                    Balance: datedata[x].trx_balance

                                })
                            }
                            else
                            {
                                $scope.CustomerRecordStatement.push({
                                    Date: datedata[x].trx_dt,
                                    Debit: 0.0,
                                    Credit: datedata[x].amt,
                                    Balance: datedata[x].trx_balance

                                })
                            }
                        }
                    }
                }
            })

    }


    $scope.LastThreeMonth = function () {

        $scope.serachConditionDiv = false;
        $scope.showRecordsDiv = true;
        $scope.backDiv = true;
        $scope.fromTodate = false;

        $scope.CustomerRecordStatement = [];




        var today = new Date();
        var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 93, 0);



        // alert(today);
        //  alert(lastDayOfMonth);

        $http.get(linkglobal + '/trxn_views?$filter=cust_id eq ' + $scope.CustId + ' and bank_id eq ' + imageIDData)
             .success(function (response) {
                 var trx = response;
                 var datedata = trx.value;
                 var count = datedata.length;


                 for (var i = 93; i >= 0; i--) {
                     var day = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i, 0);
                     var transactionDate = $filter('date')(day, 'dd-MM-yyyy');

                     //  alert(transactionDate);
                     // console.log(transactionDate);
                     //alert(today.getFullYear());
                     //alert(today.getMonth());
                     // alert(foundata);
                     // $http.get(linkglobal + '/trxn_views?$filter=cust_id eq ' + $scope.CustId + ' and bank_id eq ' + imageIDData + ' and trx_dt eq ' + String(transactionDate)).success(function (response)
                     // $http.get(linkglobal + '/trxn_views?$filter=cust_id eq ' + $scope.CustId + ' and bank_id eq ' + imageIDData + ' and trx_dt+eq+%27' + transactionDate + '%27').success(function (response) {

                     //$http.get(linkglobal + '/trxn_views?$filter=trx_dt+eq+%27' + transactionDate + '%27 and cust_id eq ' + $scope.CustId + ' and bank_id eq ' + imageIDData).success(function (response) {
                     //    var trx = response;
                     //    var datedata = trx.value;
                     //    var count = datedata.length;

                     for (var x = 0; x < count; x++) {
                         if (datedata[x].trx_dt == String(transactionDate)) {
                             if (datedata[x].trx_type == "dbt") {
                                 $scope.CustomerRecordStatement.push({
                                     Date: datedata[x].trx_dt,
                                     Debit: datedata[x].amt,
                                     Credit: 0.0,
                                     Balance: datedata[x].trx_balance

                                 })
                             }
                             else {
                                 $scope.CustomerRecordStatement.push({
                                     Date: datedata[x].trx_dt,
                                     Debit: 0.0,
                                     Credit: datedata[x].amt,
                                     Balance: datedata[x].trx_balance

                                 })
                             }
                         }
                     }

                     // })

                 }
             })
    }

    $scope.formatString = function (format) {
        var day = parseInt(format.substring(0, 2));
        var month = parseInt(format.substring(3, 5));
        var year = parseInt(format.substring(6, 10));
        var date = new Date(year, month - 1, day);
        return date;
    }


    $scope.Ok = function () {

        if (this.fromdate == null || this.fromdate == "" || this.todate == null || this.todate == "") {

            if (this.fromdate == null || this.fromdate == "") {
                alert('Please Select The From Date!!!..');
            }
            else if (this.todate == null || this.todate == "") {
                alert('Please Select The To Date!!!..');
            }
            //alert('Please Select The Date!!!..');
        }
        else {
            $scope.serachConditionDiv = false;
            $scope.showRecordsDiv = true;
            $scope.backDiv = true;
            $scope.fromTodate = true;
            $scope.CustomerRecordStatement = [];


            $scope.fromDate = $filter('date')(this.fromdate, 'dd-MM-yyyy');
            $scope.toDate = $filter('date')(this.todate, 'dd-MM-yyyy');

            var transactionType = $scope.trancationType;

            //alert(transactionType);


            var date2 = new Date($scope.formatString($scope.toDate));
            var date1 = new Date($scope.formatString($scope.fromDate));
            var timeDiff = Math.abs(date2.getTime() - date1.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

            // alert(diffDays);

            //alert(fromDate);
            //alert(toDate);
            var today = this.fromdate;
            var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate() + diffDays, 0);


            //************************************************************************//////////
            if (transactionType == "" || transactionType == null) {
                alert('Please Select Transaction !!!...');
                $scope.serachConditionDiv = true;
                $scope.showRecordsDiv = false;
                $scope.backDiv = false;

            }
                ////If Trnsaction Type is All
            else if (transactionType == "All") {

                //   alert(transactionType)


                $http.get(linkglobal + '/trxn_views?$filter=cust_id eq ' + $scope.CustId + ' and bank_id eq ' + imageIDData)
                    .success(function (response) {
                        var trx = response;
                        var datedata1 = trx.value;
                        var count = datedata1.length;
                        console.log(datedata1);

                        for (var i = diffDays; i >= 0; i--) {
                            var day = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i, 0);
                            var transactionDate = $filter('date')(day, 'dd-MM-yyyy');



                            //  alert(transactionDate);
                            for (var x = 0; x < count; x++) {
                                if (datedata1[x].trx_dt == String(transactionDate)) {


                                    if (datedata1[x].trx_type == "dbt") {
                                        $scope.CustomerRecordStatement.push({
                                            Date: datedata1[x].trx_dt,
                                            Debit: datedata1[x].amt,
                                            Credit: 0.0,
                                            Balance: datedata1[x].trx_balance

                                        })
                                    }
                                    else {
                                        $scope.CustomerRecordStatement.push({
                                            Date: datedata1[x].trx_dt,
                                            Debit: 0.0,
                                            Credit: datedata1[x].amt,
                                            Balance: datedata1[x].trx_balance

                                        })
                                    }
                                }

                            }


                        }
                    });
            }


                ////If Trnsaction Type is Debit
            else if (transactionType == "dbt") {


                // alert(transactionType)
                $http.get(linkglobal + '/trxn_views?$filter=cust_id eq ' + $scope.CustId + ' and bank_id eq ' + imageIDData + 'and trx_type+eq+%27dbt%27')
                    .success(function (response) {
                        var trx = response;
                        var datedata1 = trx.value;
                        var count = datedata1.length;
                        console.log(datedata1);

                        for (var i = diffDays; i >= 0; i--) {
                            var day = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i, 0);
                            var transactionDate = $filter('date')(day, 'dd-MM-yyyy');
                            // alert(transactionDate);
                            for (var x = 0; x < count; x++) {
                                if (datedata1[x].trx_dt == String(transactionDate)) {
                                    //console.log(transactionDate);
                                    //console.log(count);
                                    //console.log(datedata1[x].trx_dt);

                                    if (datedata1[x].trx_type == "dbt") {
                                        $scope.CustomerRecordStatement.push({
                                            Date: datedata1[x].trx_dt,
                                            Debit: datedata1[x].amt,
                                            Credit: 0.0,
                                            Balance: datedata1[x].trx_balance

                                        })
                                    }
                                    else {
                                        $scope.CustomerRecordStatement.push({
                                            Date: datedata1[x].trx_dt,
                                            Debit: 0.0,
                                            Credit: datedata1[x].amt,
                                            Balance: datedata1[x].trx_balance

                                        })
                                    }
                                }
                            }


                        }
                    });
            }


                ////If Trnsaction Type is Credit
            else if (transactionType == "cr") {


                //alert(transactionType)

                $http.get(linkglobal + '/trxn_views?$filter=cust_id eq ' + $scope.CustId + ' and bank_id eq ' + imageIDData + 'and trx_type+eq+%27cr%27')
                    .success(function (response) {
                        var trx = response;
                        var datedata1 = trx.value;
                        var count = datedata1.length;
                        console.log(datedata1);

                        for (var i = diffDays; i >= 0; i--) {
                            var day = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i, 0);
                            var transactionDate = $filter('date')(day, 'dd-MM-yyyy');

                            // alert(transactionDate);
                            for (var x = 0; x < count; x++) {
                                if (datedata1[x].trx_dt == String(transactionDate)) {
                                    //console.log(transactionDate);
                                    //console.log(count);
                                    //console.log(datedata1[x].trx_dt);

                                    if (datedata1[x].trx_type == "dbt") {
                                        $scope.CustomerRecordStatement.push({
                                            Date: datedata1[x].trx_dt,
                                            Debit: datedata1[x].amt,
                                            Credit: 0.0,
                                            Balance: datedata1[x].trx_balance

                                        })
                                    }
                                    else {
                                        $scope.CustomerRecordStatement.push({
                                            Date: datedata1[x].trx_dt,
                                            Debit: 0.0,
                                            Credit: datedata1[x].amt,
                                            Balance: datedata1[x].trx_balance

                                        })
                                    }
                                }
                            }


                        }
                    });
            }

        }
    }
})
