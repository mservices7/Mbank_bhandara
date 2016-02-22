
// create the module and name it scotchApp
var scotchApp = angular.module('scotchApp',
    ['ngRoute',
     'scotchApp.dashboard',
     'scotchApp.sidebar',
     'scotchApp.approveCustomer',
     'scotchApp.RequestedCustomer',
     'scotchApp.customer_details',
     'scotchApp.datewise_transactions',
     'scotchApp.search_agentss',
     'scotchApp.search_customer',
     'scotchApp.search_agentssTrxn',
     'scotchApp.all_transactions', 'app.login',
     'scotchApp.accData'
    ]);


// configure our routes
scotchApp.config(function ($routeProvider, $httpProvider) {
    $routeProvider

        // route for the login page
        .when('/', {
            templateUrl: 'pages/login.html',
            controller: 'loginController'
        })

        .when('/sidebar', {
            templateUrl: 'pages/sidebar/sidebar.html',
            controller: 'sidebarController'
        })

        // route for the search_agent page                                                                                                                                                                                                                                                                                                                                                                                                                        
        .when('/search_agent', {
            templateUrl: 'pages/search/seachAgent/search_agent.html',
            controller: 'search_agentssController',
        })
        // route for the search_agent page                                                                                                                                                                                                                                                                                                                                                                                                                        
        .when('/req_cust', {
            templateUrl: 'pages/create/RequestedCustomer/RequestedCustomer.html',
            controller: 'RequestedCustomerController',
        })

         .when('/approveCust/:user_id', {
             templateUrl: 'pages/create/approveCustomer/approveCustomer.html',
             controller: 'approveCustomerController',
         })

        // route for the agent_transaction page
        .when('/agentTransaction/:user_id', {
            templateUrl: 'pages/search/seachAgent/agent_transaction.html',
            controller: 'search_agentssTrxnController'
        })

       .when('/dashboard', {
           templateUrl: 'pages/dashboard/dashboard.html',
           controller: 'dashboardController'
       })

     .when('/all_transactions', {
         templateUrl: 'pages/all_transactions/all_transactions.html',
         controller: 'all_transactionsController'
     })
    .when('/today_transactions', {
        templateUrl: 'pages/today_transactions.html',
        controller: 'search_agentController'
    })
    .when('/customers', {
        templateUrl: 'pages/search/seachCustomer/search_customer.html',
        controller: 'search_customerController'
    })
     .when('/customer_details/:cust_id', {
         templateUrl: 'pages/update_delete/CustomerDetails/customer_detail.html',
         controller: 'customer_detailsController'
     })
    .when('/datewisetransactions', {
        templateUrl: 'pages/dateWiseTransaction/datewise_transactions.html',
        controller: 'datewise_transactionsController'
    })
     .when('/approvetransaction', {
         templateUrl: 'pages/approve_transactions.html',
         controller: 'search_agentController'
     })
     .when('/notapprovetransaction', {
         templateUrl: 'pages/notApprove_transactions.html',
         controller: 'search_agentController'
     })
    .when('/createbank', {
        templateUrl: 'pages/create/create_bank.html',
        controller: 'search_agentController'
    })
    .when('/createbranch', {
        templateUrl: 'pages/create/create_branch.html',
        controller: 'search_agentController'
    })
    .when('/createaccount', {
        templateUrl: 'pages/create/create_accounts.html',
        controller: 'search_agentController'
    })
    .when('/createproduct', {
        templateUrl: 'pages/create/create_product.html',
        controller: 'search_agentController'
    })
    .when('/createrole', {
        templateUrl: 'pages/create/create_role.html',
        controller: 'search_agentController'
    })
    .when('/createusers', {
        templateUrl: 'pages/create/create_user.html',
        controller: 'search_agentController'
    })
        .when('/createcustomer', {
            templateUrl: 'pages/create/create_customer.html',
            controller: 'search_agentController'
        })
    .when('/serachusers', {
        templateUrl: 'pages/search/search_user.html',
        controller: 'search_agentController'
    })
     .when('/userdetails/:uid', {
         templateUrl: 'pages/update_delete/user_details.html',
         controller: 'search_agentController'
     })
     .when('/searchrole', {
         templateUrl: 'pages/search/search_role.html',
         controller: 'search_agentController'
     })
    .when('/roledetails/:role_id', {
        templateUrl: 'pages/update_delete/role_details.html',
        controller: 'search_agentController'
    })
     .when('/searchbranch', {
         templateUrl: 'pages/search/search_branch.html',
         controller: 'search_agentController'
     })
     .when('/branchdetail/:branch_id', {
         templateUrl: 'pages/update_delete/branches_detail.html',
         controller: 'search_agentController'
     })
     .when('/searchbank', {
         templateUrl: 'pages/search/search_bank.html',
         controller: 'search_agentController'
     })
    .when('/bankdetail/:exbank_id', {
        templateUrl: 'pages/update_delete/bank_detail.html',
        controller: 'search_agentController'
    })
    .when('/searchaccount', {
        templateUrl: 'pages/search/search_account.html',
        controller: 'search_agentController'
    })
    .when('/accountdetail/:acc_id', {
        templateUrl: 'pages/update_delete/account_details.html',
        controller: 'search_agentController'
    })
     .when('/assignagent/:assign_id', {
         templateUrl: 'pages/assign_agent.html',
         controller: 'search_agentController'
     })
     .when('/forgotpwd', {
         templateUrl: 'pages/forgot_password.html',
         controller: 'mainController'
     })

    //Record Wise 
    .when('/trxbyacctype/:exbank_id', {
        templateUrl: 'pages/AccountType/accData.html',
        controller: 'accDataController'
    })
     .when('/reportCustomer', {
         templateUrl: 'pages/Report/ReportCustomer.html',
         controller: 'search_agentController'
     })
     .when('/reportAgent', {
         templateUrl: 'pages/Report/ReportAgent.html',
         controller: 'search_agentController'
     })


    .when('/reportEOD', {
        templateUrl: 'pages/Report/EOD.html',
        controller: 'search_agentController'
    })

    .when('/reportDate', {
        templateUrl: 'pages/Report/Report.html',
        controller: 'search_agentController'
    });


});

scotchApp.filter('datetime', function ($filter) {
    return function (input) {
        if (input == null) { return ""; }

        var _date = $filter('date')(new Date(input), 'MMM-yyyy');

        return _date.toUpperCase();

    };
})

scotchApp.filter('yearFormat', function ($filter) {
    return function (input) {
        if (input == null) { return ""; }

        var _date = $filter('date')(new Date(input), 'yyyy');

        return _date.toUpperCase();

    };
})


scotchApp.filter('yearDDMM', function ($filter) {
    return function (input) {
        if (input == null) { return ""; }

        var _date = $filter('date')(new Date(input), 'dd-MM-yyyy');

        return _date.toUpperCase();

    };
})


