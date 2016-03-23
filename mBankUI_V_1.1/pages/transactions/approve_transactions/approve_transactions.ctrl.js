
// create the module and name it scotchApp
var scotchApp = angular.module('app.approve_transactions', ['ngRoute'])


scotchApp.controller('approve_transactionsController', function ($rootScope, $scope, $http, $routeParams, $location, $filter, $cookieStore) {
    $scope.CheckLogin = function () {if ($cookieStore.get('bankIDImg') == undefined) { $location.path('/'); }

       
     }

   // alert('work');
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

    $scope.limit = 30;

    $scope.limitTo = function () {
        $scope.limit = $scope.limit + 30;
    }

    //get total transactions dashaboard
    $http.get(linkglobal + '/trx_details?$filter=bank_id eq ' + imageIDData + ' and trx_type ne '+"'"+3+"'" +' and status eq 7')
           .success(function (response) {
               var amt1 = 0;
               var trx = response;
               var transaction = trx.value;
               $scope.transactionsT = transaction;
               var count = transaction.length;
               for (var i = 0; i < count; i++) {
                   amt1 = amt1 + transaction[i].amt;
               }
               $scope.amount1 = amt1;
               console.log($scope.amount1);
              // alert($scope.amount1);
           });

    //get total Approved transactions 
    $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData + ' and trx_data ne 3 and status eq 7')
        //and status ne 10 and status ne 11 status ne 2')
      .success(function (response) {
          var trans1 = response;
          var user1 = trans1.value;
          $scope.trans34 = user1;
          var count = user1.length;
          var amt = 0;

      })
    
    //refresh code

    $scope.refresh = function () {
       
        $scope.trans34 = null;
        $http.get(linkglobal + '/trx_details?$filter=bank_id eq ' + imageIDData + ' and trx_data ne 3 and status eq 7') 
            //and status ne 10 and status ne 11')
          .success(function (response) {
              var amt1 = 0;
              var trx = response;
              var transaction = trx.value;
              $scope.transactionsT = transaction;
              var count = transaction.length;
              for (var i = 0; i < count; i++) {
                  amt1 = amt1 + transaction[i].amt;
              }
              $scope.amount1 = amt1;


          });

        $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData + ' and trx_data ne 3 and status eq 7 ')
            //and status ne 10 and status ne 11' + ' and trx_data ne ' + 3)
     .success(function (response) {
         var trans1 = response;
         var user1 = trans1.value;
         $scope.trans34 = user1;
         var count = user1.length;
         var amt = 0;

     })

    }
    
})
