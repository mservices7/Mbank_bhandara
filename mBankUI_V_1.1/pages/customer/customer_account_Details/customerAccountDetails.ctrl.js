
// create the module and name it scotchApp
var scotchApp = angular.module('app.customerAccountDetailsController', ['ngRoute'])


scotchApp.controller('customerAccountDetailsController', function ($rootScope, $scope, $http, $routeParams, $location, $filter, $cookieStore) {
    $scope.CheckLogin = function () {
        if ($cookieStore.get('bankIDImg') == undefined) { $location.path('/'); }

    }


    //  alert('working');
    $scope.getDetails;

    var roughtDetails = $cookieStore.get('user');
    var imageIDData = $cookieStore.get('bankIDImg');
    $scope.imgIdDdURL = imageIDData;

    //for Showing a menu
    //$scope.transaction = true;
    //$scope.search = true;
    //$scope.request = true;
    //$scope.create = true;
    //$scope.reports = true;
    $scope.saving = true;

    var linkglobal = $cookieStore.get('urlBanks');  //Bank Bhandara

    //Today Date
    $scope.Date1 = $filter('date')(new Date(), 'dd-MM-yyyy');
    var date2 = "'" + $scope.Date1 + "'";
    //Route Data
    // $scope.exact_user = $routeParams.user_id;
    $scope.exact_user = $routeParams.user_id;
    var exact = $scope.exact_user;

   // alert(exact)
    //customer reload button
    $scope.doParseInt = function (val) {
        if (val && val != "")
            return parseInt(val);
    };

    $scope.arr = [];
    var trxData;

    $http.get(linkglobal + '/customers?$filter=cust_id eq ' + exact).success(function (response) {
        var cust1 = response;
        var cust2 = cust1.value;
        $scope.customer = cust2;
        var count = cust2.length;


    });

    $http.get(linkglobal + '/accounts?$filter=cust_id eq ' + exact +' and trx_type eq 1' ).success(function (response) {
        var cust1 = response;
        var cust2 = cust1.value;
        $scope.customers = cust2; var count = cust2.length;
        var gettrxDetails = cust2[0].trx_type;
        $scope.balances = cust2[0].balance;
        $http.get(linkglobal + '/trxn_views?$orderby=trx_balance desc&$filter=cust_id eq ' + exact + ' and trx_data eq 1 and status ne 2 ').success(function (response) {
            var customer1 = response;
            var customer2 = customer1.value;
            $scope.datadetails = customer2;
            var count = customer2.length;

            $scope.gettrxDetails = customer2[0].trx_data;
            $scope.getDetails = customer2[0].trx_data;

        });
    });

    $scope.Back = function () {
        //   alert('work');
        $location.path('/dd');
    }

    $scope.rowClass = function (item, index) {
        if (index == 0) {
            return item.active;
        }
        return '';
    };
    $scope.divshow = true;

    

    $scope.collectB = function () {
        //$scope.divbank = true;
        //$scope.divshow = false;
       // alert('Bank');

       // $http.get(linkglobal + '/trxn_views?$filter=cust_id eq ' + exact + ' status eq 7 or status eq 10 or status eq 11 and status eq ' + 11 + ' and trx_data eq ' + $scope.gettrxDetails).success(function (response) {
            $http.get(linkglobal + '/trxn_views?$filter=cust_id eq ' + exact + ' and status eq 11 and trx_data eq 1').success(function (response) {
            var customer1 = response;
            var customer2 = customer1.value;
            $scope.datadetails = customer2;
            var count = customer2.length;

        });
           // alert('b  ' + count)

    }

    $scope.collectA = function () {
        //$scope.divbank = true;
        //$scope.divshow = false;
       // alert('agent');
       // alert(' $scope.gettrxDetails' + $scope.gettrxDetails);
        //  $http.get(linkglobal + '/trxn_views?$filter=cust_id eq ' + exact + ' and status eq 7 and status eq 10' + ' and trx_data eq ' + $scope.gettrxDetails).success(function (response) {
        $http.get(linkglobal + '/trxn_views?$filter=cust_id eq ' + exact + ' and status eq 7' + ' and trx_data eq 1').success(function (response) {
            var customer1 = response;
            var customer2 = customer1.value;
            $scope.datadetails = customer2;
            var count = customer2.length;
        });
       // alert('a  ' + count)

    }

    //code for refresh
    $scope.refresh = function () {
        $scope.datadetails = null;
        $http.get(linkglobal + '/accounts?$filter=cust_id eq ' + exact).success(function (response) {
            var cust1 = response; var cust2 = cust1.value;
            $scope.customers = cust2;
            var count = cust2.length;
            var gettrxDetails = cust2[0].trx_type;
            $scope.balances = cust2[0].balance;

            $http.get(linkglobal + '/trxn_views?$filter=cust_id eq ' + exact + ' and trx_data eq ' + gettrxDetails + ' and status ne 2 &$orderby=trx_balance desc').success(function (response) {
                var customer1 = response;
                var customer2 = customer1.value;
                $scope.datadetails = customer2;
                var count = customer2.length;
                $scope.getDetails = customer2[0].trx_data;
                $scope.gettrxDetails = customer2[0].trx_data;
            });
        });
    }

    

    //// new
    $scope.exportData = function () {

        // $http.get(linkglobal + '/trxn_views?$filter=trx_data eq ' + $scope.getDetails + ' and cust_id eq ' + exact + ' and status eq ' + 7 + 'or status eq ' + 10 + ' and trx_data eq ' + $scope.getDetails + ' and cust_id eq ' + exact).success(function (response) {
        //$http.get(linkglobal + '/account_customer_agent_transaction_View?$filter=trx_data eq ' + $scope.getDetails + ' and status eq ' + 7 + 'or status eq ' + 10).success(function (response) {
        $http.get(linkglobal + '/trxn_views?$filter=cust_id eq ' + exact + ' and trx_data eq ' + $scope.getDetails).success(function (response) {

            var trxn1 = response;
            var trxn2 = trxn1.value;

            var count = trxn2.length;
            //alert(count);
            if (count > 0) {
                //alert("inside if");
                //alasql('SELECT Customer_Name,Account_Type,External_Transaction_Id,status,Transaction_Date,Amount,external_account_id,agent_name INTO XLSX("Report.xlsx",{headers:true})  FROM ?', [trxn2]);
                alasql('SELECT trx_dt,trx_balance INTO XLSX("Report.xlsx",{headers:true})  FROM ?', [trxn2]);

            }
            else {
                alert('Record not found else!');
            }
        }).error(function (data) {
            alert('Record not found');
        });

    };



    

    $scope.latestId = function () {

        var id = this.idfound;
        var depositeMoney = this.money;
        var moneyType = $scope.moneyDbt;
        //  alert(moneyType);
        $http.get(linkglobal + "/accounts" + "?$filter=acc_id eq " + this.idfound).then(function (res) {
            var role = res.data;
            var users = role.value;
            var balance = users[0].balance;
            $scope.external_account_ids = users[0].external_account_id;
            $scope.IdFounds = users[0].agent_id;
            $scope.getbalnces = balance;
            $scope.bank_ids = users[0].bank_id;
            $scope.brach_ids = users[0].branch_id;
            $scope.cust_ids = users[0].cust_id;
            $scope.acc_ids = users[0].acc_id;
            $scope.agent_ids = users[0].agent_id;
            $scope.Account_Types = users[0].Account_Type;
            $scope.trx_types = users[0].trx_type;
            $scope.is_syncs = users[0].is_sync;
            $scope.sync_dts = users[0].sync_dt;
            $scope.bank_sync_dts = users[0].bank_sync_dt;





            // alert(depositeMoney);
            if (moneyType == "dbt") {
                if (depositeMoney >= balance) {
                    alert('Accross the Debit Limit !!!...');
                    $scope.money = null;
                    this.money = null;
                }

            }
            else {
                $http.get(linkglobal + '/trx_details' + '?$orderby=trx_id desc').then(function (res) {

                    var getData1 = res.data;
                    var getData = getData1.value;

                    var id = getData[0].trx_id;
                    var id1 = id.replace(/-|0/g, '');
                    $scope.obtainValue = id1;
                    // console.log($scope.obtainValue)
                })
            }
        })

    }

    $scope.showTrns = function () {
        $scope.getDetails = this.trxId;
      //  alert('www');
        $http.get(linkglobal + '/trxn_views?$filter=cust_id eq ' + exact + ' and trx_data eq ' + this.trxId).success(function (response) {
            var cust1 = response;
            var cust2 = cust1.value;
            $scope.datadetails = cust2;
            var count = cust2.length;


        });

    }

    //Requested Customer
    $http.get(linkglobal + '/CustomerAccounts?$filter=cust_id eq ' + exact).success(function (response) {
        var cust1 = response; var cust2 = cust1.value; $scope.customers = cust2; var count = cust2.length;
        $scope.customerName = cust2[0].cust_name;
        $scope.openDt = cust2[0].bank_sync_dt;


    });

    $scope.dbt = function () {
        $scope.moneyDbt1 = 1;
        $scope.moneyDbt = 'dbt';
        $scope.dbttype = 'Debit From';
        $scope.btnDepositeText = 'Withdrawal';
        // alert('dbt');

    }

    $scope.cr = function () {
        //alert('cr');
        $scope.moneyDbt1 = 2;
        $scope.moneyDbt = 'cr';
        $scope.dbttype = 'Credit in';
        $scope.btnDepositeText = 'Deposite';

    }

    $scope.limit = 30;

    $scope.limitTo = function () {
        $scope.limit = $scope.limit + 30;
    }


    $scope.deposite = function () {
        var id = this.id;
        var getMonetType1 = $scope.moneyDbt1;
        var getMonetType = $scope.moneyDbt;
        var money = this.money;
        var type = this.type;
        var getbalnce = $scope.getbalnces;
        var dbttype = $scope.dbttype;

        if (money >= getbalnce && getMonetType == "dbt") {

            alert('Debit Amount Should Be Less Than Balance Amount !!!...');
            this.money = null;

        }
        else {



            var ModifiedDate = Math.round(Math.random() * (+new Date)).toString();

            var DateForToday = $filter('date')(new Date(), 'dd-MM-yyyy');
            var DateForToday1 = $filter('date')(new Date(), 'dd-MM-yyyy hh:mm:ss');
            var getTrxId1 = $scope.obtainValue;
            var getTrxId = ModifiedDate;

            //alert('getMonetType1'+getMonetType1);
            //alert('MonetType'+getMonetType);


            var agentId = $scope.IdFounds + '-' + ModifiedDate;

            //   if (type==3) {
            if (getMonetType == "dbt") {
                var balance = getbalnce - money;
                // alert('dbt'+balance)
            } else {
                var balance = getbalnce + money;
                // alert('cr' + balance)

            }
            //    switch (type) {
            //        case 1:
            //            var balance = getbalnce + money;

            //            break;

            //        case 2:
            //            var balance = getbalnce + money;
            //            break;
            //        case 3:
            //            var balance = getbalnce - money;
            //            break;
            //        case 4:
            //            switch (getMonetType1) {
            //                case 1:
            //                    var balance = getbalnce - money;


            //                    break;

            //                case 2:
            //                    var balance = getbalnce + money;


            //                    break;
            //            }
            //            break;
            //        case 5:
            //            var balance = getbalnce + money;
            //            break;
            //}

            $scope.balances = balance;


            var request = $http({
                method: "post",
                url: linkglobal + "/trx_details",
                crossDomain: true,
                data: {
                    external_trx_id: String(agentId),
                    trx_id: String(getTrxId),
                    bank_id: $scope.bank_ids,
                    brach_id: $scope.branch_ids,
                    cust_id: $scope.cust_ids,
                    acc_id: $scope.acc_ids,
                    agent_id: $scope.agent_ids,
                    amt: money,
                    trx_dt: String(DateForToday),
                    trx_type: getMonetType,
                    status: 11,
                    is_sync: true,
                    sync_dt: String(DateForToday1),
                    bank_sync_dt: String(DateForToday1),
                    balance: balance



                },
                headers: { 'Content-Type': 'application/json' },

            }).success(function (data) {
                // Set a timeout to clear loader, however you would actually call the $ionicLoading.hide(); method whenever everything is ready or loaded.
                $http.get(linkglobal + '/accounts?$filter=acc_id eq ' + $scope.acc_ids).success(function (response) {
                    var cust1 = response; var cust2 = cust1.value;

                    var request = $http({
                        method: "put",
                        url: linkglobal + "/accounts(" + $scope.acc_ids + ")",
                        crossDomain: true,
                        data: {
                            external_account_id: $scope.external_account_ids,
                            cust_id: $scope.cust_ids,
                            balance: $scope.balances,
                            // balance: balance,
                            bank_id: $scope.bank_ids,
                            branch_id: $scope.branch_ids,
                            agent_id: $scope.agent_ids,
                            status: 1,
                            is_sync: true,
                            sync_dt: $scope.sync_dts,
                            bank_sync_dt: $scope.bank_sync_dts,
                            Account_Type: $scope.Account_Types,
                            trx_type: $scope.trx_types,
                            InstallmentDays: cust2[0].InstallmentDays,
                            Percentage: cust2[0].Percentage,
                        },
                        headers: { 'Content-Type': 'application/json' },
                    })
                });
                $scope.divshow = true;


                // $scope.datadetails = null;
                $http.get(linkglobal + '/accounts?$filter=cust_id eq ' + exact + ' and trx_type eq 1').success(function (response) {
                    var cust1 = response; var cust2 = cust1.value;
                    $scope.customers = cust2;
                    var count = cust2.length;
                    var gettrxDetails = cust2[0].trx_type;
                 //   $http.get(linkglobal + '/trxn_views?$orderby=trx_balance desc&$filter=cust_id eq ' + exact + ' and trx_data eq 1 and status ne 2 ').success(function (response) {

                    $http.get(linkglobal + '/trxn_views?$orderby=trxId desc&$filter=cust_id eq ' + exact + ' and trx_data eq 1 and status ne 2').success(function (response) {
                        var customer1 = response;
                        var customer2 = customer1.value;
                        $scope.datadetails = customer2;
                        var count = customer2.length;
                        $scope.gettrxDetails = customer2[0].trx_data;
                    });
                });

                alert('Rs. ' + money + ' ' + dbttype + ' Account');
            })





            this.money = null;
            $scope.moneyDbt = '';
            $scope.dbttype = '';
        }
    }


})