// create the controller and inject Angular's $scope
scotchApp.controller('mainController', function ($rootScope, $scope, $http, $location, $routeParams, $filter) {

    var linkglobal = 'http://mbankwcfdataservices.azurewebsites.net/mBankDataService.svc'; //Bank Bhandara
    //var linkglobal = 'http://mbankwcfdataservice.azurewebsites.net/mBankDataService.svc'; //Demo



    $scope.buttonclick = function () {

        var username = this.username;
        var password = String(this.password);




        $scope.loadLoginFail = false;
        $scope.loadLoginFailInt = false;
        $scope.detailsLogin = false;
        $scope.loadLogin = true;

        if (this.username == null || this.password == null) {


            $scope.loadLogin = false;

            $scope.loadLoginFail = false;

            $scope.loadLoginFailInt = false;

            $scope.detailsLogin = true;


        }
        else {
            $scope.myForm.$setPristine();
            $http.get(linkglobal + '/user_details')
            .success(function (response) {
                var role = response;
                $scope.users = role.value;

                var users = $scope.users;
                var count = users.length;



                if (count > 0) {
                    for (var i = 0; i < count; i++) {

                        if (users[i].login_id == username && users[i].pwd == password) {
                            //alert( && parseInt(users[i].role_id) == 2);
                            //    alert(parseInt(users[i].bank_id));
                            switch (parseInt(users[i].bank_id)) {
                                case 1:
                                    switch (parseInt(users[i].role_id)) {
                                        case 1:
                                            alert('Not Authorized User')

                                            break;
                                        case 2:
                                            $rootScope.user = "admin";
                                            $rootScope.bankIDImg = users[i].bank_id;
                                            $rootScope.urlBanks = 'http://mbankwcfdataservices.azurewebsites.net/mBankDataService.svc';
                                            $location.path('/dashboard');
                                            $scope.loadLogin = false;
                                            $scope.loadLoginFailInt = false;
                                            $scope.detailsLogin = false;
                                            $scope.loadLoginFail = false;
                                            break;
                                        default:

                                            $scope.loadLogin = false;

                                            $scope.loadLoginFailInt = false;

                                            $scope.detailsLogin = false;

                                            $scope.loadLoginFail = true;
                                            break;

                                    }
                                    break;


                                case 2:
                                    switch (parseInt(users[i].role_id)) {
                                        case 1:
                                            alert('Not Authorized User')

                                            break;
                                        case 2:
                                            $rootScope.user = "admin";
                                            $rootScope.bankIDImg = users[i].bank_id;
                                            $rootScope.urlBanks = 'http://mbankwcfdataservice.azurewebsites.net/mBankDataService.svc';

                                            $location.path('/dashboard');
                                            $scope.loadLogin = false;
                                            $scope.loadLoginFailInt = false;
                                            $scope.detailsLogin = false;
                                            $scope.loadLoginFail = false;
                                            break;
                                        default:

                                            $scope.loadLogin = false;

                                            $scope.loadLoginFailInt = false;

                                            $scope.detailsLogin = false;

                                            $scope.loadLoginFail = true;
                                            break;

                                    }
                                    break;

                                default:
                                    $scope.loadLogin = false;

                                    $scope.loadLoginFailInt = false;

                                    $scope.detailsLogin = false;

                                    $scope.loadLoginFail = true;
                                    break;

                            }




                        }
                        else {
                            $scope.loadLogin = false;

                            $scope.loadLoginFailInt = false;

                            $scope.detailsLogin = false;

                            $scope.loadLoginFail = true;

                        }
                    }
                }
                else {


                    alert('Record Not Found!')
                }



            }).error(function (response) {
                $scope.loadLogin = false;
                $scope.detailsLogin = false;
                $scope.loadLoginFail = false;

                $scope.loadLoginFailInt = true;


                //alert('Incorrect Username and Password');
            });
        }

        this.username = null;
        this.password = null;

    };


    $scope.forgotpwd = function () {
        var username = this.newuser;
        var pwd = this.newpassword;
        var rpwd = this.retypenewpassword;


        $http.get(linkglobal + '/user_details?' + "$filter=login_id eq " + username + " ")
      .success(function (response) {
          console.log(response);
          var role = response;
          var user = role.value;
          var count = user.length;
          var external_login_id;
          var role_id;
          var status;
          var is_sync;
          var sync_dt;
          var bank_sync_dt;
          var bank_id;
          if (count > 0) {
              for (var i = 0; i < count; i++) {

                  external_login_id = user[i].external_login_id;
                  role_id: user[i].role_id;
                  status: user[i].status;
                  is_sync: user[i].is_sync;
                  sync_dt: user[i].sync_dt;
                  bank_sync_dt: user[i].bank_sync_dt;
                  bank_id: user[i].bank_id;

              }

          }

          if (pwd == rpwd) {
              var request = $http({
                  method: "put",
                  url: linkglobal + "/user_details(" + username + ")",
                  crossDomain: true,
                  data: {
                      login_id: username,
                      role_id: role_id,
                      status: status,
                      is_sync: is_sync,
                      pwd: pwd,
                      sync_dt: sync_dt,
                      bank_sync_dt: bank_sync_dt,
                      bank_id: bank_id,
                      external_login_id: external_login_id
                  },
                  headers: { 'Content-Type': 'application/json' },

              }).success(function (data) {

                  alert('Password Changed');

              }).error(function (err) {
                  alert('Incorrect Username');
              });
          }
          else {
              alert("Password & Retype Password are not Equal");
          }
      })

    };

    var doParseInt = function (val) {
        if (val && val != "")
            return parseInt(val);
    }
});

