
// create the module and name it scotchApp
var scotchApp = angular.module('app.create_customer', ['ngRoute'])


scotchApp.controller('create_customerController', function ($rootScope, $scope, $http, $routeParams, $location, $filter, $cookieStore) {
    $scope.CheckLogin = function () {
        if ($cookieStore.get('bankIDImg') == undefined) { $location.path('/'); }

    }

   // alert('enterd');

    var accType;
    //$scope.days = false;
    //$scope.interest = false;



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
 
    $http.get(linkglobal + '/products?$filter=bank_id eq ' + imageIDData)//linkglobal + '/products')
          .success(function (res) { var acc = res; var acc1 = acc.value; $scope.accounts = acc1; });
    $http.get(linkglobal + '/agents?$filter=bank_id eq ' + imageIDData).success(function (response) {var agent = response;var user = agent.value;$scope.agents = user;});

    $scope.changeacc = function () {
        $http.get(linkglobal + '/products?$filter=Id eq ' + this.custAccType + 'and bank_id eq ' + imageIDData)
        .success(function (res) {

            var acc = res; var acc1 = acc.value; 
            if (acc1[0].Id == 1 || acc1[0].Id == 2 || acc1[0].Id == 4) {
                $scope.accType = acc1[0].pType;
                    $scope.days = false;
                    $scope.interest = false;
            } else if (acc1[0].Id == 3) {
                $scope.accType = acc1[0].pType;
                   $scope.days = true;
                    $scope.interest = true;
            }

        });

        if (this.custAccType == 1 || this.custAccType == 2 || this.custAccType == 4) {
                    //$scope.accType = acc1[0].pType;
                        $scope.days = false;
                        $scope.interest = false;
        } else if (this.custAccType == 3) {
                   // $scope.accType = acc1[0].pType;
                       $scope.days = true;
                       $scope.interest = true;

                }

    }


  

    //Create Customer Code
    $scope.createCutomer = function () {
        var accType = $scope.accType;

         


        //Search Running Sequence Number from local database to push in database 

        //if (this.custAccType == null) {
        //    alert('Please Select Account Type');
        //} else if (this.custFName == null || this.custLName == null) {
        //    alert('Please Enter Customer First & Last Name');

        //}
        //else if (this.custMobileNo == null) {
        //    alert('Please Enter Valid 10 - DIGIT Mobile Numer');

        //}
        if (this.custFName == null || this.custAccType == null || this.custLName == null || this.custMobileNo == null || this.custMobileNo2 == null || this.custAddress == null || this.custAddress2 == null || this.custPanCard == null || this.custEmailId == null || this.agentID==null || this.amount == null) {
            alert("Please Select/Fill All Field")
        }

    else {
          
    if (this.custMobileNo == this.custMobileNo2) {
        alert("Enter different phone number");
    }
    else {

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
            var cust_perm_add = String(this.custAddress2);
            var cust_phno_1 = String(this.custMobileNo);
            var cust_phno_2 = String(this.custMobileNo2);
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

            var external_account_id = accType + '/' + custIDCreate;


            // alert('sadsfdsfd'+this.interests);

            var day = this.customerday;
            var interest = this.interests;
            var dataaccType = this.custAccType;
            var Newamount = this.amount;
            //  alert('sadsfdsfd' + Newamount);


            //if (this.custAccType == 'LOAN' && this.interests > 20) {
            //    alert('Enter interest value minimum 20');

            //}
            //else {


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
                    InstallmentDays: day,
                    Percentage: interest,
                    is_sync: true

                },
                headers: { 'Content-Type': 'application/json' },

            }).success(function (data) {

                //  var day = this.customerday;
                // var interest = this.interests;

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
                            //  balance: 0.0,
                            bank_id: bank_id,
                            branch_id: branchID,
                            agent_id: agent_id,
                            status: status,
                            bank_sync_dt: sync_dt,
                            sync_dt: sync_dt,
                            balance: Newamount,
                            Account_Type: accType,
                            trx_type: dataaccType,
                            InstallmentDays: day,
                            Percentage: interest,
                            is_sync: true

                        },
                        headers: { 'Content-Type': 'application/json' },
                    }).success(function (data) {
                        // $location.path('/dashboard');
                        alert('Customer Created');
                        $http.get(linkglobal + '/products?$filter=bank_id eq ' + imageIDData).success(function (res) { var acc = res; var acc1 = acc.value; $scope.accounts = acc1; });

                    }).error(function (err) {
                        alert('Internet is Not Available');
                    });



                });


            }).error(function (err) {
                $location.path('/home');
                alert('Internet is Not Available');
                alert(err);
                console.log(err);

            });



            this.custAccType = "";
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



    $scope.clearCutomer = function () {
        this.custMobileNo2 = '';
        this.amount = "";
        this.custAccType = "";
        this.custFName = '';
        this.custLName = '';
        this.custAddress = '';
        this.custMobileNo = '';
        this.custPanCard = '';
        this.custEmailId = '';
        this.custMobileNo2 = '';
        this.custAddress2 = '';
        $scope.interest = false;
        $scope.days = false;
    }
})
