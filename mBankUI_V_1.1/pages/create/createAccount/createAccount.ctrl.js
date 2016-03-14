
// create the module and name it scotchApp
var scotchApp = angular.module('app.create_account', ['ngRoute'])


scotchApp.controller('create_accountController', function ($rootScope, $scope, $http, $routeParams, $location, $filter, $cookieStore) {
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

    $scope.datechange = function () {

        var Openigdt = this.openingDate;
        // alert('Openigdt' + Openigdt);
        var lastDayOfMonth = new Date(Openigdt.getFullYear(), Openigdt.getMonth(), Openigdt.getDate() + 93, 0);

        // var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate() + diffDays, 0);

        //var d = new Date();
        //var toAdd = 100;
        //d.setDate(d.getDate() + parseInt(toAdd));
        //var Openigdt = $filter('date')(d, 'yyyy-MM-dd');


        $scope.dueDate = $filter('date')(lastDayOfMonth, 'dd-MM-yyyy');

        // alert($scope.dueDate);
    }


    // code for create account page

    // get Customer id
    $http.get(linkglobal + '/customers?$filter=bank_id eq ' + imageIDData)
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


    $scope.agentfound = function () {
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
        // alert(accFount);


        if (accFount == 1) {
            accType = 'DRD';
            $scope.DaysPanel = false;
            $scope.InterestPanel = false;
            $scope.openingDate = false;
            $scope.DueDate = false;
            $scope.AgentIDPanel = true;
            this.noOfDays = "";
            this.interest = "";
            $scope.dueDate = "";
            // alert('DRD');

        }
        else if (accFount == 2) {
            accType = 'RD.';
            $scope.DaysPanel = false;
            $scope.InterestPanel = false;
            $scope.openingDate = false;
            $scope.DueDate = false;
            $scope.AgentIDPanel = true;
            this.noOfDays = "";
            this.interest = "";
            $scope.dueDate = "";

            //alert('RD');

        } else if (accFount == 3) {
            accType = 'LOAN';
            $scope.DaysPanel = true;
            $scope.InterestPanel = true;
            $scope.openingDate = true;
            $scope.DueDate = true;
            $scope.AgentIDPanel = false;
            $scope.dueDate = "";

            //alert('LOAN');

        } else if (accFount == 4) {
            accType = 'SAVING';
            $scope.DaysPanel = false;
            $scope.InterestPanel = false;
            $scope.openingDate = false;
            $scope.DueDate = false;
            $scope.AgentIDPanel = false;
            this.noOfDays = "";
            this.interest = "";
            $scope.dueDate = "";

            // alert('SAVING');

        } else if (accFount == 5) {
            accType = 'FD';
            $scope.DaysPanel = false;
            $scope.InterestPanel = false;
            $scope.openingDate = false;
            $scope.DueDate = false;
            $scope.AgentIDPanel = false;
            this.noOfDays = "";
            this.interest = "";
            //alert('FD');

        }



        //$http.get(linkglobal + '/accounts?$filter=cust_id eq ' + this.accountData)
        //.success(function (res) {
        //    var Accounts = res;
        //    var account = Accounts.value;

        //    var count = account.length;


        //    for (var i = 0; i <= count; i++) {

        //        if (account[i].trx_type == accFount) {

        //            $scope.accountType = "";
        //            alert(account[i].Account_Type + ' Account Already Created For This Customer');
        //        }

        //    }

        //})
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


    $scope.RateOfInterest = function () {
        var intrestRate = this.interest;
        // alert(intrestRate);
        if (intrestRate > 20) {
            alert('Enter interest Rate Minimum 20');
            this.interest = "";
            //return;
        }
    }

    $scope.createaccount = function () {
        $scope.product_id;

        //Accounts fields Start

        var ModifiedDate = Math.round(Math.random() * (+new Date)).toString();

        // var acc_id = this.accountId;
        var cust_id = parseInt(this.accCustomerId);
        var balance = this.accountBalane;
         //alert('balance' + balance);
        //var bank_id = this.accountBankId;
        var branch_id = parseInt(this.accountBranchId);
        // alert('branch_id' + branch_id);

        var agent_id = parseInt(this.accountAgentId);
        //  alert('agent_id' + agent_id);
        // var status = this.accountStatus;
        var Account_Id = parseInt(this.accountType);
       /// alert('Account_Id' + Account_Id);

        var noDays = parseInt(this.noOfDays);

       // alert('noDays' + noDays);
        var interest = parseInt(this.interest);
       // alert('interest' + interest);
        var openingDate = String($filter('date')(this.openingDate, 'yyyy-MM-ddTHH:mm:ss'));
        var dueDate = this.dueDate;
       // alert(dueDate);
        var today_dt = String($filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ss'));
        var accType;
        //Accounts fields end




        //customer fields Start

        //var agentID = $scope.agentID;
        var bankID = imageIDData;
        var branchID = $scope.branchID;

        //var latestSeqence_zero = ("000" + latestSeqPlus).slice(-3);
        //Get Current Date and Time
        $scope.ModifiedDate = $filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ss');
        $scope.ModifiedDatee = $filter('date')(new Date(), 'HHMMss');

        var DateForToday = $scope.ModifiedDate;

        var TimeForToday = $scope.ModifiedDatee + 1;



        //    var custIDCreate = agentID + '' + TimeForToday;
        var custIDCreate = TimeForToday;

        //  alert(custIDCreate);

        var external_cust_id = custIDCreate;

        // var cust_id = custIDCreate;
        var cust_name = String(this.custFName + ' ' + this.custLName);

        //  alert(cust_name);

        var cust_local_add = String(this.custAddress);
        //  alert(cust_local_add);
        var cust_perm_add = String(this.custAddress2);
        //  alert(cust_perm_add);
        var cust_phno_1 = String(this.custMobileNo);
        //  alert(cust_phno_1);
        var cust_phno_2 = String(this.custMobileNo2);
        //   alert(cust_phno_2);
        var cust_photo = '';
        var cust_pancard_no = this.custPanCard;
        //  alert(cust_pancard_no);
        var cust_email_id = this.custEmailId;
        //  alert(cust_email_id);
        var login_id = '';
        var role_id = '';
        //var agent_id = agentID;
        var status = 1;
        var is_sync = 'false';
        var sync_dt = String($scope.ModifiedDate);
        var bank_sync_dt = '';
        var bank_id = bankID;


        var day = this.customerday;
        var interest = this.interest;
        var dataaccType = this.custAccType;
        var Newamount = this.amount;
        //customer fields end


        ////For RD and DRD Account Saving
        if (Account_Id == 1 || Account_Id == 2) {

            //alert('work...');
            //alert('Account_Id   ' + Account_Id);
            if (this.accountBranchId == null ||
           this.accountAgentId == null ||
           this.accountAgentId == "" ||
           this.accountBalane == null ||
           this.custFName == null ||
           this.custLName == null ||
           this.custMobileNo == null ||
           this.custMobileNo2 == null ||
           this.custAddress == null ||
           this.custAddress2 == null ||
           this.custPanCard == null ||
           this.custEmailId == null) {


                alert('Please Select/Fill All Fields.');

                if (cust_phno_1 == cust_phno_2) {
                    alert("Enter different phone number");


                }

            }
            else {
                // alert('enterd in else part');
                $http.get(linkglobal + '/products?$filter=ID eq ' + Account_Id)
            .success(function (res) {
                var Accounts = res;
                var accType = Accounts.value;
                accType = accType[0].pType;


                var external_account_id = String(accType + "/" + ModifiedDate);


                var request = $http({
                    method: "post",
                    url: linkglobal + "/customers",
                    crossDomain: true,
                    data: {
                        external_cust_id: external_cust_id,
                        cust_name: cust_name,
                        cust_local_add: cust_local_add,
                        cust_phno_1: cust_phno_1,
                        cust_phno_2: cust_phno_2,
                        cust_pancard_no: cust_pancard_no,
                        cust_email_id: cust_email_id,
                        agent_id: agent_id,
                        status: status,
                        sync_dt: sync_dt,
                        bank_id: bank_id,
                        bank_sync_dt: sync_dt,
                        //InstallmentDays: day,
                        //Percentage: interest,
                        is_sync: true

                    },
                    headers: { 'Content-Type': 'application/json' },

                }).success(function (data) {

                    //     alert('Customer created successfully');


                    $http.get(linkglobal + '/customers?$filter=bank_id eq ' + imageIDData + ' and is_sync ne false and external_cust_id+eq+%27' + external_cust_id + '%27').success(function (response) {
                        var cust1 = response;
                        var cust2 = cust1.value;
                        $scope.customersRecords = cust2;
                        var customer_id = cust2[0].cust_id;

                        //alert('customer_id'+customer_id);
                        //////new code
                        //  alert('external_account_id' + external_account_id);
                        var request = $http({
                            method: "post",
                            url: linkglobal + "/accounts",
                            crossDomain: true,
                            data: {
                                external_account_id: external_account_id,
                                //acc_id: acc_id,
                                cust_id: customer_id,
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
                                //InstallmentDays: noDays,
                                //Percentage: interest
                            },
                            headers: { 'Content-Type': 'application/json' },
                        }).success(function (data) {

                            alert('Account Created and Account Number is ' + external_account_id);

                            // alert('Account Created');

                        }).error(function (err) {

                            alert('Internet Not Available');
                        });

                    });

                }).error(function (err) {

                    alert('Internet Not Available');
                });



            })
                this.search = " ";
                this.exAccountId = '';
                $scope.openingDate = null;
                $scope.dueDate = null;
                this.accCustomerId = '';
                this.accountBalane = null;
                this.accountBankId = '';
                this.accountBranchId = '';
                this.accountAgentId = '';
                this.accountType = '';
                this.noOfDays = '';
                this.interest = '';

                $scope.DaysPanel = false;
                $scope.InterestPanel = false;




                //new code
                this.custAccType = null;
                this.agentID = null;
                this.custFName = '';
                this.custLName = '';
                this.custAddress = '';
                this.custAddress2 = '';
                this.amount = '';
                this.custMobileNo2 = '';
                this.custMobileNo = '';
                this.custPanCard = '';
                this.custEmailId = '';
                this.customerday = '';
                this.interests = '';
            }

        }



        //for LOAN Account Saving
        if (Account_Id == 3) {

            //alert('this.accountType' + this.accountType);
            //alert('this.accountBalane' + this.accountBalane);
            //alert(' this.custFName' + this.custFName);
            //alert(' this.custLName' + this.custLName);
            //alert(' this.custMobileNo' + this.custMobileNo);
            //alert(' this.custMobileNo2' + this.custMobileNo2);
            //alert('this.custAddress' + this.custAddress);
            //alert('this.custAddress2' + this.custAddress2);
            //alert('this.custPanCard' + this.custPanCard);
            //alert(' this.custEmailId' + this.custEmailId);
            //alert(' openingDate ' + openingDate);
            //alert(' dueDate ' + dueDate);
            //alert(' noDays ' + noDays);
            //alert(' interest ' + interest);
            //alert(' branch_id ' + branch_id);
            //alert(' balance ' + balance);
            if (this.accountType == null ||
         this.accountType == "" ||

         this.accountBalane == null ||
         this.custFName == null ||
         this.custLName == null ||
         this.custMobileNo == null ||
         this.custMobileNo2 == null ||
         this.custAddress == null ||
         this.custAddress2 == null ||
         this.custPanCard == null ||
         this.custEmailId == null ||
          openingDate == null || openingDate == "" ||
                dueDate == null || dueDate == "" ||
                noDays == null || noDays == "" ||
                interest == null || interest == "" ||
                branch_id == "" || branch_id == null ||
                balance == null || balance == "") {


                alert('Please Select/Fill All Fields.');

                if (cust_phno_1 == cust_phno_2) {
                    alert("Enter different phone number");


                }

            }
            else {
                //   alert('enterd in else part');
                $http.get(linkglobal + '/products?$filter=ID eq ' + Account_Id)
                    .success(function (res) {
                        var Accounts = res;
                        var accType = Accounts.value;
                        accType = accType[0].pType;


                        var external_account_id = String(accType + "/" + ModifiedDate);

                        var request = $http({
                            method: "post",
                            url: linkglobal + "/customers",
                            crossDomain: true,
                            data: {
                                external_cust_id: external_cust_id,
                                cust_name: cust_name,
                                cust_local_add: cust_local_add,
                                cust_perm_add: cust_perm_add,
                                cust_phno_1: cust_phno_1,
                                cust_phno_2: cust_phno_2,
                                cust_pancard_no: cust_pancard_no,
                                cust_email_id: cust_email_id,
                                //hardcoded created Agent ID in DB
                                agent_id: 1717,
                                status: status,
                                sync_dt: sync_dt,
                                bank_id: bank_id,
                                bank_sync_dt: sync_dt,
                                //InstallmentDays: day,
                                //Percentage: interest,
                                is_sync: true

                            },
                            headers: { 'Content-Type': 'application/json' },

                        }).success(function (data) {

                            //     alert('Customer created successfully');


                            $http.get(linkglobal + '/customers?$filter=bank_id eq ' + imageIDData + ' and is_sync ne false and external_cust_id+eq+%27' + external_cust_id + '%27')
                                .success(function (response) {
                                    var cust1 = response;
                                    var cust2 = cust1.value;
                                    $scope.customersRecords = cust2;
                                    var customer_id = cust2[0].cust_id;




                                    var request = $http({
                                        method: "post",
                                        url: linkglobal + "/accounts",
                                        crossDomain: true,
                                        data: {
                                            external_account_id: external_account_id,
                                            //acc_id: acc_id,
                                            cust_id: customer_id,
                                            balance: balance,
                                            bank_id: imageIDData,
                                            branch_id: branch_id,
                                            //hardcoded created Agent ID in DB
                                            agent_id: 1717,
                                            status: 1,
                                            Account_Type: accType,
                                            bank_sync_dt: openingDate,
                                            is_sync: true,
                                            sync_dt: openingDate,
                                            trx_type: Account_Id,
                                            InstallmentDays: noDays,
                                            Percentage: interest
                                        },
                                        headers: { 'Content-Type': 'application/json' },
                                    }).success(function (data) {

                                        alert('Account Created and Account Number is ' + external_account_id);


                                    });
                                })

                        });
                    })
                this.search = " ";
                this.exAccountId = '';
                $scope.openingDate = null;
                $scope.dueDate = null;
                this.accCustomerId = '';
                this.accountBalane = null;
                this.accountBankId = '';
                this.accountBranchId = '';
                this.accountAgentId = '';
                this.accountType = '';
                this.noOfDays = '';
                this.interest = '';

                $scope.DaysPanel = false;
                $scope.InterestPanel = false;




                //new code
                this.custAccType = null;
                this.agentID = null;
                this.custFName = '';
                this.custLName = '';
                this.custAddress = '';
                this.custAddress2 = '';
                this.amount = '';
                this.custMobileNo2 = '';
                this.custMobileNo = '';
                this.custPanCard = '';
                this.custEmailId = '';
                this.customerday = '';
                this.interests = '';

            }
        }



        //For SAVING account Saving
           if (Account_Id == 4) {
               if (this.accountType == null ||
                      this.accountType == "" ||
                       this.accountBranchId == null ||
                       this.accountBranchId == "" ||
                   this.accountBalane == null ||
                  this.custFName == null ||
                  this.custLName == null ||
                  this.custMobileNo == null ||
                  this.custMobileNo2 == null ||
                  this.custAddress == null ||
                  this.custAddress2 == null ||
                  this.custPanCard == null ||
                  this.custEmailId == null) {


                   alert('Please Select/Fill All Fields.');

                   if (cust_phno_1 == cust_phno_2) {
                       alert("Enter different phone number");


                   }

               }
               else {
                  // alert("work and enter in else part");

                   $http.get(linkglobal + '/products?$filter=ID eq ' + Account_Id)
        .success(function (res) {
            var Accounts = res;
            var accType = Accounts.value;
            accType = accType[0].pType;


            var external_account_id = String(accType + "/" + ModifiedDate);

            var request = $http({
                method: "post",
                url: linkglobal + "/customers",
                crossDomain: true,
                data: {
                    external_cust_id: external_cust_id,
                    cust_name: cust_name,
                    cust_local_add: cust_local_add,
                    cust_phno_1: cust_phno_1,
                    cust_phno_2: cust_phno_2,
                    cust_pancard_no: cust_pancard_no,
                    cust_email_id: cust_email_id,
                    agent_id: 1718,
                    status: status,
                    sync_dt: sync_dt,
                    bank_id: bank_id,
                    bank_sync_dt: sync_dt,
        //            InstallmentDays: day,
        //            Percentage: interest,
                    is_sync: true

                },
                headers: { 'Content-Type': 'application/json' },

            }).success(function (data) {

                //     alert('Customer created successfully');


                $http.get(linkglobal + '/customers?$filter=bank_id eq ' + imageIDData + ' and is_sync ne false and external_cust_id+eq+%27' + external_cust_id + '%27').success(function (response) {
                    var cust1 = response;
                    var cust2 = cust1.value;
                    $scope.customersRecords = cust2;
                    var customer_id = cust2[0].cust_id;

                    //   alert('customer_id'+customer_id);
                    //////new code
                    //   alert('external_account_id' + external_account_id);
                    var request = $http({
                        method: "post",
                        url: linkglobal + "/accounts",
                        crossDomain: true,
                        data: {
                            external_account_id: external_account_id,
                            //acc_id: acc_id,
                            cust_id: customer_id,
                            balance: balance,
                            bank_id: imageIDData,
                            branch_id: branch_id,
                            agent_id: 1718,
                            status: 1,
                            Account_Type: accType,
                            bank_sync_dt: today_dt,
                            sync_dt: today_dt,
                            is_sync: true,
                            trx_type: Account_Id,
                            //InstallmentDays: noDays,
                            //Percentage: interest
                        },
                        headers: { 'Content-Type': 'application/json' },
                    }).success(function (data) {

                        alert('Account Created and Account Number is  ' + external_account_id);

                        // alert('Account Created');

                    }).error(function (err) {

                        alert('Account Internet Not Available');
                    });

                });

            }).error(function (err) {

                alert('Internet Not Available');
            });



        })
                   this.search = " ";
                   this.exAccountId = '';
                   $scope.openingDate = null;
                   $scope.dueDate = null;
                   this.accCustomerId = '';
                   this.accountBalane = null;
                   this.accountBankId = '';
                   this.accountBranchId = '';
                   this.accountAgentId = '';
                   this.accountType = '';
                   this.noOfDays = '';
                   this.interest = '';

                   $scope.DaysPanel = false;
                   $scope.InterestPanel = false;




                   //new code
                   this.custAccType = null;
                   this.agentID = null;
                   this.custFName = '';
                   this.custLName = '';
                   this.custAddress = '';
                   this.custAddress2 = '';
                   this.amount = '';
                   this.custMobileNo2 = '';
                   this.custMobileNo = '';
                   this.custPanCard = '';
                   this.custEmailId = '';
                   this.customerday = '';
                   this.interests = '';
               }

           }




    }


    $scope.clearData = function () {
        //$scope.search = " ";
        //$scope.DueDate = false;
        $scope.accountBalane = "";
        //$scope.openingDate = null;
        //$scope.dueDate = null;
        //$scope.accCustomerId = "";

        //$scope.accountBankId = "";
        $scope.accountBranchId = "";
        $scope.accountAgentId = "";
        $scope.accountType = "";
        //this.noOfDays = "";
        //this.interest = "";
        //$scope.DaysPanel = false;
        //$scope.InterestPanel = false;




        this.custAccType = null;
        this.agentID = "";
        this.custFName = null;
        this.custLName = null;
        this.custAddress = null;
        this.custAddress2 = null;
        this.amount = "";
        this.custMobileNo2 = null;
        this.custMobileNo = null;
        this.custPanCard = null;
        this.custEmailId = null;
        this.customerday = null;
        this.interests = null;

        $scope.myForm.$setPristine();
    }

})