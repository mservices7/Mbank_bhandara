
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

    }

    $scope.LastMonth = function () {
        $scope.serachConditionDiv = false;
        $scope.showRecordsDiv = true;
        $scope.backDiv = true;

        $scope.CustomerRecordStatement = [];




        var today = new Date();
        var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0);



        // alert(today);
        // alert(lastDayOfMonth);

        $http.get(linkglobal + '/trxn_views?$filter=cust_id eq ' + $scope.CustId + ' and bank_id eq ' + imageIDData)
            .success(function (response) {
                var trx = response;
                var datedata1 = trx.value;
                var count = datedata1.length;
                //console.log(count);

                //for (var i = 31; i >= 1; i--) {
                //    var day = new Date(today.getFullYear(), today.getMonth() - 1, lastDayOfMonth.getDate() - i, 0);
                //    var transactionDate = $filter('date')(day, 'dd-MM-yyyy');


                //    for (x = 0; x < count; x++) {
                //        var dt = datedata1[x].trx_dt;
                //        // console.log(dt);
                //        if (dt == transactionDate) {
                //            console.log('dddt' + dt);

                //        }
                //    }
                //}


                for (var x = 0; x < count; x++) {
                    //    if (datedata1[x].trx_dt == transactionDate) {
                    //  console.log(transactionDate);
                    $scope.CustomerRecordStatement.push({
                        Date: datedata1[x].trx_dt,
                        Debit: datedata1[x].amt,
                        Credit: datedata1[x].amt,
                        Balance: datedata1[x].trx_balance

                    })
                    //    }
                }
                //}
            });


        //for (var i = 31; i >= 1; i--) {
        //    var day = new Date(today.getFullYear(), today.getMonth() - 1, lastDayOfMonth.getDate() - i, 0);
        //    var transactionDate = $filter('date')(day, 'dd-MM-yyyy');

        //    //alert(transactionDate);
        //   // console.log(transactionDate);
        //    //alert(today.getFullYear());
        //    //alert(today.getMonth());
        //    // alert(foundata);
        //    // $http.get(linkglobal + '/trxn_views?$filter=cust_id eq ' + $scope.CustId + ' and bank_id eq ' + imageIDData + ' and trx_dt eq ' + String(transactionDate)).success(function (response)
        //   // $http.get(linkglobal + '/trxn_views?$filter=cust_id eq ' + $scope.CustId + ' and bank_id eq ' + imageIDData + ' and trx_dt+eq+%27' + transactionDate + '%27').success(function (response) {
        //    $http.get(linkglobal + '/trxn_views?$filter=trx_dt+eq+%27' + transactionDate + '%27 and cust_id eq ' + $scope.CustId + ' and bank_id eq ' + imageIDData ).success(function (response) {
        //        var trx = response;
        //        var datedata = trx.value;
        //        var count = datedata.length;
        //        // console.log(datedata);
        //        console.log(linkglobal + '/trxn_views?$filter=trx_dt+eq+%27' + transactionDate + '%27 and cust_id eq ' + $scope.CustId + ' and bank_id eq ' + imageIDData);
        //       // var p = 0;
        //        //for (var i = 0; i < count; i++) {
        //        //    var getServerYear = (datedata[i].trx_dt).slice(-7);
        //        //    if (getServerYear == foundata) {
        //       // if (count != 0) {
        //           // console.log(p);
        //            for (var x = 0; x < count; x++) {
        //            $scope.CustomerRecordStatement.push({
        //                Date: datedata[0].trx_dt,
        //                Debit: datedata[0].amt,
        //                Credit: datedata[0].amt,
        //                Balance: datedata[0].trx_balance

        //            })
        //          //  p++;
        //            //}
        //        }
        //        //   // mamt123 = mamt123 + datedata[i].amt;
        //        //}
        //        // $scope.amountFFound = mamt123;
        //        // }
        //    })

        //}




    }


    $scope.LastThreeMonth = function () {

        $scope.serachConditionDiv = false;
        $scope.showRecordsDiv = true;
        $scope.backDiv = true;

        $scope.CustomerRecordStatement = [];




        var today = new Date();
        var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0);



        // alert(today);
        // alert(lastDayOfMonth);

        $http.get(linkglobal + '/trxn_views?$filter=cust_id eq ' + $scope.CustId + ' and bank_id eq ' + imageIDData)
            .success(function (response) {
                var trx = response;
                var datedata1 = trx.value;
                var count = datedata1.length;
                //console.log(count);

                //for (var i = 31; i >= 1; i--) {
                //    var day = new Date(today.getFullYear(), today.getMonth() - 1, lastDayOfMonth.getDate() - i, 0);
                //    var transactionDate = $filter('date')(day, 'dd-MM-yyyy');


                //    for (x = 0; x < count; x++) {
                //        var dt = datedata1[x].trx_dt;
                //        // console.log(dt);
                //        if (dt == transactionDate) {
                //            console.log('dddt' + dt);

                //        }
                //    }
                //}


                for (var x = 0; x < count; x++) {
                    //    if (datedata1[x].trx_dt == transactionDate) {
                    //  console.log(transactionDate);
                    $scope.CustomerRecordStatement.push({
                        Date: datedata1[x].trx_dt,
                        Debit: datedata1[x].amt,
                        Credit: datedata1[x].amt,
                        Balance: datedata1[x].trx_balance

                    })
                    //    }
                }
                //}
            });


        //for (var i = 93; i >= 1; i--) {
        //    var day = new Date(today.getFullYear(), today.getMonth() - 1, lastDayOfMonth.getDate() - i, 0);
        //    var transactionDate = $filter('date')(day, 'dd-MM-yyyy');

        //    //alert(transactionDate);
        //   // console.log(transactionDate);
        //    //alert(today.getFullYear());
        //    //alert(today.getMonth());
        //    // alert(foundata);
        //    // $http.get(linkglobal + '/trxn_views?$filter=cust_id eq ' + $scope.CustId + ' and bank_id eq ' + imageIDData + ' and trx_dt eq ' + String(transactionDate)).success(function (response)
        //   // $http.get(linkglobal + '/trxn_views?$filter=cust_id eq ' + $scope.CustId + ' and bank_id eq ' + imageIDData + ' and trx_dt+eq+%27' + transactionDate + '%27').success(function (response) {
        //    $http.get(linkglobal + '/trxn_views?$filter=trx_dt+eq+%27' + transactionDate + '%27 and cust_id eq ' + $scope.CustId + ' and bank_id eq ' + imageIDData ).success(function (response) {
        //        var trx = response;
        //        var datedata = trx.value;
        //        var count = datedata.length;
        //        // console.log(datedata);
        //        console.log(linkglobal + '/trxn_views?$filter=trx_dt+eq+%27' + transactionDate + '%27 and cust_id eq ' + $scope.CustId + ' and bank_id eq ' + imageIDData);
        //       // var p = 0;
        //        //for (var i = 0; i < count; i++) {
        //        //    var getServerYear = (datedata[i].trx_dt).slice(-7);
        //        //    if (getServerYear == foundata) {
        //       // if (count != 0) {
        //           // console.log(p);
        //            for (var x = 0; x < count; x++) {
        //            $scope.CustomerRecordStatement.push({
        //                Date: datedata[0].trx_dt,
        //                Debit: datedata[0].amt,
        //                Credit: datedata[0].amt,
        //                Balance: datedata[0].trx_balance

        //            })
        //          //  p++;
        //            //}
        //        }
        //        //   // mamt123 = mamt123 + datedata[i].amt;
        //        //}
        //        // $scope.amountFFound = mamt123;
        //        // }
        //    })

        //}
    }

    $scope.formatString = function (format) {
        var day = parseInt(format.substring(0, 2));
        var month = parseInt(format.substring(3, 5));
        var year = parseInt(format.substring(6, 10));
        var date = new Date(year, month - 1, day);
        return date;
    }


    $scope.Ok = function () {

        $scope.serachConditionDiv = false;
        $scope.showRecordsDiv = true;
        $scope.backDiv = true;

        $scope.CustomerRecordStatement = [];


        var fromDate =
            //this.fromdate;
            $filter('date')(this.fromdate, 'dd-MM-yyyy');
        var toDate =
            //this.todate;
        $filter('date')(this.todate, 'dd-MM-yyyy');



        var date2 = new Date($scope.formatString(toDate));
        var date1 = new Date($scope.formatString(fromDate));
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        alert(diffDays);

        //alert(fromDate);
        //alert(toDate);
        var today = this.fromdate;
        var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate() + diffDays, 0);

        //console.log(lastDayOfMonth);

        // alert(today);
        // alert(lastDayOfMonth);
        //************************************************************************//////////

        $http.get(linkglobal + '/trxn_views?$filter=cust_id eq ' + $scope.CustId + ' and bank_id eq ' + imageIDData)
            .success(function (response) {
                var trx = response;
                var datedata1 = trx.value;
                var count = datedata1.length;
                console.log(datedata1);

                for (var i = diffDays; i >= 0; i--) {
                    var day = new Date(today.getFullYear(), today.getMonth(), lastDayOfMonth.getDate() - i, 0);
                    var transactionDate = $filter('date')(day, 'dd-MM-yyyy');


                    //        //    for (x = 0; x < count; x++) {
                    //        //        var dt = datedata1[x].trx_dt;
                    //        //        // console.log(dt);
                    //        //        if (dt == transactionDate) {
                    //        //            console.log('dddt' + dt);

                    //        //        }
                    //        //    }
                    //        //}

                    alert(transactionDate);
                    for (var x = 0; x < count; x++) {
                        if (datedata1[x].trx_dt == String(transactionDate)) {
                            //console.log(transactionDate);
                            //console.log(count);
                            //console.log(datedata1[x].trx_dt);

                            $scope.CustomerRecordStatement.push({
                                Date: datedata1[x].trx_dt,
                                Debit: datedata1[x].amt,
                                Credit: datedata1[x].amt,
                                Balance: datedata1[x].trx_balance,

                            });
                        }
                    }

                    
                }
            });

        //************************************************************************//////////
        //for (var i = diffDays; i >= 0; i--) {
        //    var day = new Date(today.getFullYear(), today.getMonth(), lastDayOfMonth.getDate() - i, 0);
        //    var transactionDate = $filter('date')(day, 'dd-MM-yyyy');

        // alert('trdt'+transactionDate);
        // console.log(transactionDate);
        //alert(today.getFullYear());
        //alert(today.getMonth());
        // alert(foundata);
        // $http.get(linkglobal + '/trxn_views?$filter=cust_id eq ' + $scope.CustId + ' and bank_id eq ' + imageIDData + ' and trx_dt eq ' + String(transactionDate)).success(function (response)
        // $http.get(linkglobal + '/trxn_views?$filter=cust_id eq ' + $scope.CustId + ' and bank_id eq ' + imageIDData + ' and trx_dt+eq+%27' + transactionDate + '%27').success(function (response) {

        // $http.get(linkglobal + '/trxn_views?$filter=trx_dt+eq+%27' + transactionDate + '%27 and cust_id eq ' + $scope.CustId + ' and bank_id eq ' + imageIDData)
        //.success(function (response) {
        //var trx = response;
        //var datedata = trx.value;
        //var count = datedata.length;



        // console.log(datedata);
        // console.log(linkglobal + '/trxn_views?$filter=trx_dt+eq+%27' + transactionDate + '%27 and cust_id eq ' + $scope.CustId + ' and bank_id eq ' + imageIDData);
        // var p = 0;
        //for (var i = 0; i < count; i++) {
        //    var getServerYear = (datedata[i].trx_dt).slice(-7);
        //    if (getServerYear == foundata) {
        // if (count != 0) {

        //        for (var x = 0; x < count; x++) {
        //            if (datedata[x].trx_dt == transactionDate) {
        //            $scope.CustomerRecordStatement.push({
        //                Date: datedata[x].trx_dt,
        //                Debit: datedata[x].amt,
        //                Credit: datedata[x].amt,
        //                Balance: datedata[x].trx_balance

        //            }) 

        //            }
        //        }

        //        }).error(function (err) {console.log(err) })

        // }
        // })
    }
})
