﻿
// create the module and name it scotchApp
var scotchApp = angular.module('app.today_transactions', ['ngRoute'])


scotchApp.controller('today_transactionsController', function ($rootScope, $scope, $http, $routeParams, $location, $filter, $cookieStore) {
    $scope.CheckLogin = function () {
        if ($cookieStore.get('bankIDImg') == undefined) { $location.path('/'); }


    }


    var roughtDetails = $cookieStore.get('user');
    var imageIDData = $cookieStore.get('bankIDImg');
    $scope.imgIdDdURL = imageIDData;


    var linkglobal = $cookieStore.get('urlBanks');  //Bank Bhandara

    //for Showing a menu
    $scope.transaction = true;
    $scope.search = true;
    $scope.request = true;
    $scope.create = true;
    $scope.reports = true;

    $scope.limit = 30;

    $scope.limitTo = function () {
        $scope.limit = $scope.limit + 30;
    }
    $scope.Date1 = $filter('date')(new Date(), 'yyyy-MM-dd');
    $scope.Date3 = $filter('date')(new Date(), 'dd-MM-yyyy');

    var date2 = "'" + $scope.Date1 + "'";
    var date3 = "'" + $scope.Date3 + "'";
    //get total transactions dashaboard
    // $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData + ' and status ne 7 and status ne 10 and status ne 11 and trx_data ne ' + 3 + ' and trx_dt eq ' + date2 + ' or trx_dt eq ' + date3)
    $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData + ' and status eq 2 and trx_data ne ' + 3 + ' and trx_dt eq ' + date3)
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
           });
    //get total transactions dashaboard
    $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData + ' and status eq 2 and trx_data ne ' + 3 + ' and trx_dt eq ' + date3).success(function (response) {
        var trans1 = response; var user1 = trans1.value; $scope.todayRecordTrans = user1;
        var count = user1.length; var amt = 0; var count = user1.length;
        for (var i = 0; i < count; i++) { amt = amt + user1[i].amt; }
    });

    //code for get
    $scope.refresh = function () {

        $scope.todayRecordTrans = null;
        //   $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData + ' and status ne 7 and status ne 10 and status ne 11 and trx_data ne ' + 3 + ' and trx_dt eq ' + date2 + ' or trx_dt eq ' + date3)
        $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData + ' and status eq 2 and trx_data ne ' + 3 + ' and trx_dt eq ' + date3)
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
           });
        //get total transactions dashaboard
        $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData + 'and status eq 2 and trx_data ne ' + 3 + ' and trx_dt eq ' + date3).success(function (response) {
            var trans1 = response; var user1 = trans1.value; $scope.todayRecordTrans = user1;
            var count = user1.length; var amt = 0; var count = user1.length;
            for (var i = 0; i < count; i++) { amt = amt + user1[i].amt; }
        });

    }

    // alert(date3);




    //post status approved
    $scope.statusApprovedtoday = function () {
        //var trxId = this.trxId;
        //var trx_id = String(this.selecttrx);
        //var dateT = this.dateT;
        //var accountidT = this.accountidT;
        //var agentidT = this.agentidT;
        //var amtT = this.amtT;
        //var bankidT = this.bankidT;
        //var banksyncdtT = this.banksyncdtT;
        //var brachidT = this.brachidT;
        //var custidT = this.custidT;
        //var externaltrxidT = this.externaltrxidT;
        //var issyncT = this.issyncT;
        //var syncdtT = this.syncdtT;
        //var trxtypeT = this.trxtypeT;
        //var numberT = String(7);
        //var status = this.status;
        //$scope.trxtypeT = this.trxtypeT;;
        //$scope.accountidT = this.accountidT;
        //$scope.money = this.amtT;


        //var balance = this.balance;
        //var interestAmount = this.interestAmount;
        //var noOfDays = this.days;


        ////alert(trxId);
        ////alert(balance);
        ////alert(interestAmount);
        ////alert(noOfDays);


        //if (status == 10) {
        //    alert('Status can not Approve.Status is Bank Sync.')
        //}
        //else {

        //    if (status != 7) {
        //        var request = $http({
        //            method: "put",
        //            url: linkglobal + "/trx_details(" + trxId + ")",
        //            crossDomain: true,
        //            data: {
        //                trx_id: trx_id,
        //                status: numberT,
        //                trx_dt: dateT,
        //                acc_id: accountidT,
        //                agent_id: agentidT,
        //                amt: amtT,
        //                bank_id: bankidT,
        //                bank_sync_dt: banksyncdtT,
        //                brach_id: brachidT,
        //                cust_id: custidT,
        //                external_trx_id: externaltrxidT,
        //                is_sync: issyncT,
        //                sync_dt: syncdtT,
        //                trx_type: trxtypeT,

        //                balance: balance,
        //                InterestAmount: interestAmount,
        //                NumberOfDays: noOfDays,
        //            },
        //            headers: { 'Content-Type': 'application/json' },

        //        }).success(function (data) {
        //            var trxtypeT = $scope.trxtypeT;
        //            var accountidT = $scope.accountidT;
        //            var money = $scope.money;
        //            $http.get(linkglobal + "/accounts" + "?$filter=acc_id eq " + accountidT).then(function (res) {
        //                var role = res.data;
        //                var users = role.value;
        //                var getbalnce = users[0].balance;


        //                $scope.external_account_ids = users[0].external_account_id;
        //                $scope.IdFounds = users[0].agent_id;

        //                $scope.bank_ids = users[0].bank_id;
        //                $scope.brach_ids = users[0].branch_id;
        //                $scope.cust_ids = users[0].cust_id;
        //                $scope.acc_ids = users[0].acc_id;
        //                $scope.agent_ids = users[0].agent_id;
        //                $scope.Account_Types = users[0].Account_Type;
        //                $scope.trx_types = users[0].trx_type;
        //                $scope.is_syncs = users[0].is_sync;
        //                $scope.sync_dts = users[0].sync_dt;
        //                $scope.bank_sync_dts = users[0].bank_sync_dt;


        //                if ($scope.trx_types == 3) {
        //                    var balance = getbalnce - money;
        //                } else {
        //                    var balance = getbalnce + money;
        //                }



        //                var request = $http({
        //                    method: "put",
        //                    url: linkglobal + "/accounts(" + $scope.acc_ids + ")",
        //                    crossDomain: true,
        //                    data: {
        //                        external_account_id: $scope.external_account_ids,
        //                        cust_id: $scope.cust_ids,
        //                        balance: balance,
        //                        bank_id: $scope.bank_ids,
        //                        branch_id: $scope.branch_ids,
        //                        agent_id: $scope.agent_ids,
        //                        status: 1,
        //                        is_sync: true,
        //                        sync_dt: $scope.sync_dts,
        //                        bank_sync_dt: $scope.bank_sync_dts,
        //                        Account_Type: $scope.Account_Types,
        //                        trx_type: $scope.trx_types,
        //                    },
        //                    headers: { 'Content-Type': 'application/json' },
        //                })

        //            })


        //            alert('Status Approved');

        //            $http.get(linkglobal + "/trxn_views?$filter=trx_dt eq " + date3 + ' and bank_id eq ' + imageIDData + 'and status ne 7 and status ne 10 and status ne 11 and trx_data ne 3').success(function (response) {
        //                var trans1 = response; var user1 = trans1.value; $scope.todayRecordTrans = user1;
        //                var count = user1.length; var amt = 0; var count = user1.length;
        //                for (var i = 0; i < count; i++) { amt = amt + user1[i].amt; }
        //            });

        //        }).error(function (err) {
        //            alert('Status Alerady Approved')
        //        });
        //    }
        //    else {
        //        alert('Status Alerady Approved!')
        //    }
        //}



        ////new code

        var trxId = this.trxId;
        // alert(trxId);
        var trx_id = String(this.selecttrx);


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
        var numberT = String(17);
        var status = this.status;

        $scope.trxtypeT = this.trxtypeT;;
        $scope.accountidT = this.accountidT;
        $scope.money = this.amtT;

        var balance = this.balance;
        var interestAmount = this.interestAmount;
        var noOfDays = this.days;
        var dateT = this.dateT;
        var accountidT = this.accountidT;


        $http.get(linkglobal + '/accounts?$filter=bank_id eq ' + imageIDData + ' and acc_id eq ' + accountidT)
            .success(function (response) {
                var trans1 = response;
                var user1 = trans1.value;
                balance1 = user1[0].balance;

                // alert('Account Tbl balance ' + balance1);


                /// alert('trxnAmt' + $scope.tabTransactionAmount)

                var totalBalance = balance1 + amtT;

                ///alert(amtT + 'balance');

                // alert('Tot ' + totalBalance);

                if (status == 7 || status == 10) {
                    alert('Status can not Approve. Status is Already Sync to Bank.');
                }
                else {
                    if (status != 7 || status1 != 10) {
                        //alert('work');

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

                                balance: totalBalance,
                                InterestAmount: interestAmount,
                                NumberOfDays: noOfDays,

                            },
                            headers: { 'Content-Type': 'application/json' },

                        }).success(function (data) {

                            var trxtypeT = $scope.trxtypeT;
                            var accountidT = $scope.accountidT;
                            var money = $scope.money;


                            $http.get(linkglobal + "/accounts" + "?$filter=acc_id eq " + accountidT).then(function (res) {
                                var role = res.data;
                                var users = role.value;
                                var getbalnce = users[0].balance;


                                $scope.external_account_ids = users[0].external_account_id;
                                $scope.IdFounds = users[0].agent_id;

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


                                if ($scope.trx_types == 3) {
                                    var balance = getbalnce - money;
                                } else {
                                    var balance = getbalnce + money;
                                }

                                //same transaction inserted into trx_details table
                                var request = $http({
                                    method: "post",
                                    url: linkglobal + "/trx_details",
                                    crossDomain: true,
                                    data: {
                                        trx_id: trx_id + 1,
                                        status: 7,
                                        trx_dt: dateT,
                                        acc_id: accountidT,
                                        agent_id: agentidT,
                                        amt: amtT,
                                        bank_id: bankidT,
                                        bank_sync_dt: banksyncdtT,
                                        brach_id: brachidT,
                                        cust_id: custidT,
                                        external_trx_id: externaltrxidT + 1,
                                        is_sync: issyncT,
                                        sync_dt: syncdtT,
                                        trx_type: trxtypeT,

                                        balance: totalBalance,
                                        InterestAmount: interestAmount,
                                        NumberOfDays: noOfDays,

                                    },
                                    headers: { 'Content-Type': 'application/json' },

                                })


                                var request = $http({
                                    method: "put",
                                    url: linkglobal + "/accounts(" + $scope.acc_ids + ")",
                                    crossDomain: true,
                                    data: {
                                        external_account_id: $scope.external_account_ids,
                                        cust_id: $scope.cust_ids,
                                        balance: balance,
                                        bank_id: $scope.bank_ids,
                                        branch_id: $scope.branch_ids,
                                        agent_id: $scope.agent_ids,
                                        status: 1,
                                        is_sync: true,
                                        sync_dt: $scope.sync_dts,
                                        bank_sync_dt: $scope.bank_sync_dts,
                                        Account_Type: $scope.Account_Types,
                                        trx_type: $scope.trx_types,
                                    },
                                    headers: { 'Content-Type': 'application/json' },
                                })

                            })

                            alert('Status Approved and Balance is Updated');

                            // $http.get(linkglobal + '/trxn_views')
                            //.success(function (response) { var trans1 = response; var user1 = trans1.value; $scope.trans3 = user1; });
                            //status ne 17 and status ne 7 and status ne 10 and status ne 11 and
                            $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData + ' and trx_data ne ' + 3 + ' and status eq 2')
                                 .success(function (response) {
                                     var trans1 = response;
                                     var user1 = trans1.value;
                                     $scope.todayRecordTrans = user1;
                                     var count = user1.length;
                                     var amt = 0;

                                     $scope.trxs = user1;

                                     var count = user1.length;
                                     for (var i = 0; i < count; i++) {
                                         amt = amt + user1[i].amt;

                                     }

                                     $scope.agentTransactionsApprove = amt;
                                 })




                        }).error(function (err) {
                            alert('Status Alerady Approved ');
                        });
                    }
                    else {
                        alert('Status Alerady Approved!')
                    }
                }
            })

    }




    $scope.allapprovedtoday = function () {
        $http.get(linkglobal + '/trxn_views?$filter=trx_dt eq ' + date2 + ' and bank_id eq ' + imageIDData + ' and trx_data ne 3')
       .success(function (response) {
           var amt = 0;
           var trx1 = response;
           var user1 = trx1.value;
           $scope.trxs = user1;

           $scope.alertLoading = true;

           var count = user1.length;
           for (var i = 0; i < count; i++) {
               amt = amt + user1[i].amt;
           }

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
                       $scope.alertData = true;
                       $scope.alertLoading = false;

                   }
                   else {
                       $scope.alertLoading = true;

                       $http.get(linkglobal + "/accounts" + "?$filter=acc_id eq " + user1[i].acc_id).then(function (res) {
                           var role = res.data;
                           var users = role.value;
                           var getbalnce = users[0].balance;

                           $scope.external_account_ids = users[0].external_account_id;
                           $scope.IdFounds = users[0].agent_id;

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


                           if ($scope.trx_types == 3) {
                               var balance = getbalnce - money;
                           } else {
                               var balance = getbalnce + money;
                           }




                           var request = $http({
                               method: "put",
                               url: linkglobal + "/accounts(" + $scope.acc_ids + ")",
                               crossDomain: true,
                               data: {
                                   external_account_id: $scope.external_account_ids,
                                   cust_id: $scope.cust_ids,
                                   balance: balance,
                                   bank_id: $scope.bank_ids,
                                   branch_id: $scope.branch_ids,
                                   agent_id: $scope.agent_ids,
                                   status: 1,
                                   is_sync: true,
                                   sync_dt: $scope.sync_dts,
                                   bank_sync_dt: $scope.bank_sync_dts,
                                   Account_Type: $scope.Account_Types,
                                   trx_type: $scope.trx_types,
                               },
                               headers: { 'Content-Type': 'application/json' },
                           })

                       })
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

                               balance: user1[i].trx_balance,
                               InterestAmount: user1[i].InterestAmounts,
                               NumberOfDays: user1[i].NumberOfDay
                           },
                           headers: { 'Content-Type': 'application/json' },

                       }).success(function (data) {
                           $scope.alertLoading = false;
                           $scope.alertData = true;
                           // alert('Data Updated On Server');
                           $http.get(linkglobal + "/trxn_views?$filter=trx_dt eq " + date3 + ' and bank_id eq ' + imageIDData + ' and status ne 7 and status ne 10 and status ne 11 and trx_data ne 3').success(function (response) {
                               var trans1 = response; var user1 = trans1.value; $scope.todayRecordTrans = user1;
                               var count = user1.length; var amt = 0; var count = user1.length;
                               for (var i = 0; i < count; i++) { amt = amt + user1[i].amt; }
                           });

                       });
                   }

               } //for loop close 


               //   $scope.allrecall();

           }
           else {
               alert('Record not found');
           }
       })
    };

    //generate xlsx file

    //New
    // $scope.exportDatatoday = function ($scope) {

    //     $http.get(linkglobal + '/account_customer_agent_transaction_View?$filter=Status eq ' + 7 + ' and Bank_Id eq ' + imageIDData + ' and Transaction_Data ne 3 ' + ' and Transaction_Date eq ' + date2 + ' or Transaction_Date eq ' + date3 + ' and Status eq ' + 7 + ' and Bank_Id eq ' + imageIDData + ' and Transaction_Data ne 3 ')
    //.success(function (res) {
    //    var agent1 = res;
    //    var user1 = agent1.value;
    //    console.log('xlxs report date = ' + user1);

    //    var count = user1.length;

    //    if (count > 0) {

    //        alasql('SELECT Customer_Name,External_Transaction_Id,Status,Transaction_Date,Amount,External_Account_Id,Agent_Name INTO XLSX("Report.xlsx",{headers:true})  FROM ?', [user1]);

    //    }
    //    else {
    //        alert('Record not found');
    //    }
    //}).error(function (data) {
    //    alert('Record not found');
    //});

    // };

    //new
    $scope.exportDatatoday = function ($scope) {
        todayTransactionTransaction = [];

        var CustomerName;
        var CustomerAccountID;
        var AccountType;
        var MobileNumber;
        var Status;
        var Date;
        var Amount;
        var AgentID;
        var AgentName;
        // $http.get(linkglobal + '/account_customer_agent_transaction_View?$filter=bank_id eq ' + imageIDData + ' and status ne 7 and status ne 10 and status ne 11 and trx_data ne 3 ' + ' and Transaction_Date eq ' + date2 + ' or Transaction_Date eq ' + date3 + ' and bank_id eq ' + imageIDData + ' and trx_data ne 3 ')
        //  $http.get(linkglobal + '/account_customer_agent_transaction_View?$filter=bank_id eq ' + imageIDData + ' and status ne 7 and status ne 10 and status ne 11 and trx_data ne 3 ' + ' and Transaction_Date eq ' + date3 + ' and bank_id eq ' + imageIDData)
        $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData + ' and status eq 2 and trx_data ne ' + 3 + ' and trx_dt eq ' + date3).success(function (res) {
            var agent1 = res;
            var user1 = agent1.value;
            console.log('xlxs report date = ' + user1);

            var count = user1.length;

            if (count > 0) {
                for (var x = 0; x < count; x++) {

                    if (user1[x].trx_type == "cr" || user1[x].trx_type == "Cr") {

                        todayTransactionTransaction.push({
                            CustomerName: user1[x].cust_name,
                            CustomerAccountID: user1[x].external_account_id,
                            AccountType: user1[x].Account_Type,
                            MobileNumber: user1[x].cust_phno_1,
                            Status: "Not Approved",
                            Date: user1[x].trx_dt,
                            Amount: user1[x].amt,
                            AgentID: user1[x].external_agent_id,
                            AgentName: user1[x].agent_name

                        })


                    }



                }
                //  alasql('SELECT Customer_Name,External_Transaction_Id,status,Transaction_Date,Amount,external_account_id,agent_name INTO XLSX("Report.xlsx",{headers:true})  FROM ?', [user1]);
                alasql('SELECT CustomerName,CustomerAccountID,AccountType,MobileNumber,Status,Date,Amount,AgentID,AgentName INTO XLSX("TodayTransactionTransactionReport.xlsx",{headers:true})  FROM ?', [todayTransactionTransaction]);

                //alasql('SELECT Customer_Name,External_Transaction_Id,status,Transaction_Date,Amount,external_account_id,agent_name INTO XLSX("Report.xlsx",{headers:true})  FROM ?', [user1]);

            }
            else {
                alert('Record not found');
            }
        }).error(function (data) {
            alert('Record not found');
        });

    };

})
