
// create the module and name it scotchApp
var scotchApp = angular.module('app.search_customer', ['ngRoute'])


scotchApp.controller('search_customerController', function ($rootScope, $scope, $http, $routeParams, $location, $filter, $cookieStore) {
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

    $scope.exact_log = $routeParams.cust_id;

    //customer reload button
    $scope.limit = 30;
    $scope.next = function () {
        $scope.limit = $scope.limit + 30;
    };
    //Requested Customer
    $http.get(linkglobal + '/CustomerAccounts?$filter=bank_id eq ' + imageIDData + ' and is_sync ne false').success(function (response) { 
        var cust1 = response;
        var cust2 = cust1.value;
        $scope.customers = cust2;
        var count = cust2.length;
    });

    $scope.latestId=function(){
    $http.get(linkglobal + '/trx_details' + '?$orderby=trx_id desc').then(function (res) {

        var getData1 = res.data;
        var getData = getData1.value;

        var id = getData[0].trx_id;
        var id1 = id.replace(/-|0/g, '');
        $scope.obtainValue = id1;
       // console.log($scope.obtainValue)
    })
 
    }

    //code for refresh
    $scope.refresh = function () {
        //alert("hfhj");
        $scope.customers = null;
         $http.get(linkglobal + '/trx_details' + '?$orderby=trx_id desc').then(function (res) {

        var getData1 = res.data;
        var getData = getData1.value;

        var id = getData[0].trx_id;
        var id1 = id.replace(/-|0/g, '');
        $scope.obtainValue = id1;
       // console.log($scope.obtainValue)
    })
         $http.get(linkglobal + '/CustomerAccounts?$filter=bank_id eq ' + imageIDData + ' and is_sync ne false' + ' and trx_data ne 3').success(function (response) { var cust1 = response; var cust2 = cust1.value; $scope.customers = cust2; var count = cust2.length; });
        

    }

    $scope.deposite = function () {
        var id = this.id;
        var money = this.money;   
        var type = this.type;

        var ModifiedDate = Math.round(Math.random() * (+new Date)).toString();      

        var DateForToday = $filter('date')(new Date(), 'dd-MM-yyyy');
        var getTrxId1 = $scope.obtainValue; 
        var getTrxId = getTrxId1 + ModifiedDate;

            $http.get(linkglobal + "/accounts" + "?$filter=acc_id eq " + id).then(function (res) {

            var role = res.data;
            var users = role.value;
            var Id=users[0].agent_id;
                             
            var agentId= Id+'-'+ModifiedDate;
            var getbalnce = users[0].balance;
                if(type==1){
                    var balance = getbalnce + money;
                } else if (type == 2) {
                    var balance = getbalnce - money;
                } else if (type == 3) {
                    var balance = getbalnce - money;
                }else if (type == 4) {
                    var balance = getbalnce + money;
                }

            var request = $http({
                method: "post",
                url: linkglobal + "/trx_details",
                crossDomain: true,
                data: {
                    external_trx_id: String(agentId),
                    trx_id: String(getTrxId),
                    bank_id: users[0].bank_id,
                    brach_id: users[0].branch_id,
                    cust_id: users[0].cust_id,
                    acc_id: users[0].acc_id,
                    agent_id: users[0].agent_id,
                    amt: money,
                    trx_dt: String(DateForToday),
                    trx_type: 'Cr',
                    status: 11,
                    is_sync: true,
                    sync_dt: String(DateForToday),
                    bank_sync_dt: String(DateForToday),
                    balance: balance



                },
                headers: { 'Content-Type': 'application/json' },

            }).success(function (data) {
                // Set a timeout to clear loader, however you would actually call the $ionicLoading.hide(); method whenever everything is ready or loaded.
                alert(money + ' Amount Deposited');
                this.money = '';
            })
                   
 

        })
    }

})
