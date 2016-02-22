
// create the module and name it scotchApp
var scotchApp = angular.module('app.sidebar', ['ngRoute'])


scotchApp.controller('sidebarController', function ($rootScope, $scope, $http, $routeParams, $location, $filter, $cookieStore,$interval, $timeout) {

    $scope.CheckLogin = function () {if ($cookieStore.get('bankIDImg') == undefined) { $location.path('/'); }

    }
   // alert('ww');
    var roughtDetails = $cookieStore.get('user');
    var imageIDData = $cookieStore.get('bankIDImg');
    $scope.imgIdDdURL = imageIDData;


    var linkglobal = $cookieStore.get('urlBanks');  //Bank Bhandara
    $scope.Date1 = $filter('date')(new Date(), 'dd-MM-yyyy');
    var date2 = "'" + $scope.Date1 + "'";
 
    $scope.imgDetails = [
        {
            bankIDimg: 2,
            imgUrl: "images/bankimg/Anjali_fincorp_solution.png"
        },
        {
            bankIDimg: 1,
            imgUrl: "images/logo.png"
        }
    ];

    $http.get(linkglobal+'/products?$filter=bank_id eq ' + imageIDData)//linkglobal + '/products')
            .success(function (res) {var acc = res;var acc1 = acc.value;$scope.accounts = acc1;});

    $http.get(linkglobal + '/banks?$filter=bank_id eq ' + imageIDData)
            .success(function (res) {
                var acc = res;
                var acc1 = acc.value;
                $scope.bmName = acc1[0].bank_name;
                var aaa = acc1[0].bank_name;
                $scope.dataLength = aaa.length + '0px';
            });


    ///for Branch Name
    $http.get(linkglobal + '/branches?$filter=bank_id eq ' + imageIDData)
          .success(function (res) {
              var acc = res;
              var acc1 = acc.value;
              $scope.brName = acc1[0].branch_name;
              var aaa = acc1[0].branch_name;
              $scope.dataLength = aaa.length + '0px';
          });


    //create Account
    $scope.createAccount = function () { $location.path('/createAccount'); }

    //create Product
    $scope.createProduct = function () { $location.path('/createProduct'); }

    //Route Req Customer
    $scope.reqCustPage=function(){$location.path('/req_cust');}
    
    //Dashboard
    $scope.dashboardPage = function () { $location.path('/dashboard'); }

    $scope.showSidebar = function () { $scope.sidebar = true; };
    //Account Wise Record
    $scope.goToPage = function () { var id = this.id; $location.path('/trxbyacctype/' + id); }

     //All Transactions
    $scope.allTransactions = function () { $location.path('/all_transactions'); }
    //DateWise Transactions
    $scope.DateWiseTrxn = function () { $location.path('/datewisetransactions'); }
    //Approved Trxn
    $scope.approvedTrxn = function () { $location.path('/approvetransaction'); }
    //Not ApprovedTrxn
    $scope.notApprovedTrxn = function () { $location.path('/notapprovetransaction'); }
    //TodaysTrxns
    $scope.TodaysTrxns = function () { $location.path('/today_transactions'); }
    
    //Create Branches
    $scope.createbranch = function () { $location.path('/createbranch'); }

    //customers
    $scope.customers = function () { $location.path('/customers'); }
    //request Customer
    $scope.reqCustomers = function () { $location.path('/req_cust'); }
    //Create Agent
    $scope.createAgent = function () { $location.path('/createusers'); }


    //search_agent
    $scope.search_agent = function () { $location.path('/search_agent'); } 
    //Serach Users
    $scope.serachusers = function () { $location.path('/serachusers'); }
    //Search Role
    $scope.searchrole = function () { $location.path('/searchrole'); }
    //Search Branch
    $scope.searchbranch = function () { $location.path('/searchbranch'); }
    //Search Bank
    $scope.searchbank = function () { $location.path('/searchbank'); }
    //search Account
    $scope.searchaccount = function () { $location.path('/searchaccount'); }

    $scope.createCustomers = function () { $location.path('/createcustomer'); };

    //reportEOD reportAgent reportCustomer
    $scope.reportEOD = function () { $location.path('/reportEOD'); }
    $scope.reportAgent = function () { $location.path('/reportAgent'); }
    $scope.reportCustomer = function () { $location.path('/reportCustomer'); }

    $scope.counter = 5;
    $scope.logout = function () {
    //    $scope.logoutLoading = true;
        
        $interval(function () {
            $scope.counter--;
        }, 1000);

        $timeout(
            function () {
            
                $cookieStore.remove('urlBanks', 'erase'); $cookieStore.remove('bankIDImg', 'erase'); $cookieStore.remove('user', 'erase'); $location.path('/');
            }

            , 1000);

    };

    $scope.timeOut=function(){
        $cookieStore.remove('urlBanks', 'erase'), $cookieStore.remove('bankIDImg', 'erase'), $cookieStore.remove('user', 'erase'), $location.path('/')
    }


})


scotchApp.filter('unique', function () {
    return function (collection, keyname) {
        var output = [],
            keys = [];

        angular.forEach(collection, function (dt2) {
            var key = dt2[keyname];
            if (keys.indexOf(key) === -1) {
                keys.push(key);
                output.push(dt2);
            }
        });
        return output;
    };
})