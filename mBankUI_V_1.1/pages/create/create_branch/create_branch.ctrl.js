
// create the module and name it scotchApp
var scotchApp = angular.module('app.branchCreate', ['ngRoute', 'ngCookies'])


scotchApp.controller('branchController', function ($rootScope, $interval, $timeout, $scope, $http, $routeParams, $location, $filter, $cookieStore) {
    $scope.CheckLogin = function () {
        if ($cookieStore.get('bankIDImg') == undefined) { $location.path('/'); }

    }
    var vm = this;


    var roughtDetails = $cookieStore.get('user');
    var imageIDData = $cookieStore.get('bankIDImg');
    $scope.imgIdDdURL = imageIDData;
     
    var linkglobal = $cookieStore.get('urlBanks');  //Bank Bhandara
    $scope.Date1 = $filter('date')(new Date(), 'dd-MM-yyyy');
    var date2 = "'" + $scope.Date1 + "'";

   

    $http.get(linkglobal + '/branches?$orderby=branch_id desc').success(function (response) {
        var amt = 0; var trx1 = response; var user1 = trx1.value; $scope.branches = user1;
        $scope.branchId = user1[0].branch_id;
        $scope.branchExtId = user1[0].external_branch_id;

    });


    $scope.createbranch = function () {


        var branch_name = this.branchnames;
        //alert("branch_name=" + this.branchnames);
        if (this.branchnames == null || this.branchAddress == null || this.branchPhNo1 == null || this.branchPhNo2 == null) {
            alert('Please Select/Fill All Field');
        }
        else {
            if (this.branchPhNo1 == this.branchPhNo2) {
                alert("Enter different phone number");
            }
            else {

                var getbranchId = $scope.branchId;
                var getExtbranchId = parseInt($scope.branchExtId);
                var plusbranchId = getbranchId + 1;
                var plusExtbranchId = getExtbranchId + 1;
                var external_branch_id = plusExtbranchId;
                var branch_id = plusbranchId;
                var bank_id = imageIDData;
                var branch_address = this.branchAddress;
                var branch_phoneno1 = String(this.branchPhNo1);
                var branch_phneno2 = String(this.branchPhNo2);
                var status = 1;
                $scope.ModifiedDate = $filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ss');


                var request = $http({
                    method: "post",
                    url: linkglobal + "/branches",
                    crossDomain: true,
                    data: {
                        external_branch_id: String(external_branch_id),
                        branch_id: branch_id,
                        branch_name: branch_name,
                        bank_id: bank_id,
                        branch_add: branch_address,
                        branch_phno_1: branch_phoneno1,
                        branch_phno_2: branch_phneno2,
                        status: status,
                        is_sync: true,
                        sync_dt: String($scope.ModifiedDate),
                        bank_sync_dt: String($scope.ModifiedDate)


                    },
                    headers: { 'Content-Type': 'application/json' },

                }).success(function (data) {
                    $scope.clearData();
                    $location.path('/home');

                    alert(branch_name + ' Branch Created Sucessfully');
                }).error(function (err) {

                    alert('Internet Not Available');
                });
            }
        }
    };


    $scope.clearData = function () {
        this.branchname = null;
        this.branchAddress = null;
        this.branchPhNo1 = null;
        this.branchPhNo2 = null;
    }
     
})
