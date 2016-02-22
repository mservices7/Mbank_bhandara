
// create the module and name it scotchApp
var scotchApp = angular.module('app.acc_detail', ['ngRoute', 'ngCookies'])


scotchApp.controller('acc_detailController', function ($rootScope, $interval, $timeout, $scope, $http, $routeParams, $location, $filter, $cookieStore) {

    $scope.CheckLogin = function () {
        if ($cookieStore.get('bankIDImg') == undefined) { $location.path('/'); }

    }
   

    var roughtDetails = $cookieStore.get('user');
    var imageIDData = $cookieStore.get('bankIDImg');
    $scope.imgIdDdURL = imageIDData;

    $scope.customer_id = $routeParams.Cust_Id;
 //alert("customer_id=" + $scope.customer_id);

    $scope.imgDetails = [
        {
            bankIDimg: 2,
            imgUrl: "images/bankimg/Anjali_fincorp_solution.png"
        },
        {
            bankIDimg: 1,
            imgUrl: "images/bankimg/demo.png"
        }
    ];

    var linkglobal = $cookieStore.get('urlBanks');  //Bank Bhandara

    //Today Date
    $scope.Date1 = $filter('date')(new Date(), 'dd-MM-yyyy');
    var date2 = "'" + $scope.Date1 + "'";
    //Route Data
    $scope.trxData = $routeParams.exbank_id;

    $http.get(linkglobal + '/customers?$filter=cust_id eq ' + $scope.customer_id + 'and bank_id eq ' + imageIDData).success(function (response) {
        var cust1 = response;
        var cust2 = cust1.value;
        var customer2 = cust2;
       // console.log('Data=' + customer2);
        var count = cust2.length;
        $scope.txtcust_name = customer2[0].cust_name;
        $scope.txtcust_phoneno = customer2[0].cust_phno_1;
        $scope.txtcust_emailId = customer2[0].cust_email_id;
    })

 
    $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData + ' and trx_data eq 1')
                               .success(function (response) {
                                   var trans1 = response;
                                   var user1 = trans1.value;
                                   $scope.transDetailsAccTypes = user1;

                                   var count = user1.length;
                                  //alert(count);
                               });

    /////rohit
 
        //alert(this.ID);
        var custmerId = this.ID;
       
     

        $http.get(linkglobal + '/accounts?$filter=cust_id eq ' + $scope.customer_id).success(function (response) {
            var cust1 = response; var cust2 = cust1.value; $scope.customers = cust2; var count = cust2.length;
            var gettrxDetails = cust2[0].trx_type;
            $http.get(linkglobal + '/trxn_views?$filter=cust_id eq ' + $scope.customer_id + ' and trx_data eq ' + gettrxDetails).success(function (response) {
                var customer1 = response;
                var customer2 = customer1.value;
                $scope.datadetails = customer2;
                var count = customer2.length;
              
                $scope.txtcust_accNo = customer2[0].external_account_id;

                $scope.gettrxDetails = customer2[0].trx_data;
                $scope.getDetails = customer2[0].trx_data;

            });
        });

       
    




    //customer Search
   
       // $location.path('/dd');

        $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData + ' and trx_data eq 1')
                               .success(function (response) {
                                   var trans1 = response;
                                   var user1 = trans1.value;
                                   $scope.transDetailsAccTypes = user1;

                                   var count = user1.length;
                               });


        //alert('out');

    
})
