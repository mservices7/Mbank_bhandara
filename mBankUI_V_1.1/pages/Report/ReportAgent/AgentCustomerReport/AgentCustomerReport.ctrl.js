
// create the module and name it scotchApp
var scotchApp = angular.module('app.AgentCustomerReport', ['ngRoute'])


scotchApp.controller('AgentCustomerReportController', function ($rootScope, $scope, $http, $routeParams, $location, $filter, $cookieStore) {
    $scope.CheckLogin = function () {
        if ($cookieStore.get('bankIDImg') == undefined) { $location.path('/'); }

    }

    var roughtDetails = $cookieStore.get('user');
    var imageIDData = $cookieStore.get('bankIDImg');
    $scope.imgIdDdURL = imageIDData;

    //for Showing a menu
    $scope.transaction = true;
    $scope.search = true;
    $scope.request = true;
    $scope.create = true;
    $scope.reports = true;

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

    $scope.agent_id = $routeParams.agent_id;
    var agent_id = $scope.agent_id;
    // alert('work' + agent_id);

    //customer reload button
    $scope.doParseInt = function (val) {
        if (val && val != "")
            return parseInt(val);
    };


    //Get Agent Data
    $http.get(linkglobal + '/agents?$filter=bank_id eq ' + imageIDData + ' and agent_id eq ' + agent_id).success(function (response) {
        var agent = response;
        var user = agent.value;
        $scope.agents = user;
        $scope.txtAgentName = user[0].agent_name;
        $scope.txtcust_phoneno = user[0].agent_phno_1;
        $scope.txtAgentID = user[0].external_agent_id;
        $scope.txtAgent_emailId = user[0].agent_email_id;
    });

    $scope.Back = function () {

        $location.path('/reportAgent');

    }
    $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData + ' and agent_id eq ' + agent_id).success(function (response) {
        var agentCustomerReport = response;
        var agentCustomerReports = agentCustomerReport.value;
        $scope.agentCustomerReports = agentCustomerReports;
        // alert(agentCustomerReports.length);
    })

    // get account type
    $http.get(linkglobal + '/products?$filter=bank_id eq ' + imageIDData)
  .success(function (res) {

      var Product = res;
      var product = Product.value;
      $scope.products = product;
  })

   

    $scope.formatString = function (format) {
        var day = parseInt(format.substring(0, 2));
        var month = parseInt(format.substring(3, 5));
        var year = parseInt(format.substring(6, 10));
        var date = new Date(year, month - 1, day);
        return date;
    }

    $scope.Search = function () {

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

            $scope.AgentCustomerRecord = [];

            $scope.totalBalance = "";

            $scope.fromDate = $filter('date')(this.fromdate, 'dd-MM-yyyy');
            $scope.toDate = $filter('date')(this.todate, 'dd-MM-yyyy');

            //  var transactionType = $scope.trancationType;

            //alert(transactionType);


            var date2 = new Date($scope.formatString($scope.toDate));
            var date1 = new Date($scope.formatString($scope.fromDate));
            var timeDiff = Math.abs(date2.getTime() - date1.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

            // alert(diffDays);

            // alert($scope.fromDate);
            // alert($scope.toDate);
            var today = this.fromdate;
            var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate() + diffDays, 0);
            var accountType = this.accountType;
            // alert('accountType' + accountType);

            //************************************************************************//////////
            if (accountType == "" || accountType == null) {
                alert('Please Select Account Type !!!...');
                $scope.totalbalnc = false;

            }
                ////If Trnsaction Type is All
            else {
                if (this.fromdate == null || this.fromdate == "" || this.todate == null || this.todate == "") {

                    if (this.fromdate == null || this.fromdate == "") {
                        alert('Please Select The From Date!!!..');
                    }
                    else if (this.todate == null || this.todate == "") {
                        alert('Please Select The To Date!!!..');
                    }
                    $scope.totalbalnc = false;

                    //alert('Please Select The Date!!!..');
                }
                else if (accountType == 1)
                {

                    //   alert(transactionType)

                    $scope.totalbalnc = false;

                    $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData + ' and agent_id eq ' + agent_id)
                        .success(function (response) {
                            var trx = response;
                            var datedata1 = trx.value;
                            var count = datedata1.length;
                            console.log(datedata1);
                            var totalBalance = 0;

                            for (var i = diffDays; i >= 0; i--) {
                                var day = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i, 0);
                                var transactionDate = $filter('date')(day, 'dd-MM-yyyy');



                                //  alert(transactionDate);
                                for (var x = 0; x < count; x++) {
                                    if (datedata1[x].trx_dt == String(transactionDate)) {
                                        if (datedata1[x].trx_type == "cr" || datedata1[x].trx_type == "Cr") {

                                            $scope.AgentCustomerRecord.push({
                                                Date: datedata1[x].trx_dt,
                                                AccountNumber: datedata1[x].external_account_id,
                                                AccountType: datedata1[x].Account_Type,
                                                CustomerName: datedata1[x].cust_name,
                                                AmountDeposited: datedata1[x].amt

                                            })
                                            totalBalance = totalBalance + datedata1[x].amt;
                                            $scope.totalBalance = totalBalance;
                                            $scope.totalbalnc = true;

                                        }
                                    }

                                }

                            }
                            // alert(totalBalance)

                        });
                     
                }
                else {
                    alert('Please Select other Account Type !!!...');
                    $scope.totalbalnc = false;
                    $scope.AgentCustomerRecord = [];
                }
            }



            $scope.exportData = function () {

                var count = $scope.AgentCustomerRecord.length;
                //alert(count);
                if (count > 0) {

                alasql('SELECT Date,AccountNumber,AccountType,CustomerName,AmountDeposited INTO XLSX("AgentCustomersReport.xlsx",{headers:true})  FROM ?', [$scope.AgentCustomerRecord]);

                }
                else {
                    alert('Record not found else!');
                }

            };
            ////If Trnsaction Type is Debit
            //else if (transactionType == "dbt") {


            //    // alert(transactionType)
            //    $http.get(linkglobal + '/trxn_views?$filter=cust_id eq ' + $scope.CustId + ' and bank_id eq ' + imageIDData + 'and trx_type+eq+%27dbt%27')
            //        .success(function (response) {
            //            var trx = response;
            //            var datedata1 = trx.value;
            //            var count = datedata1.length;
            //            console.log(datedata1);

            //            for (var i = diffDays; i >= 0; i--) {
            //                var day = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i, 0);
            //                var transactionDate = $filter('date')(day, 'dd-MM-yyyy');
            //                // alert(transactionDate);
            //                for (var x = 0; x < count; x++) {
            //                    if (datedata1[x].trx_dt == String(transactionDate)) {
            //                        //console.log(transactionDate);
            //                        //console.log(count);
            //                        //console.log(datedata1[x].trx_dt);

            //                        if (datedata1[x].trx_type == "dbt") {
            //                            $scope.CustomerRecordStatement.push({
            //                                Date: datedata1[x].trx_dt,
            //                                Debit: datedata1[x].amt,
            //                                Credit: 0.0,
            //                                Balance: datedata1[x].trx_balance

            //                            })
            //                        }
            //                        else {
            //                            $scope.CustomerRecordStatement.push({
            //                                Date: datedata1[x].trx_dt,
            //                                Debit: 0.0,
            //                                Credit: datedata1[x].amt,
            //                                Balance: datedata1[x].trx_balance

            //                            })
            //                        }
            //                    }
            //                }


            //            }
            //        });
            //}


            //    ////If Trnsaction Type is Credit
            //else if (transactionType == "cr") {


            //    //alert(transactionType)

            //    $http.get(linkglobal + '/trxn_views?$filter=cust_id eq ' + $scope.CustId + ' and bank_id eq ' + imageIDData + 'and trx_type+eq+%27cr%27')
            //        .success(function (response) {
            //            var trx = response;
            //            var datedata1 = trx.value;
            //            var count = datedata1.length;
            //            console.log(datedata1);

            //            for (var i = diffDays; i >= 0; i--) {
            //                var day = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i, 0);
            //                var transactionDate = $filter('date')(day, 'dd-MM-yyyy');

            //                // alert(transactionDate);
            //                for (var x = 0; x < count; x++) {
            //                    if (datedata1[x].trx_dt == String(transactionDate)) {
            //                        //console.log(transactionDate);
            //                        //console.log(count);
            //                        //console.log(datedata1[x].trx_dt);

            //                        if (datedata1[x].trx_type == "dbt") {
            //                            $scope.CustomerRecordStatement.push({
            //                                Date: datedata1[x].trx_dt,
            //                                Debit: datedata1[x].amt,
            //                                Credit: 0.0,
            //                                Balance: datedata1[x].trx_balance

            //                            })
            //                        }
            //                        else {
            //                            $scope.CustomerRecordStatement.push({
            //                                Date: datedata1[x].trx_dt,
            //                                Debit: 0.0,
            //                                Credit: datedata1[x].amt,
            //                                Balance: datedata1[x].trx_balance

            //                            })
            //                        }
            //                    }
            //                }


            //            }
            //        });
            //}

        }
    }
})
