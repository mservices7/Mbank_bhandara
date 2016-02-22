
// create the module and name it scotchApp
var scotchApp = angular.module('app.create_account', ['ngRoute'])


scotchApp.controller('create_accountController', function ($rootScope, $scope, $http, $routeParams, $location, $filter, $cookieStore) {
    $scope.CheckLogin = function () {if ($cookieStore.get('bankIDImg') == undefined) { $location.path('/'); }
 
    }

    
    var roughtDetails = $cookieStore.get('user');
    var imageIDData = $cookieStore.get('bankIDImg');
    $scope.imgIdDdURL = imageIDData;


    var linkglobal = $cookieStore.get('urlBanks');  //Bank Bhandara


    $scope.datechange = function () {
     
        var Openigdt = $filter('date')(this.openingDate, 'yyyy-MM-dd');
     

        var d = new Date();
        var toAdd = 100;
        d.setDate(d.getDate() + parseInt(toAdd));
        var Openigdt = $filter('date')(d, 'yyyy-MM-dd');

       
        $scope.dueDate =  $filter('date')(d, 'dd-MM-yyyy');
       
       
    }


    // code for create account page

    // get Customer id
    $http.get(linkglobal+'/customers?$filter=bank_id eq ' + imageIDData)
    .success(function (res) {

        var Customers = res;
        var customer = Customers.value;
        $scope.customers = customer;
    })


    // get bank id
    $http.get(linkglobal + '/banks?$filter=bank_id eq ' + imageIDData)
  .success(function (res) {

      var Banks = res;
      var bank = Banks.value;
      $scope.banks = bank;
  })

    // get branch id
    $http.get(linkglobal + '/branches?$filter=bank_id eq ' + imageIDData)
  .success(function (res) {

      var Branches = res;
      var branch = Branches.value;
      $scope.branches = branch;
  })

    // get Agent id
    $http.get(linkglobal + '/agents?$filter=bank_id eq ' + imageIDData)
  .success(function (res) {

      var Agents = res;
      var agent = Agents.value;
      $scope.agents = agent;
  })

    // get account type
    $http.get(linkglobal + '/products?$filter=bank_id eq ' + imageIDData)
  .success(function (res) {

      var Product = res;
      var product = Product.value;
      $scope.products = product;
  })


    $scope.agentfound=function(){
        // increase external account id        
        $http.get(linkglobal + '/accounts?$filter=cust_id eq ' + this.accountData)
        .success(function (res) {
            var Accounts = res;
            var account = Accounts.value;
            $scope.foundAccounts = account[0].trx_type; 
        })
    }

    $scope.accfound = function () {
        // increase external account id  
        
        var accFount = $scope.accountType;
        if (accFount == 1) {
            accType = 'FD';
            $scope.DaysPanel = false;
            $scope.InterestPanel = false;
            $scope.openingDate = false;
            $scope.DueDate = false;
            this.noOfDays = "";
            this.interest = "";

        } else if (accFount == 2) {
            accType = 'RD.';
            $scope.DaysPanel = false;
            $scope.InterestPanel = false;
            $scope.openingDate = false;
            $scope.DueDate = false;
            this.noOfDays = "";
            this.interest = "";
        } else if (accFount == 3) {
            accType = 'LOAN';
            $scope.DaysPanel = true;
            $scope.InterestPanel = true;
            $scope.openingDate = true;
            $scope.DueDate = true;

        } else if (accFount == 4) {
            accType = 'SAVING';
            $scope.DaysPanel = false;
            $scope.InterestPanel = false;
            $scope.openingDate = false;
            $scope.DueDate = false;
            this.noOfDays = "";
            this.interest = "";
        } else if (accFount == 5) {
            accType = 'DRD';
            $scope.DaysPanel = false;
            $scope.InterestPanel = false;
            $scope.openingDate = false;
            $scope.DueDate = false;
            this.noOfDays = "";
            this.interest = "";
        }


        $http.get(linkglobal + '/accounts?$filter=cust_id eq ' + this.accountData)
        .success(function (res) {
            var Accounts = res;
            var account = Accounts.value;

            var count = account.length;
            

            for (var i = 0; i <= count; i++) {
             
                if (account[i].trx_type == accFount) {
                 
                    $scope.accountType = "";
                    alert(account[i].Account_Type + ' Account Already Created For This Customer');
                }

            }
                 
        })
    }


    // increase external account id
    $http.get(linkglobal + '/accounts?$filter=bank_id eq ' + imageIDData)
        .success(function (res) {

            var Accounts = res;
            var account = Accounts.value;
            var accounts = account;
            var count = accounts.length;

            //console.log("accounts=" + accounts);
            var externalAccId;

            for (var i = 0; i < count; i++) {

                externalAccId = accounts[i].acc_id;
            }

            $scope.exAccountId = parseInt(externalAccId) + 1;
            
        })




    $scope.createaccount = function () {
        $scope.product_id;

        var ModifiedDate = Math.round(Math.random() * (+new Date)).toString();

        // var acc_id = this.accountId;
        var cust_id =parseInt(this.accCustomerId);
        var balance = this.accountBalane;
        //var bank_id = this.accountBankId;
        var branch_id =parseInt(this.accountBranchId);
        var agent_id =parseInt( this.accountAgentId);
        // var status = this.accountStatus;
        var Account_Id =parseInt(this.accountType);
        var noDays = parseInt(this.noOfDays);
        var interest = parseInt(this.interest);
        var sync_dt = String($filter('date')(this.openingDate, 'yyyy-MM-ddTHH:mm:ss'));
        var today_dt = String($filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ss'));
        var accType;

       
        if (this.noOfDays == null || this.interest == null || this.interest > 20) {
            alert('Please Select/Fill All Field');
            if (this.interest > 20) {
                alert('Enter interest min 20');
                return;
            }
            return;
        }


        if (this.accCustomerId == null || this.accountBranchId == null || this.accountAgentId == null || this.accountBalane==null) {
            alert('Please Select/Fill All Field');
        } else {

            $http.get(linkglobal + '/products?$filter=Id eq ' + this.accountType)
        .success(function (res) {
            var Accounts = res;
            var accType = Accounts.value;
            accType = accType[0].pType;
        
       
            var external_account_id = String(accType + "/" + ModifiedDate);
            if (this.accountType == 3)
            {
                var request = $http({
                    method: "post",
                    url: linkglobal+"/accounts",
                    crossDomain: true,
                    data: {
                        external_account_id: external_account_id,
                        //acc_id: acc_id,
                        cust_id: cust_id,
                        balance: balance,
                        bank_id: imageIDData,
                        branch_id: branch_id,
                        agent_id: agent_id,
                        status: 1,
                        Account_Type: accType,
                        bank_sync_dt: sync_dt,
                        is_sync:true,
                        sync_dt: sync_dt,
                        trx_type: Account_Id,
                        InstallmentDays: noDays,
                        Percentage: interest
                    },
                    headers: { 'Content-Type': 'application/json' },
                }).success(function (data) {

          
                    alert('Account Created');



                }).error(function (err) {

                    alert('Internet Not Available,Please Try Again');

                });
            }
            else {
                var request = $http({
                    method: "post",
                    url: linkglobal + "/accounts",
                    crossDomain: true,
                    data: {
                        external_account_id: external_account_id,
                        //acc_id: acc_id,
                        cust_id: cust_id,
                        balance: balance,
                        bank_id: imageIDData,
                        branch_id: branch_id,
                        agent_id: agent_id,
                        status: 1,
                        Account_Type: accType,
                        bank_sync_dt: today_dt,
                        sync_dt: today_dt,
                        is_sync: true,
                        trx_type: Account_Id,
                        InstallmentDays: noDays,
                        Percentage: interest
                    },
                    headers: { 'Content-Type': 'application/json' },
                }).success(function (data) {


                    alert('Account Created');



                }).error(function (err) {

                    alert('Internet Not Available,Please Try Again');

                });
            }

           
        });
            this.exAccountId = '';
            $scope.openingDate = null;
            $scope.dueDate = null;
            this.accCustomerId = '';
            this.accountBalane = null;
            this.accountBankId = '';
            this.accountBranchId = '';
            this.accountAgentId = '';
            this.accountType = null;
            this.noOfDays = '';
            this.interest = '';

            $scope.DaysPanel = false;
            $scope.InterestPanel = false;
    }

   
    }


    $scope.clearData = function () {
        $scope.DueDate = false;
        $scope.accountBalane = "";
        $scope.openingDate =null;
        $scope.dueDate = null;
        $scope.accCustomerId = "";

        $scope.accountBankId = "";
        $scope.accountBranchId = "";
        $scope.accountAgentId = "";
        $scope.accountType = "";
        this.noOfDays = "";
        this.interest = "";
        $scope.DaysPanel = false;
        $scope.InterestPanel = false;

    }
})
