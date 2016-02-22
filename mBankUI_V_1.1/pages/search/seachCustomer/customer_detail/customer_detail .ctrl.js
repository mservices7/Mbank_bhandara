
// create the module and name it scotchApp
var scotchApp = angular.module('app.customer_details', ['ngRoute'])


scotchApp.controller('customer_detailsController', function ($rootScope, $scope, $http, $routeParams, $location, $filter, $cookieStore) {
    $scope.CheckLogin = function () {
        if ($cookieStore.get('bankIDImg') == undefined) { $location.path('/'); }

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

    $scope.exact_log = $routeParams.cust_id;

    $http.get(linkglobal + '/agents?$filter=bank_id eq ' + imageIDData)
       .success(function (response) {
           var agent = response;
           var user = agent.value;
           $scope.agents = user;
       });

    //customer update function

    $http.get(linkglobal + '/customers?$filter=cust_id eq ' + $scope.exact_log)
                 .success(function (response) {
                     var cust = response;
                     var custs = cust.value;
                     $scope.custDetail = custs;
                     $scope.external_cust_id = custs[0].external_cust_id;
                     $scope.cust_id = custs[0].cust_id;
                     $scope.cust_name = custs[0].cust_name;
                     $scope.cust_local_add = custs[0].cust_local_add;
                     $scope.cust_perm_add = custs[0].cust_perm_add;
                     $scope.cust_phno_1 = custs[0].cust_phno_1;
                     $scope.cust_phno_2 = custs[0].cust_phno_2;
                     $scope.cust_pancard_no = custs[0].cust_pancard_no;
                     $scope.cust_email_id = custs[0].cust_email_id;

                     // console.log($scope.custDetail);

                 })

    $scope.updatecustomer = function () {

        var external_cust_id = $scope.external_cust_id;
        var cust_name = $scope.cust_name;
        var cust_id = $scope.cust_id;
        var cust_local_add = $scope.cust_local_add;
        var cust_perm_add = $scope.cust_perm_add;
        var cust_phno_1 = $scope.cust_phno_1;
        var cust_phno_2 = $scope.cust_phno_2;
        var cust_pancard_no = $scope.cust_pancard_no;
        var cust_email_id = $scope.cust_email_id;

        //  alert(cust_name);
        $http.get(linkglobal + '/customers?$filter=cust_id eq ' + $scope.exact_log)
              .success(function (response) {
                  var customer = response;
                  var customerRecord = customer.value;
                  $scope.custDetail = customerRecord;
                  
                 


                  var cust_photo = customerRecord[0].cust_photo;
                  var login_id = customerRecord[0].login_id;
                  var role_id = customerRecord[0].role_id;
                  var agent_id = customerRecord[0].agent_id;
                  var status = customerRecord[0].status;
                  var is_sync = customerRecord[0].is_sync;
                  var sync_dt = customerRecord[0].sync_dt;
                  var bank_sync_dt = customerRecord[0].bank_sync_dt;
                  var bank_id = customerRecord[0].bank_id;
                  var InstallmentDays = customerRecord[0].InstallmentDays;
                  var Percentage = customerRecord[0].Percentage;

                  //     alert(cust_id);

                  var request = $http({
                      method: "put",
                      url: linkglobal + "/customers(" + cust_id + ")",
                      crossDomain: true,
                      data: {
                          external_cust_id: external_cust_id,
                          cust_name: cust_name,
                          cust_id: cust_id,
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
                          is_sync: is_sync,
                          sync_dt: sync_dt,
                          bank_sync_dt: bank_sync_dt,
                          bank_id: bank_id,
                          InstallmentDays: InstallmentDays,
                          Percentage: Percentage,
                      },
                      headers: { 'Content-Type': 'application/json' },

                  }).success(function (data) {

                      alert('Data Updated On Server');
                      $http.get(linkglobal + '/customers?$filter=cust_id eq ' + $scope.exact_log)
                 .success(function (response) {
                     var cust = response;
                     var custs = cust.value;
                     $scope.custDetail = custs;
                     $scope.external_cust_id = custs[0].external_cust_id;
                     $scope.cust_id = custs[0].cust_id;
                     $scope.cust_name = custs[0].cust_name;
                     $scope.cust_local_add = custs[0].cust_local_add;
                     $scope.cust_perm_add = custs[0].cust_perm_add;
                     $scope.cust_phno_1 = custs[0].cust_phno_1;
                     $scope.cust_phno_2 = custs[0].cust_phno_2;
                     $scope.cust_pancard_no = custs[0].cust_pancard_no;
                     $scope.cust_email_id = custs[0].cust_email_id;

                     // console.log($scope.custDetail);

                 })

                  });
              })

    }

    $scope.deletecustomer = function () {
        var cust_id = this.custID;

        $http.get(linkglobal + '/accounts?$filter=cust_id eq ' + cust_id)
                       .success(function (response) {
                           var account = response;
                           var accounts = account.value;
                           $scope.accountsDetail = accounts;
                            
                           var request = $http({
                               method: "put",
                               url: linkglobal + "/accounts(" + accounts[0].acc_id + ")",
                               data: {
                                   external_account_id:accounts[0].external_account_id,
                                   //acc_id:accounts[0].acc_id,
                                   cust_id:accounts[0].cust_id,
                                   balance:accounts[0].balance,
                                   bank_id:accounts[0].bank_id,
                                   branch_id:accounts[0].branch_id,
                                   agent_id:accounts[0].agent_id,
                                   status: accounts[0].status,
                                   is_sync:'false',
                                   Account_Type:accounts[0].Account_Type,
                                   bank_sync_dt:accounts[0].bank_sync_dt,
                                   sync_dt:accounts[0].sync_dt,
                                   trx_type:accounts[0].trx_type,
                                   InstallmentDays:accounts[0].InstallmentDays,
                                   Percentage:accounts[0].Percentage
                               },
                               headers: { 'Content-Type': 'application/json' },

                           })

                       }).success(function (data) {


                           $http.get(linkglobal + '/customers?$filter=cust_id eq ' + cust_id)
                    .success(function (response) {
                        var customer = response;
                        var customers = customer.value;
            




                        var request = $http({
                            method: "put",
                            url: linkglobal + "/customers(" + cust_id + ")",
                            crossDomain: true,
                            data: {
                                external_cust_id:customers[0].external_cust_id,
                                cust_name:customers[0].cust_name,
                                cust_id:customers[0].cust_id,
                                cust_local_add:customers[0].cust_local_add,
                                cust_perm_add:customers[0].cust_perm_add,
                                cust_phno_1:customers[0].cust_phno_1,
                                cust_phno_2:customers[0].cust_phno_2,
                                cust_photo:customers[0].cust_photo,
                                cust_pancard_no:customers[0].cust_pancard_no,
                                cust_email_id:customers[0].cust_email_id,
                                login_id:customers[0].login_id,
                                role_id:customers[0].role_id,
                                agent_id:customers[0].agent_id,
                                status:customers[0].status,
                                is_sync:'false',
                                sync_dt:customers[0].sync_dt,
                                bank_sync_dt:customers[0].bank_sync_dt,
                                bank_id:customers[0].bank_id,
                                InstallmentDays:customers[0].InstallmentDays,
                                Percentage:customers[0].Percentage,
                            },
                            headers: { 'Content-Type': 'application/json' },

                        })
                    }).success(function (data) {
                        alert('Data Deleted');
                        $location.path('/customers');
                    });
                       })

    };
});






 
