
// create the module and name it scotchApp
var scotchApp = angular.module('app.custAccDetailsController', ['ngRoute'])


scotchApp.controller('custAccDetailsController', function ($rootScope, $scope, $http, $routeParams, $location, $filter, $cookieStore) {
    $scope.CheckLogin = function () {if ($cookieStore.get('bankIDImg') == undefined) { $location.path('/'); }
 
    }

    

    $scope.getDetails;

    var roughtDetails = $cookieStore.get('user');
    var imageIDData = $cookieStore.get('bankIDImg');
    $scope.imgIdDdURL = imageIDData;


    var linkglobal = $cookieStore.get('urlBanks');  //Bank Bhandara

    //Today Date
    $scope.Date1 = $filter('date')(new Date(), 'dd-MM-yyyy');
    var date2 = "'" + $scope.Date1 + "'";
    //Route Data
    $scope.exact_user = $routeParams.user_id;
    var exact = $scope.exact_user;

    //customer reload button
    $scope.doParseInt = function (val) {
        if (val && val != "")
            return parseInt(val);
    };
    $scope.arr = [];
    var trxData;
    $http.get(linkglobal + '/customers?$filter=cust_id eq ' + exact).success(function (response) {
        var cust1 = response; var cust2 = cust1.value; $scope.customer = cust2; var count = cust2.length;
        

    });
    $http.get(linkglobal + '/accounts?$filter=cust_id eq ' + exact).success(function (response) {
        var cust1 = response; var cust2 = cust1.value; $scope.customers = cust2; var count = cust2.length;
        var gettrxDetails = cust2[0].trx_type;
        $http.get(linkglobal + '/trxn_views?$filter=cust_id eq ' + exact + ' and trx_data eq ' + gettrxDetails ).success(function (response) {
            var customer1 = response;
            var customer2 = customer1.value;
            $scope.datadetails = customer2;
            var count = customer2.length;
         
            $scope.gettrxDetails = customer2[0].trx_data;
            $scope.getDetails = customer2[0].trx_data;

        });
    });


     $scope.rowClass = function(item, index){
         if(index == 0){
             return item.active;
         }
        return '';
     };
     $scope.divshow = true;

     $scope.showMain = function () {
        
         $http.get(linkglobal + '/trxn_views?$filter=cust_id eq ' + exact + ' and trx_data eq ' + $scope.gettrxDetails + ' and status eq 7 or status eq 10 or status eq 11').success(function (response) {
             var customer1 = response;
             var customer2 = customer1.value;
             $scope.datadetails = customer2;
             var count = customer2.length;

         });
     }

     $scope.collectB = function () {
         //$scope.divbank = true;
         //$scope.divshow = false;

         $http.get(linkglobal + '/trxn_views?$filter=cust_id eq ' + exact + ' and status eq ' + 11 + ' and trx_data eq ' + $scope.gettrxDetails).success(function (response) {
             var customer1 = response;
             var customer2 = customer1.value;
             $scope.datadetails = customer2;
             var count = customer2.length;
           
         });

     }

     $scope.collectA = function () {
         //$scope.divbank = true;
         //$scope.divshow = false;
         $http.get(linkglobal + '/trxn_views?$filter=cust_id eq ' + exact + ' and status eq 7 or status eq 10' + ' and trx_data eq ' + $scope.gettrxDetails).success(function (response) {
             var customer1 = response;
             var customer2 = customer1.value;
             $scope.datadetails = customer2;
             var count = customer2.length;
            
         });
     }

    //code for refresh
     $scope.refresh = function () {
         $scope.datadetails = null;
         $http.get(linkglobal + '/accounts?$filter=cust_id eq ' + exact).success(function (response) {
             var cust1 = response; var cust2 = cust1.value; $scope.customers = cust2; var count = cust2.length;
             var gettrxDetails = cust2[0].trx_type;
             $http.get(linkglobal + '/trxn_views?$filter=cust_id eq ' + exact + ' and trx_data eq ' + gettrxDetails).success(function (response) {
                 var customer1 = response;
                 var customer2 = customer1.value;
                 $scope.datadetails = customer2;
                 var count = customer2.length;
                 $scope.gettrxDetails = customer2[0].trx_data;
             });
         });
     }

    //generate xlsx file
     $scope.exportData = function () {

        // $http.get(linkglobal + '/trxn_views?$filter=trx_data eq ' + $scope.getDetails + ' and cust_id eq ' + exact + ' and status eq ' + 7 + 'or status eq ' + 10 + ' and trx_data eq ' + $scope.getDetails + ' and cust_id eq ' + exact).success(function (response) {
         $http.get(linkglobal + '/account_customer_agent_transaction_View?$filter=Transaction_Data eq ' + $scope.getDetails + ' and Customer_Id eq ' + exact + ' and Status eq ' + 7 + 'or Status eq ' + 10 ).success(function (response) {

         var trxn1 = response;
             var trxn2 = trxn1.value;
          
        var count = trxn2.length;
       
        if (count > 0) {

            alasql('SELECT Customer_Name,Account_Type,External_Transaction_Id,Status,Transaction_Date,Amount,External_Account_Id,Agent_NameINTO XLSX("Report.xlsx",{headers:true})  FROM ?', [trxn2]);

        }
        else {
            alert('Record not found!');
        }
    }).error(function (data) {
        alert('Record not found');
    });

     };


     $scope.StatusApprove = function () {
       
         var TrxId = this.trxid;
         var trid = "'" + TrxId + "'"
         var accId=this.accID;
         var balnc=this.DailyInAmt;

   
         var status = parseInt(this.status);
         $http.get(linkglobal + '/trx_details?$filter=Id eq ' + TrxId).success(function (response) {
            
             var transaction1 = response;
             var transaction2 = transaction1.value;
             
          //   $scope.trxdetails = transaction2; 
             var Id = transaction2[0].Id;
             var external_trx_id = transaction2[0].external_trx_id;
             var trx_id = transaction2[0].trx_id;
             var bank_id = transaction2[0].bank_id;
             var brach_id = transaction2[0].brach_id;
             var cust_id = transaction2[0].cust_id;
             var acc_id=transaction2[0].acc_id;
             var agent_id=transaction2[0].agent_id;
             var amt=transaction2[0].amt;
             var trx_dt=transaction2[0].trx_dt;
             var trx_type=transaction2[0].trx_type;
             
             var is_sync=transaction2[0].is_sync;
             var sync_dt=transaction2[0].sync_dt;
             var bank_sync_dt=transaction2[0].bank_sync_dt;
             var balance=transaction2[0].balance;
             var InterestAmount=transaction2[0].InterestAmount;
             var NumberOfDays=transaction2[0].NumberOfDays;
             
             var request = $http({
                 method: "put",
                 url: linkglobal + "/trx_details(" + Id + ")",
                 crossDomain: true,
                 data: {
                     external_trx_id: external_trx_id,
                     trx_id: trx_id,
                     bank_id: bank_id,
                     brach_id: brach_id,
                     cust_id: cust_id,
                     acc_id: acc_id,
                     agent_id: agent_id,
                     amt: amt,
                     trx_dt:trx_dt,
                     trx_type:trx_type,
                     status: status,
                     is_sync:is_sync,
                     sync_dt:sync_dt,
                     bank_sync_dt:bank_sync_dt,
                     balance:balance,
                     InterestAmount:InterestAmount,
                     NumberOfDays: NumberOfDays
                 },
                 headers: { 'Content-Type': 'application/json' },

             }).success(function (data) {

                 alert("Approved");
                 $http.get(linkglobal + '/accounts?$filter=cust_id eq ' + exact + ' and acc_id eq ' + accId).success(function (response) {
                     var cust1 = response; var cust2 = cust1.value; $scope.customers = cust2; var count = cust2.length;
                     var gettrxDetails = cust2[0].trx_type;

                     var external_account_id = cust2[0].external_account_id;
                     var acc_id = cust2[0].acc_id;
                     var cust_id = cust2[0].cust_id;
                     var balance = cust2[0].balance;
                     var bank_id=cust2[0].bank_id;
                     var branch_id=cust2[0].branch_id;
                     var agent_id=cust2[0].agent_id;
                     var status=cust2[0].status;
                     var is_sync=cust2[0].is_sync;
                     var sync_dt=cust2[0].sync_dt;
                     var bank_sync_dt=cust2[0].bank_sync_dt;
                     var Account_Type=cust2[0].Account_Type;
                     var trx_type=cust2[0].trx_type;
                     var InstallmentDays=cust2[0].InstallmentDays;
                     var Percentage = cust2[0].Percentage;


                     var resultBalance = balance - balnc;
                     var request = $http({
                         method: "put",
                         url: linkglobal + "/accounts(" + acc_id + ")",
                         crossDomain: true,
                         data: {
                             external_account_id: external_account_id,
                             acc_id: acc_id,
                             cust_id: cust_id,
                             balance: resultBalance,
                             bank_id: bank_id,
                             branch_id: branch_id,
                             agent_id: agent_id,
                             status: status,
                             is_sync: is_sync,
                             sync_dt: sync_dt,
                             status: status,
                             is_sync:is_sync,
                             sync_dt:sync_dt,
                             bank_sync_dt: bank_sync_dt,
                             Account_Type: Account_Type,
                             trx_type: trx_type,
                             InstallmentDays: InstallmentDays,
                             Percentage: Percentage,

                         },
                         headers: { 'Content-Type': 'application/json' },

                     }).success(function (data) {
                     })

                     $http.get(linkglobal + '/trxn_views?$filter=cust_id eq ' + exact + ' and trx_data eq ' + gettrxDetails).success(function (response) {
                         var customer1 = response;
                         var customer2 = customer1.value;
                         $scope.datadetails = customer2;
                         var count = customer2.length;
                         
                         $scope.gettrxDetails = customer2[0].trx_data;
                         $scope.getDetails = customer2[0].trx_data;

                     });
                     $http.get(linkglobal + '/accounts?$filter=cust_id eq ' + exact).success(function (response) {
                         var cust1 = response; var cust2 = cust1.value; $scope.customers = cust2; var count = cust2.length;
                         var gettrxDetails = cust2[0].trx_type;
                     })
                 });


             }).error(function (err) {
                 alert('Status Can not Approved');
             });
          
         });
     }

     $scope.latestId = function () {
       
         var id = this.idfound;
         $http.get(linkglobal + "/accounts" + "?$filter=acc_id eq " + this.idfound).then(function (res) {
             var role = res.data;
             var users = role.value;
             var balance = users[0].balance;
             $scope.external_account_ids = users[0].external_account_id;
             $scope.IdFounds = users[0].agent_id;
             $scope.getbalnces =  balance;
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
           

             

             })
         $http.get(linkglobal + '/trx_details' + '?$orderby=trx_id desc').then(function (res) {

             var getData1 = res.data;
             var getData = getData1.value;

             var id = getData[0].trx_id;
             var id1 = id.replace(/-|0/g, '');
             $scope.obtainValue = id1;
             // console.log($scope.obtainValue)
         })

     }

    $scope.showTrns = function () {
        $scope.getDetails = this.trxId;
      
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

    }

    $scope.cr = function () {
        $scope.moneyDbt1 = 2;
        $scope.moneyDbt = 'cr';
        $scope.dbttype = 'Credit in';

    }

    $scope.limit = 30;

    $scope.limitTo=function(){
        $scope.limit = $scope.limit + 30;
    }


    $scope.deposite = function () {
        var id = this.id;
        var getMonetType1 = $scope.moneyDbt1;
        var getMonetType = $scope.moneyDbt;
        var money = this.money;
        var type = this.type;
        var getbalnce = $scope.getbalnces;
        var dbttype= $scope.dbttype;

        
        var ModifiedDate = Math.round(Math.random() * (+new Date)).toString();

        var DateForToday = $filter('date')(new Date(), 'dd-MM-yyyy');
        var DateForToday1 = $filter('date')(new Date(), 'dd-MM-yyyy hh:mm:ss');
        var getTrxId1 = $scope.obtainValue;
        var getTrxId = ModifiedDate;

    

        var agentId =  $scope.IdFounds + '-' + ModifiedDate;

        if (type==3) {
            var balance = getbalnce - money;

        } else {
            var balance = getbalnce + money;

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

               
                $http.get(linkglobal + '/trxn_views?$filter=cust_id eq ' + exact + ' and trx_data eq ' + type + ' and status eq 7 or status eq 10 or status eq 11').success(function (response) {
                    var cust1 = response; var cust2 = cust1.value; $scope.datadetails = cust2; var count = cust2.length;


                });

                $http.get(linkglobal + '/CustomerAccounts?$filter=cust_id eq ' + exact+ ' and trx_data eq ' + type).success(function (response) {
                    var cust1 = response; var cust2 = cust1.value; $scope.customers = cust2; var count = cust2.length;
                    $scope.customerName = cust2[0].cust_name;
                    $scope.openDt = cust2[0].bank_sync_dt;


                });

                 alert('Rs. ' + money + ' ' + dbttype + ' Account');
            })

          

         

        this.money = null;
        $scope.moneyDbt = '';
        $scope.dbttype = '';
    }


})
