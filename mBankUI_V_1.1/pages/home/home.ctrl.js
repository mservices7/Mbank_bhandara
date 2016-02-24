
// create the module and name it scotchApp
var scotchApp = angular.module('app.home', ['ngRoute', 'ngCookies'])


scotchApp.controller('homeController', function ($rootScope, $interval, $timeout, $scope, $http, $routeParams, $location, $filter, $cookieStore) {
    $scope.CheckLogin = function () {if ($cookieStore.get('bankIDImg') == undefined) { $location.path('/'); } 
        
    }
    var vm = this;

    //alert('working..');
    var roughtDetails = $cookieStore.get('user');
    var imageIDData = $cookieStore.get('bankIDImg');
    $scope.imgIdDdURL= imageIDData;
 
    $scope.saving = function () {
       
        $scope.Navigation = 'saving';
        $location.path('/dd/'+$scope.Navigation);
    }

    $scope.management = function () {

        $scope.Navigation = 'management';
        $location.path('/dd/' + $scope.Navigation);
    }

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
    $scope.Date1 = $filter('date')(new Date(), 'dd-MM-yyyy');
    var date2 = "'" + $scope.Date1 + "'";
    $scope.Date3 = $filter('date')(new Date(), 'yyyy-MM-dd');
    var date3 = "'" + $scope.Date3 + "'";
    //Last Seven Days Transactions
    for (var d = 0; d <= 7; d++) {

        var amtddt = 0;
        var today = new Date();
        var lastWeeks = new Date(today.getFullYear(), today.getMonth(), today.getDate() - d);
        var lastWeekdatesds = "'" + $filter('date')(lastWeeks, 'dd-MM-yyyy') + "'";

        $http.get(linkglobal + '/trxn_views?$filter=trx_dt eq ' + lastWeekdatesds + ' and bank_id eq ' + imageIDData + ' and status eq ' + 7 + ' or status eq ' + 10 + ' or status eq ' + 11).success(function (response) {
            var trx = response; var transaction = trx.value; var count = transaction.length;
            for (var i = 0; i < count; i++) {
                amtddt = amtddt + transaction[i].amt;
            }

            $scope.weedDAte = amtddt;
        })
    }

    //Todays Transactions 
    $http.get(linkglobal + '/trx_details?$filter=trx_dt eq ' + date2 + ' or trx_dt eq ' + date3 + ' and bank_id eq ' + imageIDData + ' and status eq ' + 7 + ' or status eq ' + 10 + ' or status eq ' + 11).success(function (response) { var amt = 0; var trx1 = response; var user1 = trx1.value; $scope.todaystrxsDashBoard = user1; });


    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = $filter('date')(new Date(y, m, 1), 'MM-yyyy');
    var lastDay = $filter('date')(new Date(y, m + 1, 0), 'dd-MM-yyyy');
    
    //tHIS MONTHS TOTAL AMOUNT
    $http.get(linkglobal + "/trxn_views?$filter=bank_id eq " + imageIDData + ' and status eq ' + 7 + ' or status eq ' + 10 + ' or status eq ' + 11).success(function (response) {
        var amt1 = 0; var trx = response; var transaction = trx.value; $scope.transactionsT = transaction;
        var count = transaction.length;
      
        for (var i = 0; i < count; i++) {
            if (firstDay === (transaction[i].trx_dt).slice(-7)) { amt1 = amt1 + transaction[i].amt; }
        }
        $scope.thisMontsCollection = amt1;
    });

    //Total Collections
    $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData + ' and status eq ' + 7 + ' or status eq ' + 10 + ' or status eq ' + 11).success(function (response) {
        var amt = 0; var trx1 = response;
        var user1 = trx1.value;
        $scope.trxs = user1;
        var count = user1.length;
        for (var i = 0; i < count; i++) {
            amt = amt + user1[i].amt;
        }
        $scope.amountTotal = amt;
    });
    
    //Today Collection
    $http.get(linkglobal + '/trxn_views?$filter=trx_dt eq ' + date2 + ' or trx_dt eq ' + date3 + ' and bank_id eq ' + imageIDData + ' and status eq ' + 7 + ' or status eq ' + 10 + ' or status eq ' + 11).success(function (response) { var amt = 0; var trx1 = response; var user1 = trx1.value; $scope.trxs = user1; var count = user1.length; for (var i = 0; i < count; i++) { amt = amt + user1[i].amt; } $scope.amountToday = amt; });

    //Total Agent 
    $http.get(linkglobal + '/agents?$filter=bank_id eq ' + imageIDData).success(function (response) { var agent = response; var user = agent.value; $scope.agents = user; });

    //Total Customer
    $http.get(linkglobal + '/customers?$filter=bank_id eq ' + imageIDData).success(function (response) { var cust1 = response; var cust2 = cust1.value; $scope.customers = cust2; var count = cust2.length; });

    //Graph Data
    $scope.refreshdash = function () {
        $http.get(linkglobal + '/trxn_views?$filter=bank_id eq ' + imageIDData + ' and status eq ' + 7 + ' or status eq ' + 10 + ' or status eq ' + 11).success(function (response) { var amt1 = 0; var trx = response; var transaction = trx.value; $scope.transactionsT = transaction; var count = transaction.length; for (var i = 0; i < count; i++) { amt1 = amt1 + transaction[i].amt; } $scope.amount1 = amt1; });
        $http.get(linkglobal + "/trxn_views?$filter=bank_id eq " + imageIDData + ' and status eq ' + 7 + ' or status eq ' + 10 + ' or status eq ' + 11).success(function (response) { var amt1 = 0; var trx = response; var transaction = trx.value; $scope.transactionsT = transaction; var count = transaction.length; for (var i = 0; i < count; i++) { if (firstDay == (transaction[i].trx_dt).slice(-7, 5)) { amt1 = amt1 + transaction[i].amt; } } $scope.thisMontsCollection = amt1; });
        for (var d = 0; d <= 7; d++) {

            var amtddt = 0;
            var today = new Date();
            var lastWeeks = new Date(today.getFullYear(), today.getMonth(), today.getDate() - d);
            var lastWeekdatesds = "'" + $filter('date')(lastWeeks, 'dd-MM-yyyy') + "'";
            var lastWeekdatesd = "'" + $filter('date')(lastWeeks, 'yyyy-MM-dd') + "'";
            $http.get(linkglobal + '/trxn_views?$filter=status eq ' + 7 + ' or status eq ' + 10 + ' or status eq ' + 11 + ' and trx_dt eq ' + lastWeekdatesds + ' and bank_id eq ' + imageIDData).success(function (response) {
                var trx = response; var transaction = trx.value; var count = transaction.length;
                for (var i = 0; i < count; i++) {
                    amtddt = amtddt + transaction[i].amt;
                }

                $scope.weedDAte = amtddt;
            })
        }
        $http.get(linkglobal + "/trxn_views?$filter=bank_id eq " + imageIDData + ' and status eq ' + 7 + ' or status eq ' + 10 + ' or status eq ' + 11).success(function (response) {
            var amt1 = 0; var trx = response; var transaction = trx.value; $scope.transactionsT = transaction;
            var count = transaction.length;

            for (var i = 0; i < count; i++) {
                if (firstDay === (transaction[i].trx_dt).slice(-7)) { amt1 = amt1 + transaction[i].amt; }
            }
            $scope.thisMontsCollection = amt1;
        });

        $http.get(linkglobal + '/trxn_views?$filter=trx_dt eq ' + date2 + ' or trx_dt eq ' + date3 + ' and bank_id eq ' + imageIDData + ' and status eq ' + 7 + ' or status eq ' + 10 + ' or status eq ' + 11).success(function (response) { var amt = 0; var trx1 = response; var user1 = trx1.value; $scope.todaystrxs = user1; });
        $http.get(linkglobal + '/trxn_views?$filter=trx_dt eq ' + date2+ ' or trx_dt eq ' + date3 + ' and bank_id eq ' + imageIDData + ' and status eq ' + 7 + ' or status eq ' + 10 + ' or status eq ' + 11).success(function (response) { var amt = 0; var trx1 = response; var user1 = trx1.value; $scope.trxs = user1; var count = user1.length; for (var i = 0; i < count; i++) { amt = amt + user1[i].amt; } $scope.amountToday = amt; });
        $http.get(linkglobal + '/agents?$filter=bank_id eq ' + imageIDData).success(function (response) { var agent = response; var user = agent.value; $scope.agents = user; });
        $http.get(linkglobal + '/customers?$filter=bank_id eq ' + imageIDData).success(function (response) { var cust1 = response; var cust2 = cust1.value; $scope.customers = cust2; var count = cust2.length; });
        $http.get(linkglobal + '/totalAmtDates?$filter=bank_id eq ' + imageIDData)
    .success(function (response) {
        var agenttrx1 = response;
        var agenttrx2 = agenttrx1.value;

        var barChartData;
        var count = agenttrx2.length;
        var lbl1 = new Array();
        var datas1 = new Array();
        for (var i = 0; i < count; i++) {
            lbl1.push(agenttrx2[i].trx_dt);
            datas1.push(agenttrx2[i].totalAmtdate1);
        }
        barChartData = {
            labels: lbl1,
            datasets: [
                {
                    fillColor: "rgba(0,0,255,0.3)",
                    //strokeColor: "rgba(0,0,255,0.3)",
                    //pointColor: "rgba(220,220,220,1)",
                    //strokeColor: "rgba(220,220,220,1)",

                    title: "test",
                    //fillColor: "transparent",
                    strokeColor: "#65204c",
                    pointColor: "#65204c",
                    pointHighlightStroke: "#FFF",
                    data: datas1
                }
            ]

        }


        var myBar = new Chart(document.getElementById("bar").getContext("2d")).Bar(barChartData);

    });



        //line graph

        $http.get(linkglobal + '/totalAmtDates?$filter=bank_id eq ' + imageIDData)
              .success(function (response) {
                  var trx1 = response;
                  var trx2 = trx1.value; 
                  var lineChartData;
                  $scope.tr2 = trx2;
                  var count = trx2.length;
                  var lbl = new Array();
                  var datas = new Array();
                  for (var i = 0; i < count; i++) {
                      lbl.push(trx2[i].trx_dt);
                      datas.push(trx2[i].totalAmtdate1);
                  }
                  lineChartData = {
                      labels: lbl,
                      datasets: [
                          {
                              //fillColor: "rgba(0,0,255,0.3)",
                              //strokeColor: "rgba(0,0,255,0.3)",
                              //pointColor: "rgba(128,0,0,0.4)",
                              fillColor: "rgba(0,0,255,0.3)",
                              title: "test",
                              strokeColor: "#65204c",
                              pointColor: "#65204c",
                              pointHighlightStroke: "#FFF",
                              data: datas
                          }
                      ]

                  }

                  var myLine = new Chart(document.getElementById("line").getContext("2d")).Line(lineChartData);
              });
        //

    }





  

})
