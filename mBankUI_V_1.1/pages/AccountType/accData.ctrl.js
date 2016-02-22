
// create the module and name it scotchApp
var scotchApp = angular.module('app.accData', ['ngRoute'])


scotchApp.controller('accDataController', function ($rootScope, $scope, $http, $routeParams, $location, $filter, $cookieStore) {
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

    //Get Data
    $http.get(linkglobal + '/products?$filter=bank_id eq ' + imageIDData)
        .success(function (res) {
            var acc = res;
            var acc1 = acc.value;
            $scope.pData = acc1;
        });



    $scope.limit = 30;

    $scope.limitTo = function () {
        $scope.limit = $scope.limit + 30;
    }
    

    //code for refresh
    $scope.refresh = function () {
       

       $scope.transDetailsAccTypes = null;

        //Get Data
       $http.get(linkglobal + '/products?$filter=bank_id eq ' + imageIDData ).success(function (res) { var acc = res; var acc1 = acc.value; $scope.pData = acc1; });

        $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData + ' and trx_data ne 3')
                            .success(function (response) {
                                var trans1 = response; var user1 = trans1.value; $scope.transDetailsAccTypes = user1;
                            });




        $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData + ' and trx_data eq ' + $scope.trxData).success(function (response) {
            var trans1 = response; var user1 = trans1.value;
            $scope.transDetailsAccTypes = user1;
        })

     

    }

    $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData)
                            .success(function (response) {
                                var trans1 = response; var user1 = trans1.value; $scope.transDetailsAccTypes = user1;
                            });




    $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData + ' and trx_data eq ' + $scope.trxData).
        success(function (response) {
        var trans1 = response; var user1 = trans1.value;
              $scope.transDetailsAccTypes = user1;

              var count = user1.length;

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
                  $scope.trxtypeT = this.trxtypeT;;
                  $scope.accountidT = this.accountidT;
                  $scope.money = this.amtT;

                  var balance = this.balance;
                  var interestAmount = this.interestAmount;
                  var noOfDays = this.days;

                  if (status == 7 || status == 10) {
                      alert('Status can not Approve. Status is Already Sync to Bank.');
                  }
                  else {
                      if (status != 7 || status != 10) {
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

                                  balance: balance,
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

                              $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData)
                             .success(function (response) { var trans1 = response; var user1 = trans1.value; $scope.transDetailsAccTypes = user1;
                          });


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
                          var status = String(10);
                          var is_sync = user1[i].is_sync;
                          var sync_dt = user1[i].sync_dt;
                          var bank_sync_dt = user1[i].bank_sync_dt;
                          var status1 = user1[i].status;
                          
                          if (status1 == 7 || status1 == 10) {
                              $scope.alertData = true;
                              $scope.alertLoading = false;

                            //  alert('Status Already Approve OR Approved Remaining transaction Manually!')

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
                                      NumberOfDays: user1[i].NumberOfDay,

                                  },
                                  headers: { 'Content-Type': 'application/json' },

                              }).success(function (data) {
                                  $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData + ' and trx_data ne 3')
                                 .success(function (response) {
                                     var trans1 = response;
                                     var user1 = trans1.value;
                                     $scope.transDetailsAccTypes = user1;
                                 })

                                  $scope.alertLoading = false;
                                  $scope.alertData = true;
                              });

                          }
                      } //for loop close 





                  }
                  else {
                      alert('Record not found');
                  }

                 
               

              };


    })

   
   //generate xlsx file
    $scope.exportData = function ($scope) {

        $http.get(linkglobal + '/account_customer_agent_transaction_View?$filter=Status eq ' + 7 + ' and Bank_Id eq ' + imageIDData + ' and Transaction_Data ne 3')
   .success(function (res) {

       var agent1 = res;
       var user1 = agent1.value;
       var count = user1.length;

       if (count > 0) {

           alasql('SELECT Customer_Name,External_Transaction_Id,Status,Transaction_Date,Amount,External_Account_Id,Agent_Name INTO XLSX("Report.xlsx",{headers:true})  FROM ?', [user1]);

       }
       else {
           alert('Record not found');
       }
   }).error(function (data) {
       alert('Record not found');
   });

    };


    
})
