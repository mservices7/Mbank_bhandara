
// create the module and name it scotchApp
var scotchApp = angular.module('app.approveCustomer', ['ngRoute'])


scotchApp.controller('approveCustomerController', function ($rootScope, $scope, $http, $routeParams, $location, $filter, $cookieStore) {
    $scope.CheckLogin = function () {if ($cookieStore.get('bankIDImg') == undefined) { $location.path('/'); }

    }

    var roughtDetails = $cookieStore.get('user');
    var imageIDData = $cookieStore.get('bankIDImg');
    $scope.imgIdDdURL = imageIDData;


    var linkglobal = $cookieStore.get('urlBanks');  //Bank Bhandara

    //Today Date
    $scope.Date1 = $filter('date')(new Date(), 'dd-MM-yyyy');
    var date2 = "'" + $scope.Date1 + "'";
    var upDate = $scope.Date1;
    //Route Data
    $scope.exact_user = $routeParams.user_id;
    var exact = $scope.exact_user;


    $http.get(linkglobal + '/products?$filter=bank_id eq ' + imageIDData)//linkglobal + '/products')
           .success(function (res) { var acc = res; var acc1 = acc.value; $scope.accounts = acc1; });

    //Get Exact Customer Reuested Data 

    $http.get(linkglobal + '/customers?$filter=cust_id eq ' + exact + ' and bank_id eq ' + imageIDData).success(function (response) {
        var cust1 = response;
        var cust2 = cust1.value;
        $scope.reqCustEmail = cust2[0].cust_email_id;
        $scope.reqCustName = cust2[0].cust_name;
        $scope.reqCustAgentId = cust2[0].agent_id;
        $scope.reqCustMobNumber = cust2[0].cust_phno_1;
        $scope.reqCustReqDate = cust2[0].sync_dt;
        $scope.reqCustPanNo = cust2[0].cust_pancard_no;
        $scope.reqCustAdd = cust2[0].cust_local_add;

        $http.get(linkglobal + '/agents?$filter=agent_id eq ' + $scope.reqCustAgentId)
         .success(function (response) {
             var cust1 = response;
             var cust2 = cust1.value;
             $scope.reqCustAgent = cust2[0].agent_name;



         });
    });



    $http.get(linkglobal + '/accounts?$filter=cust_id eq ' + exact + ' and bank_id eq ' + imageIDData).success(function (response) {
        var cust1 = response;
        var cust2 = cust1.value;
        $scope.reqCustAcc = cust2[0].acc_id;
        $scope.reqCustAccType = cust2[0].Account_Type;
    });


    //Approved Customers And Create Customer
    $scope.approvedCustomer = function () {

        $http.get(linkglobal + '/customers?$filter=cust_id eq ' + exact).success(function (response) {
            var cust1 = response;
            var cust2 = cust1.value;
            var reqCustEmail = cust2[0].cust_email_id;
            var reqCustName = cust2[0].cust_name;
            var reqCustAgentId = cust2[0].agent_id;
            var reqCustMobNumber = cust2[0].cust_phno_1;
            var reqCustReqDate = cust2[0].sync_dt;
            var reqCustPanNo = cust2[0].cust_pancard_no;
            var reqCustAdd = cust2[0].cust_local_add;

            var external_cust_id = cust2[0].external_cust_id;
            var cust_id = cust2[0].cust_id;
            var bank_id = cust2[0].bank_id;



            var request = $http({
                method: "put",
                url: linkglobal + "/customers(" + exact + ")",
                crossDomain: true,
                data: {

                    external_cust_id: external_cust_id,
                    cust_id: cust_id,
                    cust_name: reqCustName,
                    cust_local_add: reqCustAdd,
                    cust_phno_1: reqCustMobNumber,
                    cust_pancard_no: reqCustPanNo,
                    cust_email_id: reqCustEmail,
                    agent_id: reqCustAgentId,
                    bank_id: bank_id,
                    status: 1,
                    bank_sync_dt: cust2[0].bank_sync_dt,
                    sync_dt: reqCustReqDate,
                    is_sync:true

                },
                headers: { 'Content-Type': 'application/json' },

            }).success(function (data) {              

                    $http.get(linkglobal + "/accounts?$filter=cust_id eq " + exact).success(function (response) {
                        var cust1 = response;
                        var cust2 = cust1.value;
                        external_account_id = cust2[0].external_account_id;
                        var acc_id = cust2[0].acc_id;
                        var cust_id = cust2[0].cust_id;
                        var balance = cust2[0].balance;
                        var bank_id = cust2[0].bank_id;
                        var branch_id = cust2[0].branch_id;
                        var agent_id = cust2[0].agent_id;
                        var is_sync = cust2[0].is_sync;
                        var sync_dt = cust2[0].sync_dt;
                        var bank_sync_dt = cust2[0].bank_sync_dt;
                        var Account_Type = cust2[0].Account_Type;

                        
                        var request = $http({
                            method: "put",
                            url: linkglobal + "/accounts(" + acc_id + ")",
                            crossDomain: true,
                            data: {
                                external_account_id: external_account_id,
                                acc_id: acc_id,
                                cust_id: cust_id,
                                balance: balance,
                                bank_id: bank_id,
                                branch_id: branch_id,
                                agent_id: agent_id,
                                status: 1,
                                sync_dt: sync_dt,
                                bank_sync_dt: bank_sync_dt,
                                Account_Type: Account_Type,
                                trx_type: cust2[0].trx_type,
                                InstallmentDays: cust2[0].InstallmentDays,
                                Percentage: cust2[0].Percentage,
                                is_sync: true
                            },
                            headers: { 'Content-Type': 'application/json' },
                        }).success(function (data) {


                        }).error(function (err) {
                            alert('Account Not Updated/Not Found')
                        });

                    });


                   
                    alert('Customer Approved And Created Successfully');
                //Get Requested Customer 
                    $http.get(linkglobal + '/customers?$filter=bank_id eq ' + imageIDData).success(function (response) { var cust1 = response; var cust2 = cust1.value; $scope.reqcustomers = cust2; })
                    $location.path('/req_cust'); 

            }).error(function (err) {
                alert('Customer Not Found/ Internet Not Available')
            });
        });
    }
})
