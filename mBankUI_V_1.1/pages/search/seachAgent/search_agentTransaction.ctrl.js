
// create the module and name it scotchApp
var scotchApp = angular.module('app.search_agentssTrxn', ['ngRoute'])


scotchApp.controller('search_agentssTrxnController', function ($rootScope, $scope, $http, $routeParams, $location, $filter, $cookieStore) {
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

    $scope.exact_user = $routeParams.user_id;
    var exact = $scope.exact_user;

    //customer reload button
    $scope.doParseInt = function (val) {
        if (val && val != "")
            return parseInt(val);
    };
    $http.get(linkglobal + '/products?$filter=bank_id eq ' + imageIDData).success(function (res) { var acc = res; var acc1 = acc.value; $scope.pData = acc1; });


    $http.get(linkglobal + '/agents?$filter=bank_id eq ' + imageIDData + ' and agent_id eq ' + exact)
  .success(function (response) {
      var agent = response;
      var user = agent.value;
      $scope.agentName = user[0].agent_name;

  });


    $scope.Back = function () {

        $location.path('/search_agent');

    }

    //get total transactions dashaboard
    $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData + ' and trx_data ne 3 and agent_id eq ' + exact + ' and trx_type ne %27dbt%27 and status ne 2 and status ne 17')
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

    $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData + ' and trx_data ne 3' + ' and agent_id eq ' + exact + ' and trx_type ne %27dbt%27 and status ne 2 and status ne 17')
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

      //code to calculate datewise amount
      $scope.getDateAgentTrxnCount = function () {
          $scope.showdatecount = true;
          $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData + ' and trx_data ne 3' + ' and agent_id eq ' + exact + ' and trx_type ne %27dbt%27 and status ne 2 and status ne 17')
            .success(function (response) {
                var amt1 = 0;
                var trx = response;
                var transaction = trx.value;
                $scope.transactions = transaction;
                var count = transaction.length;
                for (var i = 0; i < count; i++) {
                    amt1 = amt1 + transaction[i].amt;
                }
                $scope.amount12 = amt1;
                //console.log('dashboard transaction amt =' + amt1);

            });

      }


      //code for refresh

      $scope.refresh = function () {
          $scope.transactions = null;

          $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData + ' and trx_data ne 3' + ' and agent_id eq ' + exact + ' and trx_type ne %27dbt%27 and status ne 2 and status ne 17')
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
          $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData + ' and trx_data ne 3' + ' and agent_id eq ' + exact + ' and trx_type ne %27dbt%27 and status ne 2 and status ne 17')
   .success(function (res) {
       var agent1 = res;
       var user1 = agent1.value;
       $scope.transactions = user1;
       var transactioD = JSON.stringify($scope.transactions);
       var del = JSON.parse(transactioD);
       var count = user1.length;
   })
      }



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
          $scope.trxtypeT = this.trxtypeT;;
          $scope.accountidT = this.accountidT;
          $scope.money = this.amtT;

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

                      alert('Status Approved and Deposite in Account');
                      // $scope.trans3 = null;
                      $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData + ' and trx_data ne 3' + ' and agent_id eq ' + exact)
                      .success(function (res) {
                          var agent1 = res;
                          var user1 = agent1.value;
                          $scope.transactions = user1;
                      })
                  }).error(function (err) {
                      alert('Status Alerady Approved')
                  });
              }

          }
      }

      $scope.getfd = function () {
          //alert(this.id);
          $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData + ' and trx_data ne 3' + ' and agent_id eq ' + exact + ' and trx_data eq ' + this.id)
 .success(function (res) {
     var agent1 = res;
     var user1 = agent1.value;
     $scope.transactions = user1;
     var transactioD = JSON.stringify($scope.transactions);
     var del = JSON.parse(transactioD);
     var count = user1.length;


 })
      }

      $scope.allapproved = function () {

          $scope.alertLoading = true;
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
                  var status = 7;
                  var is_sync = user1[i].is_sync;
                  var sync_dt = user1[i].sync_dt;
                  var bank_sync_dt = user1[i].bank_sync_dt;
                  var status1 = user1[i].status;

                  if (status1 == 10 || status1 == 7) {
                      $scope.alertData = true;
                      $scope.alertLoading = false;
                      // alert('Status can not Approve.Status is Bank Sync.')

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

                          },
                          headers: { 'Content-Type': 'application/json' },

                      }).success(function (data) {

                          $scope.transactions = null;
                          $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData + ' and trx_data ne 3' + ' and agent_id eq ' + exact)
                            .success(function (res) {
                                var agent1 = res;
                                var user1 = agent1.value;
                                $scope.transactions = user1;
                            })

                          $scope.alertLoading = false;
                          $scope.alertData = true;
                          // alert('Data Updated On Server');
                      });
                  }

              } //for loop close 

              //  $scope.transactions = null;
              // $scope.trans3 = null;
              //   $scope.recall();
              //   $scope.allrecall();

          }
          else {
              alert('Record not found');
          }

      };

      //generate xlsx file
      $scope.exportData = function ($scope) {


          //   $http.get(linkglobal + '/trxn_views?$filter=status eq ' + 7 + ' or status eq ' + 10 + ' and agent_id eq ' + exact + ' and trx_type ne %27dbt%27 and status ne 2 and status ne 17')
          $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData + ' and trx_data ne 3' + ' and agent_id eq ' + exact + ' and trx_type ne %27dbt%27 and status ne 2 and status ne 17')
.success(function (res) {
    var agent1 = res;
    var user1 = agent1.value;

    console.log('xlxs report data= ' + user1);

    var count = user1.length;
    // alert(count);
    if (count > 0) {

        alasql('SELECT agent_id,cust_name,external_trx_id,status,trx_dt,amt,external_account_id,agent_name INTO XLSX("Report.xlsx",{headers:true})  FROM ?', [user1]);

    }
    else {
        alert('Record not found');
    }
}).error(function (data) {
    alert('Record not found');
});

      };

  });



})