scotchApp.controller('search_agentController', function ($rootScope, $scope, $http, $routeParams, $location, $filter) {




    $scope.CheckLogin = function () {if ($cookieStore.get('bankIDImg') == undefined) { $location.path('/'); }

        if ($rootScope.user == null && $rootScope.bankIDImg == null && $rootScope.urlBanks == null) {
            $location.path('/');
        }
    }


    var roughtDetails = $rootScope.user;
    var imageIDData = $rootScope.bankIDImg;
    $scope.imgIdDdURL = imageIDData;


    var roughtDetails = roughtDetails;
    var imageIDData = imageIDData;
    $scope.imgIdDdURL = imageIDData;

    //var roughtDetails = "admin";
    //var imageIDData = 2;
    //$scope.imgIdDdURL = imageIDData;


    //var roughtDetails = roughtDetails;
    //var imageIDData = imageIDData;
    //$scope.imgIdDdURL = imageIDData;




    $scope.status = { isFirstOpen: true, isFirstDisabled: false };

    var linkglobal = $rootScope.urlBanks; //Bank Bhandara



    $scope.exact_user = $routeParams.user_id;
    var exact = $scope.exact_user;

    $scope.Date1 = $filter('date')(new Date(), 'dd-MM-yyyy');

    var date2 = "'" + $scope.Date1 + "'";




    $http.get(linkglobal + '/trx_details?$filter=bank_id eq ' + imageIDData)
          .success(function (response) {
              var amt1 = 0;
              var trx = response;
              var transaction = trx.value;
              $scope.transactionsT = transaction;
              var count = transaction.length;
              for (var i = 0; i < count; i++) {
                  amt1 = amt1 + transaction[i].amt;
              }
              $scope.amount1 = amt1;
              //console.log('dashboard transaction amt =' + amt1);

          });

    $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData)
          .success(function (response) {
              var trans1 = response;
              var user1 = trans1.value;
              $scope.transDetailsAccType = user1;
              $scope.trxndate = user1;
          })



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



    $scope.todayDates = $filter('date')(new Date(), 'dd-MM-yyyy');
    $http.get(linkglobal + "/trxn_views?$filter=trx_dt eq " + date2 + ' and bank_id eq ' + imageIDData).success(function (response) {
        var trans1 = response; var user1 = trans1.value; $scope.todayRecordTrans = user1;
        var count = user1.length; var amt = 0; var count = user1.length;
        for (var i = 0; i < count; i++) { amt = amt + user1[i].amt; }
    });


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


    $scope.agetCustReport = function () {
        var agentIDData = this.agentIDData;
        $http.get(linkglobal + '/trxn_views?$filter=agent_id eq ' + agentIDData + ' and trx_dt eq ' + date2 + ' and bank_id eq ' + imageIDData).success(function (response) {
            var trans1 = response; var user1 = trans1.value; var count = user1.length; $scope.agentTodayTotalCust = user1;
        });
    }

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
        // alert(today + '' + getDateDataRecM + '-' + getDateDataRecD + '-' + getDateDataRecY);

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





    //Create Customer Code
    $scope.createCutomer = function () {


        //Search Running Sequence Number from local database to push in database 

        if (this.custAccType == null) {
            alert('Please Select Account Type');
        } else if (this.custFName == null || this.custLName == null) {
            alert('Please Enter Customer First & Last Name');

        }
        else if (this.custMobileNo == null) {
            alert('Please Enter Valid 10 - DIGIT Mobile Numer');

        }

        else {
            if (this.custAccType == 'SAVE') {
                var trxType = 4;
            } else if (this.custAccType == 'LOAN') {
                var trxType = 3;
            }

            var agentID = $scope.agentID;
            var bankID = imageIDData;
            var branchID = $scope.branchID;

            //var latestSeqence_zero = ("000" + latestSeqPlus).slice(-3);
            //Get Current Date and Time
            $scope.ModifiedDate = $filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ss');
            $scope.ModifiedDatee = $filter('date')(new Date(), 'HHMMss');

            var DateForToday = $scope.ModifiedDate;

            var TimeForToday = $scope.ModifiedDatee + 1;



            var custIDCreate = agentID + '' + TimeForToday;



            var external_cust_id = custIDCreate;

            var cust_id = custIDCreate;
            var cust_name = String(this.custFName + ' ' + this.custLName);
            var cust_local_add = String(this.custAddress);
            var cust_perm_add = '';
            var cust_phno_1 = String(this.custMobileNo);
            var cust_phno_2 = '';
            var cust_photo = '';
            var cust_pancard_no = this.custPanCard;
            var cust_email_id = this.custEmailId;
            var login_id = '';
            var role_id = '';
            var agent_id = agentID;
            var status = 1;
            var is_sync = 'false';
            var sync_dt = String($scope.ModifiedDate);
            var bank_sync_dt = '';
            var bank_id = bankID;
            var external_account_id = this.custAccType + '/' + custIDCreate;
            var accType = this.custAccType;




            var request = $http({
                method: "post",
                url: linkglobal + "/customers",
                crossDomain: true,
                data: {
                    external_cust_id: external_cust_id,
                    cust_name: cust_name,
                    cust_local_add: cust_local_add,
                    cust_phno_1: cust_phno_1,
                    cust_pancard_no: cust_pancard_no,
                    cust_email_id: cust_email_id,
                    agent_id: agent_id,
                    status: status,
                    sync_dt: sync_dt,
                    bank_id: bank_id

                },
                headers: { 'Content-Type': 'application/json' },

            }).success(function (data) {

                $http.get(linkglobal + "/customers" + "?$filter=external_cust_id eq '" + external_cust_id + "'").then(function (res) {

                    var role = res.data;
                    var users = role.value;
                    console.log(users[0].cust_id);
                    var getCustID = users[0].cust_id;


                    var request = $http({
                        method: "post",
                        url: linkglobal + "/accounts",
                        crossDomain: true,
                        data: {
                            external_account_id: external_account_id,
                            //acc_id: custIDCreate,
                            cust_id: getCustID,
                            balance: 0.0,
                            bank_id: bank_id,
                            branch_id: branchID,
                            agent_id: agent_id,
                            status: status,
                            sync_dt: sync_dt,
                            Account_Type: accType,
                            trx_type: trxType
                        },
                        headers: { 'Content-Type': 'application/json' },
                    }).success(function (data) {
                        $location.path('/dashboard');
                        alert('Customer Created');

                    }).error(function (err) {
                        alert('Internet is Not Available');
                    });



                });


            }).error(function (err) {
                $location.path('/dashboard');
                alert('Internet is Not Available');

            });


            this.custAccType = '';
            this.custFName = '';
            this.custLName = '';
            this.custAddress = '';
            this.custMobileNo = '';
            this.custPanCard = '';
            this.custEmailId = '';

        }

    }



    var doParseInt = function (val) {
        if (val && val != "")
            return parseInt(val);
    }



    $scope.refresh = function () {

    };





    $http.get(linkglobal + '/agents?$filter=bank_id eq ' + imageIDData)
    .success(function (response) {
        var agent = response;
        var user = agent.value;
        $scope.agents = user;
    });

    $scope.logout = function () {
        $rootScope.user = null;
        $location.path('/');

    };

    $scope.doParseInt = function (val) {
        if (val && val != "")
            return parseInt(val);
    };



    // all transactions approve
    $scope.allrecall = function () {
        $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData)
    .success(function (response) {
        var trans1 = response;
        var trans2 = trans1.value;
        $scope.trans3 = trans2;
        var count = trans2.length;

    });
    };


    $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData + ' and status eq 7 or status eq 10')
       .success(function (response) {
           var trans1 = response;
           var user1 = trans1.value;
           $scope.trans34 = user1;
           var count = user1.length;
           var amt = 0;

       })

    $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData + ' and status ne 7 and status ne 10')
      .success(function (response) {
          var trans1 = response;
          var user1 = trans1.value;
          $scope.trans35 = user1;
          var count = user1.length;
          var amt = 0;

      })



    $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData)
        .success(function (response) {
            var trans1 = response;
            var user1 = trans1.value;
            $scope.trans3 = user1;
            var count = user1.length;
            var amt = 0;

            $scope.trxs = user1;

            var count = user1.length;
            for (var i = 0; i < count; i++) {
                amt = amt + user1[i].amt;

            }

            $scope.agentTransactionsApprove = amt;



            //post status approved
            $scope.statusApprovedtrx = function () {
                var trxId = this.trxId;
                var trx_id = String(this.selecttrx);
                var dateT = this.dateT;
                var accountidT = this.accountidT;
                var agentidT = this.agentidT;
                var amtT = this.amtT;
                var bankidT = this.bankidT;
                var banksyncdtT = this.banksyncdtT;
                var brachidT = this.brachidT;
                var custidT = this.custidT;
                var externaltrxidT = this.externaltrxidT;
                var issyncT = this.issyncT;
                var syncdtT = this.syncdtT;
                var trxtypeT = this.trxtypeT;
                var numberT = String(7);
                var status = this.status;
                if (status == 7 || status == 10) {
                    alert('Status can not Approve. Status is Already Sync to Bank.');
                }
                else {
                    if (status != 7 || status1 != 10) {
                        var request = $http({
                            method: "put",
                            url: linkglobal + "/trx_details(" + trxId + ")",
                            crossDomain: true,
                            data: {
                                trx_id: trx_id,
                                status: numberT,
                                trx_dt: dateT,
                                acc_id: accountidT,
                                agent_id: agentidT,
                                amt: amtT,
                                bank_id: bankidT,
                                bank_sync_dt: banksyncdtT,
                                brach_id: brachidT,
                                cust_id: custidT,
                                external_trx_id: externaltrxidT,
                                is_sync: issyncT,
                                sync_dt: syncdtT,
                                trx_type: trxtypeT,

                            },
                            headers: { 'Content-Type': 'application/json' },

                        }).success(function (data) {

                            alert('Status Approved');

                            $http.get(linkglobal + '/trxn_views')
                           .success(function (response) { var trans1 = response; var user1 = trans1.value; $scope.trans3 = user1; });


                        }).error(function (err) {
                            alert('Status Alerady Approved');
                        });
                    }
                    else {
                        alert('Status Alerady Approved!')
                    }
                }
            };

            $scope.allapprovedtrx = function () {

                if (count > 0) {
                    for (var i = 0; i < count; i++) {
                        var trxId = user1[i].trxId;
                        var external_trx_id = String(user1[i].external_trx_id);
                        var trx_id = String(user1[i].trx_id);
                        var bank_id = user1[i].bank_id;
                        var branch_id = user1[i].branch_id;
                        var cust_id = user1[i].cust_id;
                        var acc_id = user1[i].acc_id;
                        var agent_id = user1[i].agent_id;
                        var amt = user1[i].amt;
                        var trx_dt = user1[i].trx_dt;
                        var trx_type = user1[i].trx_type;
                        var status = String(10);
                        var is_sync = user1[i].is_sync;
                        var sync_dt = user1[i].sync_dt;
                        var bank_sync_dt = user1[i].bank_sync_dt;
                        var status1 = user1[i].status;

                        if (status1 == 7 || status1 == 10) {

                            alert('Status Already Approve OR Approved Remaining transaction Manually!')

                        }
                        else {

                            var request = $http({
                                method: "put",
                                url: linkglobal + "/trx_details(" + trxId + ")",
                                crossDomain: true,
                                data: {
                                    external_trx_id: external_trx_id,
                                    trx_id: trx_id,
                                    bank_id: bank_id,
                                    brach_id: branch_id,
                                    cust_id: cust_id,
                                    acc_id: acc_id,
                                    agent_id: agent_id,
                                    amt: amt,
                                    trx_dt: trx_dt,
                                    trx_type: trx_type,
                                    status: status,
                                    is_sync: is_sync,
                                    sync_dt: sync_dt,
                                    bank_sync_dt: bank_sync_dt,

                                },
                                headers: { 'Content-Type': 'application/json' },

                            }).success(function (data) {
                                $http.get(linkglobal + '/trxn_views')
                               .success(function (response) {
                                   var trans1 = response;
                                   var user1 = trans1.value;
                                   $scope.trans3 = user1;
                               })

                                // alert('Data Updated On Server');
                            });

                        }
                    } //for loop close 





                }
                else {
                    alert('Record not found');
                }

            };



        });



    //generate xlsx file
    $scope.exportData = function ($scope) {

        $http.get(linkglobal + '/trxn_views?$filter=status eq ' + 7 + ' and bank_id eq ' + imageIDData)
   .success(function (res) {

       var agent1 = res;
       var user1 = agent1.value;
       var count = user1.length;

       if (count > 0) {

           alasql('SELECT cust_name,external_trx_id,status,trx_dt,amt,external_account_id,agent_name INTO XLSX("Report.xlsx",{headers:true})  FROM ?', [user1]);

       }
       else {
           alert('Record not found');
       }
   }).error(function (data) {
       alert('Record not found');
   });

    };


    //Transaction by agent id approve
    $scope.recall = function () {
        $http.get(linkglobal + '/trxn_views?$filter=agent_id eq ' + exact + ' and bank_id eq ' + imageIDData)
    .success(function (res) {
        var agent1 = res;
        var user1 = agent1.value;
        $scope.transactions = user1;
        var count = user1.length;

    });
    };


    $http.get(linkglobal + '/trxn_views?$filter=agent_id eq ' + exact + ' and bank_id eq ' + imageIDData)
    .success(function (res) {
        var agent1 = res;
        var user1 = agent1.value;
        $scope.transactions = user1;
        var transactioD = JSON.stringify($scope.transactions);
        var del = JSON.parse(transactioD);
        var count = user1.length;

        var amt = 0;

        $scope.trxs = user1;

        var count = user1.length;
        for (var i = 0; i < count; i++) {
            amt = amt + user1[i].amt;

        }

        $scope.agentTransactions = amt;


        //post status approved
        $scope.statusApproved = function () {
            var trxId = this.trxId;
            var trx_id = String(this.selecttrx);
            var dateT = this.dateT;
            var accountidT = this.accountidT;
            var agentidT = this.agentidT;
            var amtT = this.amtT;
            var bankidT = this.bankidT;
            var banksyncdtT = this.banksyncdtT;
            var brachidT = this.brachidT;
            var custidT = this.custidT;
            var externaltrxidT = this.externaltrxidT;
            var issyncT = this.issyncT;
            var syncdtT = this.syncdtT;
            var trxtypeT = this.trxtypeT;
            var numberT = String(7);
            var status = this.status;
            if (status == 10) {
                alert('Status can not Approve.Status is Bank Sync.')
            }
            else {
                if (status != 7) {
                    var request = $http({
                        method: "put",
                        url: linkglobal + "/trx_details('" + trxId + "')",
                        crossDomain: true,
                        data: {
                            trx_id: "'" + trx_id + "'",
                            status: numberT,
                            trx_dt: dateT,
                            acc_id: accountidT,
                            agent_id: agentidT,
                            amt: amtT,
                            bank_id: bankidT,
                            bank_sync_dt: banksyncdtT,
                            brach_id: brachidT,
                            cust_id: custidT,
                            external_trx_id: externaltrxidT,
                            is_sync: issyncT,
                            sync_dt: syncdtT,
                            trx_type: trxtypeT,

                        },
                        headers: { 'Content-Type': 'application/json' },

                    }).success(function (data) {

                        alert('Status Approved');
                        // $scope.trans3 = null;
                        $scope.transactions = null;
                        $scope.recall();
                    }).error(function (err) {
                        alert('Status Alerady Approved')
                    });
                }

            }
        }

        $scope.allapproved = function () {

            if (count > 0) {
                for (var i = 0; i < count; i++) {
                    var trxId = user1[i].trxId;
                    var external_trx_id = String(user1[i].external_trx_id);
                    var trx_id = String(user1[i].trx_id);
                    var bank_id = user1[i].bank_id;
                    var branch_id = user1[i].branch_id;
                    var cust_id = user1[i].cust_id;
                    var acc_id = user1[i].acc_id;
                    var agent_id = user1[i].agent_id;
                    var amt = user1[i].amt;
                    var trx_dt = user1[i].trx_dt;
                    var trx_type = user1[i].trx_type;
                    var status = String(7);
                    var is_sync = user1[i].is_sync;
                    var sync_dt = user1[i].sync_dt;
                    var bank_sync_dt = user1[i].bank_sync_dt;
                    var status1 = user1[i].status;

                    if (status1 == 10) {

                        // alert('Status can not Approve.Status is Bank Sync.')

                    }
                    else {

                        var request = $http({
                            method: "put",
                            url: linkglobal + "/trx_details('" + trxId + "')",
                            crossDomain: true,
                            data: {
                                external_trx_id: external_trx_id,
                                trx_id: trx_id,
                                bank_id: bank_id,
                                brach_id: branch_id,
                                cust_id: cust_id,
                                acc_id: acc_id,
                                agent_id: agent_id,
                                amt: amt,
                                trx_dt: trx_dt,
                                trx_type: trx_type,
                                status: status,
                                is_sync: is_sync,
                                sync_dt: sync_dt,
                                bank_sync_dt: bank_sync_dt,

                            },
                            headers: { 'Content-Type': 'application/json' },

                        }).success(function (data) {

                            // alert('Data Updated On Server');
                        });
                    }

                } //for loop close 

                $scope.transactions = null;
                // $scope.trans3 = null;
                $scope.recall();
                //   $scope.allrecall();

            }
            else {
                alert('Record not found');
            }

        };

        //generate xlsx file
        $scope.exportData = function ($scope) {

            $http.get(linkglobal + '/trxn_views?' + "$filter=status eq " + 7 + " and agent_id eq " + exact + " and bank_id eq " + imageIDData)
       .success(function (res) {
           var agent1 = res;
           var user1 = agent1.value;
           console.log('xlxs report = ' + user1);

           var count = user1.length;

           if (count > 0) {

               alasql('SELECT cust_name,external_trx_id,status,trx_dt,amt,external_account_id,agent_name INTO XLSX("Report.xlsx",{headers:true})  FROM ?', [user1]);

           }
           else {
               alert('Record not found');
           }
       }).error(function (data) {
           alert('Record not found');
       });

        };

    });


    //today transactions approve
    $scope.todaytrxnrecall = function () {
        $http.get(linkglobal + '/trx_details?$filter=trx_dt eq ' + date2 + ' and bank_id eq ' + imageIDData)
         .success(function (response) {
             var amt = 0;
             var trx1 = response;
             var user1 = trx1.value;
             $scope.trxs = user1;
         });
    };


    $http.get(linkglobal + '/trxn_views?$filter=trx_dt eq ' + date2 + ' and bank_id eq ' + imageIDData)
         .success(function (response) {
             var amt = 0;
             var trx1 = response;
             var user1 = trx1.value;
             $scope.trxs = user1;

             var count = user1.length;
             for (var i = 0; i < count; i++) {
                 amt = amt + user1[i].amt;
             }

             $scope.amountToday = amt;

             //post status approved
             $scope.statusApprovedtoday = function () {
                 var trxId = this.trxId;
                 var trx_id = String(this.selecttrx);
                 var dateT = this.dateT;
                 var accountidT = this.accountidT;
                 var agentidT = this.agentidT;
                 var amtT = this.amtT;
                 var bankidT = this.bankidT;
                 var banksyncdtT = this.banksyncdtT;
                 var brachidT = this.brachidT;
                 var custidT = this.custidT;
                 var externaltrxidT = this.externaltrxidT;
                 var issyncT = this.issyncT;
                 var syncdtT = this.syncdtT;
                 var trxtypeT = this.trxtypeT;
                 var numberT = String(7);
                 var status = this.status;
                 if (status == 10) {
                     alert('Status can not Approve.Status is Bank Sync.')
                 }
                 else {

                     if (status != 7) {
                         var request = $http({
                             method: "put",
                             url: linkglobal + "/trx_details(" + trxId + ")",
                             crossDomain: true,
                             data: {
                                 trx_id: "'" + trx_id + "'",
                                 status: numberT,
                                 trx_dt: dateT,
                                 acc_id: accountidT,
                                 agent_id: agentidT,
                                 amt: amtT,
                                 bank_id: bankidT,
                                 bank_sync_dt: banksyncdtT,
                                 brach_id: brachidT,
                                 cust_id: custidT,
                                 external_trx_id: externaltrxidT,
                                 is_sync: issyncT,
                                 sync_dt: syncdtT,
                                 trx_type: trxtypeT,

                             },
                             headers: { 'Content-Type': 'application/json' },

                         }).success(function (data) {

                             alert('Status Approved');
                             // $scope.trans3 = null;
                             $scope.trxs = null;
                             $scope.todaytrxnrecall();
                         }).error(function (err) {
                             alert('Status Alerady Approved')
                         });
                     }
                     else {
                         alert('Status Alerady Approved!')
                     }
                 }

             }

             $scope.allapprovedtoday = function () {

                 if (count > 0) {
                     for (var i = 0; i < count; i++) {
                         var trxId = user1[i].trxId;
                         var external_trx_id = String(user1[i].external_trx_id);
                         var trx_id = String(user1[i].trx_id);
                         var bank_id = user1[i].bank_id;
                         var branch_id = user1[i].branch_id;
                         var cust_id = user1[i].cust_id;
                         var acc_id = user1[i].acc_id;
                         var agent_id = user1[i].agent_id;
                         var amt = user1[i].amt;
                         var trx_dt = user1[i].trx_dt;
                         var trx_type = user1[i].trx_type;
                         var status = String(7);
                         var is_sync = user1[i].is_sync;
                         var sync_dt = user1[i].sync_dt;
                         var bank_sync_dt = user1[i].bank_sync_dt;
                         var status1 = user1[i].status;
                         if (status1 == 10) {
                             // alert('Status can not Approve.Status is Bank Sync.')

                         }
                         else {

                             var request = $http({
                                 method: "put",
                                 url: linkglobal + "/trx_details('" + trxId + "')",
                                 crossDomain: true,
                                 data: {
                                     external_trx_id: external_trx_id,
                                     trx_id: trx_id,
                                     bank_id: bank_id,
                                     brach_id: branch_id,
                                     cust_id: cust_id,
                                     acc_id: acc_id,
                                     agent_id: agent_id,
                                     amt: amt,
                                     trx_dt: trx_dt,
                                     trx_type: trx_type,
                                     status: status,
                                     is_sync: is_sync,
                                     sync_dt: sync_dt,
                                     bank_sync_dt: bank_sync_dt,

                                 },
                                 headers: { 'Content-Type': 'application/json' },

                             }).success(function (data) {

                                 // alert('Data Updated On Server');
                             });
                         }

                     } //for loop close 

                     $scope.trxs = null;
                     // $scope.trans3 = null;
                     $scope.todaytrxnrecall();
                     //   $scope.allrecall();

                 }
                 else {
                     alert('Record not found');
                 }

             };

             //generate xlsx file
             $scope.exportDatatoday = function ($scope) {

                 $http.get(linkglobal + '/trxn_views?' + "$filter=status eq " + 7 + " and trx_dt eq " + date2 + " and bank_id eq " + imageIDData)
            .success(function (res) {
                var agent1 = res;
                var user1 = agent1.value;
                console.log('xlxs report date = ' + user1);

                var count = user1.length;

                if (count > 0) {

                    alasql('SELECT cust_name,external_trx_id,status,trx_dt,amt,external_account_id,agent_name INTO XLSX("Report.xlsx",{headers:true})  FROM ?', [user1]);

                }
                else {
                    alert('Record not found');
                }
            }).error(function (data) {
                alert('Record not found');
            });

             };

         });


    //dash board


    //get customers
    $scope.exact_log = $routeParams.cust_id;
    $scope.limit = 10;

    //  search customer





    //customer reload button
    $scope.limit = 10;
    $scope.next = function () {
        $scope.limit = $scope.limit + 10;
    };

    //search transaction by date



    var dtT = this.datetrxn;
    $scope.Date1 = dtT;
    var dt = "'" + dtT + "'";
    console.log('date wise = ' + dt);

    $scope.filterDatesfound = [];
    var getMonths;
    var getMonths2;
    var getYear;

    $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData)
      .success(function (response) {
          var dt1 = response;
          var dt2 = dt1.value;
          // $scope.trdate = dt2;
          $scope.trxndate = dt2;

          var count = dt2.length;

          for (var i = 0; i <= count; i++) {
              var getDateDataRecM = (dt2[i].trx_dt).slice(-7, 5);
              var getDateDataRecD = (dt2[i].trx_dt).slice(-10, 2);
              var getDateDataRecY = (dt2[i].trx_dt).slice(-4);
              var exactDataDate = '"' + getDateDataRecM + '-' + getDateDataRecD + '-' + getDateDataRecY + '"';

              $scope.filterDatesfound.push({
                  getMonths: exactDataDate,
                  getMonths2: getDateDataRecM + '-' + getDateDataRecY,
                  getYear: getDateDataRecY

              })

          }
      })

    $scope.getDateDataClick = function () {

        $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData)
          .success(function (response) {
              var dt1 = response;
              var dt2 = dt1.value;
              // $scope.trdate = dt2;
              $scope.trxndate = dt2;

              var count = dt2.length;

              for (var i = 0; i <= count; i++) {
                  var getDateDataRecM = (dt2[i].trx_dt).slice(-7, 5);
                  var getDateDataRecD = (dt2[i].trx_dt).slice(-10, 2);
                  var getDateDataRecY = (dt2[i].trx_dt).slice(-4);
                  var exactDataDate = '"' + getDateDataRecM + '-' + getDateDataRecD + '-' + getDateDataRecY + '"';

                  $scope.filterDatesfound.push({
                      getMonths: exactDataDate,
                      getMonths2: getDateDataRecM

                  })
              }
          });
    }





    $scope.recalldatetrxn = function () {
        $http.get(linkglobal + '/trxn_views?$filter=trx_dt eq ' + dt + ' and bank_id eq ' + imageIDData)
      .success(function (response) {
          var dt1 = response;
          var dt2 = dt1.value;
          $scope.trxndate = dt2;
      });
    };

    $http.get(linkglobal + '/trxn_views?$filter=trx_dt eq ' + dt + ' and bank_id eq ' + imageIDData)
   .success(function (response) {
       var dt1 = response;
       var user1 = dt1.value;
       var count = user1.length;
       $scope.trxndate = user1;

       $scope.statusApproveddatewise = function () {

           var trxId = $scope.trxId;
           var trx_id = String(this.selecttrx);
           var dateT = this.dateT;
           var accountidT = this.accountidT;
           var agentidT = this.agentidT;
           var amtT = this.amtT;
           var bankidT = this.bankidT;
           var banksyncdtT = this.banksyncdtT;
           var brachidT = this.brachidT;
           var custidT = this.custidT;
           var externaltrxidT = this.externaltrxidT;
           var issyncT = this.issyncT;
           var syncdtT = this.syncdtT;
           var trxtypeT = this.trxtypeT;
           var numberT = String(7);
           var status = this.status;
           if (status != 10) {
               if (status != 7) {
                   var request = $http({
                       method: "put",
                       url: linkglobal + "/trx_details('" + trxId + "')",
                       crossDomain: true,
                       data: {
                           trx_id: "'" + trx_id + "'",
                           status: numberT,
                           trx_dt: dateT,
                           acc_id: accountidT,
                           agent_id: agentidT,
                           amt: amtT,
                           bank_id: bankidT,
                           bank_sync_dt: banksyncdtT,
                           brach_id: brachidT,
                           cust_id: custidT,
                           external_trx_id: externaltrxidT,
                           is_sync: issyncT,
                           sync_dt: syncdtT,
                           trx_type: trxtypeT,

                       },
                       headers: { 'Content-Type': 'application/json' },

                   }).success(function (data) {

                       alert('Status Approved');
                       // $scope.trans3 = null;
                       $scope.$scope.trxndate = null;
                       $scope.recalldatetrxn();
                   }).error(function (err) {
                       alert('Status Alerady Approved')
                   });
               }
               else {
                   alert('Status Alerady Approved!')
               }
           }
           else {
               alert('Status can not Approve.Status is Bank Sync.')
           }
       }

       $scope.allapproveddatewise = function () {

           if (count > 0) {
               for (var i = 0; i < count; i++) {


                   var trxId = user1[i].trxId;
                   var external_trx_id = String(user1[i].external_trx_id);
                   var trx_id = String(user1[i].trx_id);
                   var bank_id = user1[i].bank_id;
                   var branch_id = user1[i].branch_id;
                   var cust_id = user1[i].cust_id;
                   var acc_id = user1[i].acc_id;
                   var agent_id = user1[i].agent_id;
                   var amt = user1[i].amt;
                   var trx_dt = user1[i].trx_dt;
                   var trx_type = user1[i].trx_type;
                   var status = String(7);
                   var is_sync = user1[i].is_sync;
                   var sync_dt = user1[i].sync_dt;
                   var bank_sync_dt = user1[i].bank_sync_dt;
                   var status1 = user1[i].status;
                   if (status1 != 10) {

                       var request = $http({
                           method: "put",
                           url: linkglobal + "/trx_details('" + trxId + "')",
                           crossDomain: true,
                           data: {
                               external_trx_id: external_trx_id,
                               trx_id: trx_id,
                               bank_id: bank_id,
                               brach_id: branch_id,
                               cust_id: cust_id,
                               acc_id: acc_id,
                               agent_id: agent_id,
                               amt: amt,
                               trx_dt: trx_dt,
                               trx_type: trx_type,
                               status: status,
                               is_sync: is_sync,
                               sync_dt: sync_dt,
                               bank_sync_dt: bank_sync_dt,

                           },
                           headers: { 'Content-Type': 'application/json' },

                       }).success(function (data) {

                           // alert('Data Updated On Server');
                       });
                   }
                   else {
                       alert('Status can not Approve!')
                   }
               } //for loop close 

               $scope.$scope.trxndate = null;
               $scope.recalldatetrxn();

           }
           else {
               alert('Record not found');
           }

       };

       $scope.exportDatewise = function ($scope) {

           $http.get(linkglobal + '/trxn_views?' + "$filter=status eq " + 7 + " and trx_dt eq " + dt + " and bank_id eq " + imageIDData)
      .success(function (res) {
          var agent1 = res;
          var user1 = agent1.value;
          console.log('xlxs report date = ' + user1);

          var count = user1.length;

          if (count > 0) {

              alasql('SELECT cust_name,external_trx_id,status,trx_dt,amt,external_account_id,agent_name INTO XLSX("Report.xlsx",{headers:true})  FROM ?', [user1]);

          }
          else {
              alert('Record not found');
          }
      }).error(function (data) {
          alert('Record not found');
      });

       };

   });


    //new
    $http.get(linkglobal + '/user_details?$filter=bank_id eq ' + imageIDData)
           .success(function (res) {
               var user = res;
               var user1 = user.value;
               $scope.usersall = user1;
           });

    // serach role
    $http.get(linkglobal + '/role_details?$filter=bank_id eq ' + imageIDData)
      .success(function (response) {
          var role = response;
          var role1 = role.value;
          $scope.allroles = role1;
      });

    // role_detail route params
    $scope.exact_role = $routeParams.role_id;
    var exact_roleid = $scope.exact_role;
    var exroleid = "'" + exact_roleid + "'";

    $http.get(linkglobal + '/role_details?$filter=external_roll_id eq ' + exroleid + ' and bank_id eq ' + imageIDData)
          .success(function (response) {
              var role = response;
              var role1 = role.value;
              $scope.roles = role1;
              var count = role1.length;

              $scope.updaterole = function () {
                  var external_roll_id;
                  var role_id;
                  var is_sync;
                  var sync_dt;
                  var bank_sync_dt;


                  for (var i = 0; i < count; i++) {
                      external_roll_id = role1[i].external_roll_id;
                      role_id = role1[i].role_id;
                      is_sync = role1[i].is_sync;
                      sync_dt = role1[i].sync_dt;
                      bank_sync_dt = role1[i].bank_sync_dt;
                  }

                  var roletype1 = this.roletypes;
                  console.log(roletype1);
                  var rolestatus1 = this.roleStatus;

                  var request = $http({
                      method: "put",
                      url: linkglobal + "/role_details(" + external_roll_id + ")",
                      crossDomain: true,
                      data: {
                          external_roll_id: external_roll_id,
                          role_id: role_id,
                          role_type: roletype1,
                          status: rolestatus1,
                          is_sync: is_sync,
                          sync_dt: sync_dt,
                          bank_sync_dt: bank_sync_dt
                      },
                      headers: { 'Content-Type': 'application/json' },

                  }).success(function (data) {

                      alert('Data Updated On Server');

                  });


              }





              $scope.deleterole = function () {

                  for (var i = 0; i < count; i++) {
                      role_id = role1[i].role_id;
                  }
                  var request = $http({
                      method: "delete",
                      url: linkglobal + "/role_details(" + role_id + ")"
                  }).success(function (data) {
                      alert('Data Deleted');
                  });

              }

          });

    //user_deatail route params
    $scope.uid = $routeParams.uid;
    var exact_uid = "'" + $scope.uid + "'";

    //user update delete

    $http.get(linkglobal + '/user_details?$filter=external_login_id eq ' + exact_uid + ' and bank_id eq ' + imageIDData)
          .success(function (res) {
              var user = res;
              var user1 = user.value;
              console.log('users =' + user1);
              $scope.users4 = user1;
              var count = user1.length;
              var login_id;
              $scope.userUpdate = function () {

                  var external_login_id;
                  var login_id;
                  var is_sync;
                  var sync_dt;
                  var bank_sync_dt;


                  for (var i = 0; i < count; i++) {
                      external_login_id = String(user1[i].external_login_id);
                      login_id = user1[i].login_id;
                      is_sync = user1[i].is_sync;
                      sync_dt = user1[i].sync_dt;
                      bank_sync_dt = user1[i].bank_sync_dt;
                  }

                  var pwd = this.userpwd1;
                  console.log('password=' + pwd);
                  var role_id = this.userrole_id1;
                  var status = this.userstatus1;
                  var bank_id = this.userbankid1;
                  var request = $http({
                      method: "put",
                      url: linkglobal + "/user_details(" + login_id + ")",
                      crossDomain: true,
                      data: {
                          external_login_id: external_login_id,
                          login_id: login_id,
                          pwd: pwd,
                          role_id: role_id,
                          status: status,
                          is_sync: is_sync,
                          sync_dt: sync_dt,
                          bank_sync_dt: bank_sync_dt,
                          bank_id: bank_id
                      },
                      headers: { 'Content-Type': 'application/json' },

                  }).success(function (data) {

                      alert('Data Updated On Server');
                  });

              };

              $scope.userDelete = function () {

                  for (var i = 0; i < count; i++) {
                      login_id = user1[i].login_id;
                  }
                  var request = $http({
                      method: "delete",
                      url: linkglobal + "/user_details(" + login_id + ")"
                  }).success(function (data) {
                      alert('Data Deleted');
                  });
              }

          });

    // end user update delete


    //search braches
    $http.get(linkglobal + '/branches?$filter=bank_id eq ' + imageIDData)
          .success(function (res) {
              var br = res;
              var br1 = br.value;
              $scope.branchesall = br1;
          });

    $scope.branchid = $routeParams.branch_id;
    var branchid1 = "'" + $scope.branchid + "'";

    $http.get(linkglobal + '/branches?$filter=external_branch_id eq ' + branchid1 + ' and bank_id eq ' + imageIDData)
         .success(function (res) {
             var br = res;
             var br1 = br.value;
             $scope.branches12 = br1;
             var count = br1.length;
             var external_branch_id;
             var branch_id;
             var is_sync;
             var sync_dt;
             var bank_sync_dt;

             $scope.branchUpdate = function () {
                 for (var i = 0; i < count; i++) {
                     external_branch_id = String(br1[i].external_branch_id);
                     branch_id = br1[i].branch_id;
                     is_sync = br1[i].is_sync;
                     sync_dt = br1[i].sync_dt;
                     bank_sync_dt = br1[i].bank_sync_dt;
                 }
                 var branch_name = this.branchname1;
                 //  console.log('branch name =' + this.branchname1);
                 var bank_id = this.branchbankid1;
                 //console.log('branch name =' + bank_id);

                 var branch_add = this.branchbranchadd1;
                 var branch_phno_1 = this.branchbranchphno11;
                 var branch_phno_2 = this.branchbranchphno21;
                 var status = this.branchstatus1;

                 var request = $http({
                     method: "put",
                     url: linkglobal + "/branches(" + external_branch_id + ")",
                     crossDomain: true,
                     data: {
                         external_branch_id: external_branch_id,
                         branch_id: branch_id,
                         branch_name: branch_name,
                         bank_id: bank_id,
                         branch_add: branch_add,
                         branch_phno_1: branch_phno_1,
                         branch_phno_2: branch_phno_2,
                         status: status,
                         is_sync: is_sync,
                         sync_dt: sync_dt,
                         bank_sync_dt: bank_sync_dt
                     },
                     headers: { 'Content-Type': 'application/json' },

                 }).success(function (data) {

                     alert('Data Updated On Server');
                 });
             };

             $scope.branchDelete = function () {
                 for (var i = 0; i < count; i++) {
                     external_branch_id = String(br1[i].external_branch_id);
                 }
                 var request = $http({
                     method: "delete",
                     url: linkglobal + "/branches(" + external_branch_id + ")"
                 }).success(function (data) {
                     alert('Data Deleted');
                 });
             }

         });



    $http.get(linkglobal + '/banks?$filter=bank_id eq ' + imageIDData)
    .success(function (res) {
        var bank = res;
        var bank1 = bank.value;
        $scope.bankid = bank1;
    });

    //search bank
    $http.get(linkglobal + '/banks?$filter=bank_id eq ' + imageIDData)
    .success(function (res) {
        var bank = res;
        var bank1 = bank.value;
        $scope.bankall = bank1;
    });

    $scope.bankid = $routeParams.exbank_id;
    $scope.trxData = $routeParams.exbank_id;

    var exbankid = "'" + $scope.bankid + "'";

    $http.get(linkglobal + '/banks?$filter=external_bank_id eq ' + exbankid + ' and bank_id eq ' + imageIDData)
     .success(function (res) {
         var bn = res;
         var bn1 = bn.value;
         $scope.bank12 = bn1;
         var count = bn1.length;
         var external_bank_id;
         var bank_id;
         var is_sync;
         var sync_dt;
         var bank_sync_dt;

         $scope.updatebank = function () {

             for (var i = 0; i < count; i++) {

                 external_bank_id = bn1[i].external_bank_id;
                 bank_id = bn1[i].bank_id;
                 is_sync = bn1[i].is_sync;
                 sync_dt = bn1[i].sync_dt;
                 bank_sync_dt = bn1[i].bank_sync_dt;
             }
             var bank_name = this.bankname;
             console.log(bank_name);
             var bank_add = this.bankadd;
             var bank_phno_1 = this.bankphno1;
             var bank_phno_2 = this.bankphno2;
             var status = this.bankstatus;

             var request = $http({
                 method: "put",
                 url: linkglobal + "/banks(" + external_bank_id + ")",
                 crossDomain: true,
                 data: {
                     external_bank_id: external_bank_id,
                     bank_id: bank_id,
                     bank_name: bank_name,
                     bank_add: bank_add,
                     bank_phno_1: bank_phno_1,
                     bank_phno_2: bank_phno_2,
                     status: status,
                     is_sync: is_sync,
                     sync_dt: sync_dt,
                     bank_sync_dt: bank_sync_dt
                 },
                 headers: { 'Content-Type': 'application/json' },

             }).success(function (data) {

                 alert('Data Updated On Server');
             });
         }

         $scope.deletebank = function () {
             for (var i = 0; i < count; i++) {

                 external_bank_id = bn1[i].external_bank_id;
             }
             var request = $http({
                 method: "delete",
                 url: linkglobal + "/banks(" + external_bank_id + ")"
             }).success(function (data) {
                 alert('Data Deleted');
             });
         }
     });
    //end bank search

    //search account

    $http.get(linkglobal + '/accounts?$filter=bank_id eq ' + imageIDData)
        .success(function (res) {
            var acc = res;
            var acc1 = acc.value;
            $scope.accounts = acc1;

        });

    //update account
    $scope.accountid = $routeParams.acc_id;
    var accountid1 = $scope.accountid;

    $http.get(linkglobal + '/accounts?$filter=acc_id eq ' + accountid1 + ' and bank_id eq ' + imageIDData)
     .success(function (response) {
         var acc = response;
         var acc1 = acc.value;
         $scope.accounts = acc1;
         var count = acc1.length;
         var cust_id;



         $scope.updateaccount = function () {
             var external_account_id;
             var acc_id;
             var is_sync;
             var sync_dt;
             var bank_sync_dt;


             for (var i = 0; i < count; i++) {
                 external_account_id = acc1[i].external_account_id;
                 acc_id = acc1[i].acc_id;
                 is_sync = acc1[i].is_sync;
                 sync_dt = acc1[i].sync_dt;
                 bank_sync_dt = acc1[i].bank_sync_dt;
             }
             var cust_id = this.acccustid;
             var acc_bal = this.accbal;
             var bank_id = this.accbankid;
             var branch_id = this.accbranchid;
             var agent_id = this.accagentid;
             var status = this.accstatus;
             var acc_type = this.acctype;

             var request = $http({
                 method: "put",
                 url: linkglobal + "/accounts(" + acc_id + ")",
                 crossDomain: true,
                 data: {
                     external_account_id: external_account_id,
                     acc_id: acc_id,
                     cust_id: cust_id,
                     balance: acc_bal,
                     bank_id: bank_id,
                     branch_id: branch_id,
                     agent_id: agent_id,
                     status: status,
                     is_sync: is_sync,
                     sync_dt: sync_dt,
                     bank_sync_dt: bank_sync_dt,
                     Account_Type: acc_type
                 },
                 headers: { 'Content-Type': 'application/json' },

             }).success(function (data) {

                 alert('Data Updated On Server');

             });


         }

         $scope.deleteaccount = function () {

             for (var i = 0; i < count; i++) {
                 acc_id = acc1[i].acc_id;
             }
             var request = $http({
                 method: "delete",
                 url: linkglobal + "/accounts(" + acc_id + ")"
             }).success(function (data) {
                 alert('Data Deleted');
             });

         }

     });
    //end update account
    //end search account


    $scope.createbank = function () {
        var external_bank_id = this.exBankId;
        var bank_id = this.bankId;
        var bank_name = this.bankname;
        var bank_address = this.bankaddress;
        var bank_phoneno1 = this.bankPhNo1;
        var bank_phoneno2 = this.bankPhNo2;
        //  var status = this.Status;
        var status = String(0);
        var request = $http({
            method: "post",
            url: linkglobal + "/banks",
            crossDomain: true,
            data: {
                external_bank_id: external_bank_id,
                bank_id: bank_id,
                bank_name: bank_name,
                bank_add: bank_address,
                bank_phno_1: bank_phoneno1,
                bank_phno_2: bank_phoneno2,
                status: status,

            },
            headers: { 'Content-Type': 'application/json' },

        }).success(function (data) {

            alert('Data Saved On Server');

        }).error(function (err) {
            alert('Data Can Not Saved On Server');
        });
    };

    $scope.createrole = function () {

        var external_role_id = this.exRoleId;
        var role_id = this.roleId;
        var role_type = this.roleType;
        var role_type1 = String(role_type);

        console.log('role type=' + role_type);
        // var status = this.status;
        var status = String(0);
        var request = $http({
            method: "post",
            url: linkglobal + "/role_details",
            crossDomain: true,
            data: {
                external_roll_id: external_role_id,
                role_id: role_id,
                role_type: role_type1,
                status: status,

            },
            headers: { 'Content-Type': 'application/json' },

        }).success(function (data) {

            alert('Data Saved On Server');

        }).error(function (err) {

            alert('Data Can Not Saved On Server');
        });

    };

    $scope.createbranch = function () {

        var external_branch_id = this.exBranchId;
        var branch_id = this.branchId;
        var branch_name = this.branchname;
        var bank_id = this.branchBankid;
        var branch_address = this.branchAddress;
        var branch_phoneno1 = this.branchPhNo1;
        var branch_phneno2 = this.branchPhNo2;
        //var status = this.branchStatus;
        var status = String(0);

        var data = [{
            "external_branch_id": external_branch_id,
            "branch_id": branch_id,
            "branch_name": branch_name,
            "bank_id": bank_id,
            "branch_add": branch_address,
            "branch_phno_1": branch_phoneno1,
            "branch_phno_2": branch_phneno2,
            "status": status
        }]

        //var transactioD = JSON.stringify(data);

        //var request = $http({
        //    method: "post",
        //    url: linkglobal+"/branches",
        //    crossDomain: true,
        //    data: {
        //        external_branch_id: external_branch_id,
        //        branch_id: branch_id,
        //        branch_name: branch_name,
        //        bank_id: bank_id,
        //        branch_add: branch_address,
        //        branch_phno_1: branch_phoneno1,
        //        branch_phno_2: branch_phneno2,
        //        status: status


        //    },
        //    headers: { 'Content-Type': 'application/json' },

        //}).success(function (data) {

        //    alert('Data Saved On Server');
        //}).error(function (err) {

        //    alert('Data Can Not Saved On Server');
        //});

        //var xldata = alasql('SELECT * FROM XLSX("Report.xlsx")');
        //console.log('xldata' + xldata);
        // xldata.push(data);
        // alasql('SELECT external_branch_id,branch_id,branch_name,bank_id,branch_add,branch_phno_1,branch_phno_2,status INTO XLSX("Report.xlsx",{headers:true})  FROM ?', [xldata]);
        alasql("INSERT INTO XLSX('C:\\Users\\Mservices2\\Downloads\\Report.xlsx',{headers:true})) FROM ?", [data]);

    };

    $scope.createuser = function () {

        var external_login_id = this.exLoginId;
        var login_id = this.loginId;
        var pwd = this.password;
        var role_id = this.userRoleId;
        //var status = this.userStatus;
        var status = String(0);
        var Bank_id = this.userbankid;


        var request = $http({
            method: "post",
            url: linkglobal + "/user_details",
            crossDomain: true,
            data: {
                external_login_id: external_login_id,
                login_id: login_id,
                pwd: pwd,
                role_id: role_id,
                status: status,
                bank_id: Bank_id

            },
            headers: { 'Content-Type': 'application/json' },

        }).success(function (data) {

            alert('Data Saved On Server');
        }).error(function (err) {

            alert('Data Can Not Saved On Server');
        });
    };


    $scope.createcustomer = function () {

        var external_cust_id = this.exCustId;
        var cust_id = this.custId;
        var cust_name = this.customername;
        var cust_local_add = this.custLocalAddress;
        var cust_perm_add = this.custPermAddress;
        var cust_phno_1 = this.custPhNo1;
        var cust_phno_2 = this.custPhNo2;
        var cust_photo = this.custStatus;
        var cust_pancard_no = this.custPaancardno;
        var cust_email_id = this.custEmailId;
        var login_id = this.custLoginId;
        var role_id = this.custRoleId;
        var agent_id = this.custAgentId;
        // var status = this.CustStatus;
        var status = String(0);
        var bank_id = this.custbankid;

        var request = $http({
            method: "post",
            url: linkglobal + "/customers",
            crossDomain: true,
            data: {
                external_cust_id: external_cust_id,
                cust_id: cust_id,
                cust_name: cust_name,
                cust_local_add: cust_local_add,
                cust_perm_add: cust_perm_add,
                cust_phno_1: cust_phno_1,
                cust_phno_2: cust_phno_2,
                cust_photo: cust_photo,
                cust_pancard_no: cust_pancard_no,
                cust_email_id: cust_email_id,
                login_id: login_id,
                role_id: role_id,
                agent_id: agent_id,
                status: status,
                bank_id: bank_id

            },
            headers: { 'Content-Type': 'application/json' },

        }).success(function (data) {

            alert('Data Saved On Server');
        }).error(function (err) {

            alert('Data Can Not Saved On Server');
        });
    };

    $scope.createaccount = function () {


        var external_account_id = this.exAccountId;
        var acc_id = this.accountId;
        var cust_id = this.accCustomerId;
        var balance = this.accountBalane;
        var bank_id = this.accountBankId;
        var branch_id = this.accountBranchId;
        var agent_id = this.accountAgentId;
        var status = String(0);
        var Account_Type = this.accountType;

        var request = $http({
            method: "post",
            url: linkglobal + "/accounts",
            crossDomain: true,
            data: {
                external_account_id: external_account_id,
                acc_id: acc_id,
                cust_id: cust_id,
                balance: balance,
                bank_id: bank_id,
                branch_id: branch_id,
                agent_id: agent_id,
                status: status,
                Account_Type: Account_Type,

            },
            headers: { 'Content-Type': 'application/json' },
        }).success(function (data) {

            alert('Data Saved On Server');

        }).error(function (err) {

            alert('Data Can Not Saved On Server');

        });
    };

    //assign Agent
    $scope.assignid = $routeParams.assign_id;
    var assignid1 = $scope.assignid;

    $http.get(linkglobal + '/customers?$filter=cust_id eq ' + assignid1 + ' and bank_id eq ' + imageIDData)
        .success(function (res) {
            var accid = res;
            var accid1 = accid.value;
            var count = accid1.length;
            $scope.assincus = accid1;
            console.log('assignid1 =' + accid1);

            $scope.assign = function () {

                var aagentid = doParseInt(this.aagentid);

                console.log('aagentid = ' + aagentid);
                var external_cust_id;
                var cust_id;
                var cust_name;
                var cust_local_add;
                var cust_phno_1;
                var cust_phno_2;
                var cust_photo;
                var cust_pancard_no;
                var cust_email_id;
                var login_id;
                var role_id;
                var is_sync;
                var sync_dt;
                var bank_sync_dt;
                var bank_id;
                var status;
                for (var i = 0; i < count; i++) {

                    external_cust_id = String(accid1[i].external_cust_id);
                    cust_id = accid1[i].cust_id;
                    cust_local_add = accid1[i].cust_local_add;
                    cust_name = accid1[i].cust_name;
                    cust_phno_1 = accid1[i].cust_phno_1;
                    cust_phno_2 = accid1[i].cust_phno_2;
                    cust_photo = accid1[i].cust_photo;
                    cust_pancard_no = accid1[i].cust_pancard_no;
                    cust_email_id = accid1[i].cust_email_id;
                    login_id = accid1[i].login_id;
                    role_id = accid1[i].role_id;
                    status: accid1[i].status;
                    is_sync = accid1[i].is_sync;
                    sync_dt = accid1[i].sync_dt;
                    bank_sync_dt = accid1[i].bank_sync_dt;
                    bank_id = accid1[i].bank_id;

                }

                var request = $http({
                    method: "put",
                    url: linkglobal + "/customers(" + cust_id + ")",
                    crossDomain: true,
                    data: {
                        external_cust_id: external_cust_id,
                        cust_id: cust_id,
                        cust_name: cust_name,
                        cust_local_add: cust_local_add,
                        cust_phno_1: cust_phno_1,
                        cust_phno_2: cust_phno_2,
                        cust_photo: cust_photo,
                        cust_pancard_no: cust_pancard_no,
                        cust_email_id: cust_email_id,
                        login_id: login_id,
                        role_id: role_id,
                        agent_id: aagentid,
                        status: status,
                        is_sync: is_sync,
                        sync_dt: sync_dt,
                        bank_sync_dt: bank_sync_dt,
                        bank_id: bank_id
                    },
                    headers: { 'Content-Type': 'application/json' },

                }).success(function (data) {

                    alert('Data Updated On Server');

                });
            };

        });


    //End Assign Agent



})

scotchApp.filter('unique', function () {
    return function (collection, keyname) {
        var output = [],
            keys = [];

        angular.forEach(collection, function (dt2) {
            var key = dt2[keyname];
            if (keys.indexOf(key) === -1) {
                keys.push(key);
                output.push(dt2);
            }
        });
        return output;
    };
})

scotchApp.controller('createCtrl', function ($scope, $http, $rootScope, $location) {

    $scope.createdata = function () {
        if ($rootScope.user == null) {
            $location.path('/');
        }

        $scope.logout = function () {
            $rootScope.user = null;
            $location.path('/');

        };


        console.log('users =' + role1);

    };//close ctrl method

});
