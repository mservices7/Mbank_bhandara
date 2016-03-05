
// create the module and name it app
var app = angular.module('app.profile', ['ngRoute', 'ngCookies']);

// create the controller and inject Angular's $scope
app.controller('profileController', function ($rootScope, $scope, $http, $location, $routeParams, $filter, $cookieStore) {

    $scope.CheckLogin = function () {
        if ($cookieStore.get('bankIDImg') == undefined) { $location.path('/'); }

    }

    var roughtDetails = $cookieStore.get('user');
    var imageIDData = $cookieStore.get('bankIDImg');
    $scope.imgIdDdURL = imageIDData;

    //for Showing a menu
    $scope.transaction = true;
    $scope.search = true;
    $scope.request = true;
    $scope.create = true;
    $scope.reports = true;

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
            imgUrl: "images/bankimg/demo.png"
        }
    ];

    //BM Name
    $http.get(linkglobal + '/banks?$filter=bank_id eq ' + imageIDData)
               .success(function (res) { var acc = res; var acc1 = acc.value; $scope.bankDetail = acc1; $scope.bmName = acc1[0].bank_name; var aaa = acc1[0].bank_name; $scope.dataLength = aaa.length + '0px'; });


    //Total Agent 
    $http.get(linkglobal + '/agents?$filter=bank_id eq ' + imageIDData).success(function (response) { var agent = response; var user = agent.value; $scope.agents = user.length; });

    //Total Customer
    $http.get(linkglobal + '/customers?$filter=bank_id eq ' + imageIDData).success(function (response) { var cust1 = response; var cust2 = cust1.value; $scope.customers = cust2.length; });


    $scope.update = function () {

        var bank_id = this.bank_id;
        var bank_name = this.bank_name;
        var bank_add = this.bank_add;
        var bank_phno_1 = this.bank_phno_1;
        var bank_phno_2 = this.bank_phno_2;
        // alert(bank_name);
        $http.get(linkglobal + '/banks?$filter=bank_id eq ' + bank_id)
            .success(function (res) {
                var acc = res;
                var bData = acc.value;

                var request = $http({
                    method: "put",
                    url: linkglobal + "/banks(" + bank_id + ")",
                    crossDomain: true,
                    data: {
                        external_bank_id: bData[0].external_bank_id,
                        bank_name: bank_name,
                        bank_add: bank_add,
                        bank_phno_1: bank_phno_1,
                        bank_phno_2: bank_phno_2,
                        status: bData[0].status,
                        is_sync: bData[0].is_sync,
                        sync_dt: bData[0].sync_dt,
                        bank_sync_dt: bData[0].bank_sync_dt
                    },
                    headers: { 'Content-Type': 'application/json' },

                }).success(function () {

                    alert('Data Updated On Server');
                    $http.get(linkglobal + '/banks?$filter=bank_id eq ' + imageIDData)
                       .success(function (res) { var acc = res; var acc1 = acc.value; $scope.bankDetail = acc1; $scope.bmName = acc1[0].bank_name; var aaa = acc1[0].bank_name; $scope.dataLength = aaa.length + '0px'; });
                    location.reload();

                });
            });

    }
    $scope.updatePassword = function () {

        var loginId = this.loginId;
        var oldPassword = this.oldPassword;
        var newPassword = this.newPassword;
        var confirmPassword = this.confirmPassword;

        $http.get('http://mbankwcfdataservices.azurewebsites.net/mBankDataService.svc/user_details?$filter=login_id eq ' + loginId)
          .success(function (res) {
              var user = res;
              var userData = user.value;

              if (userData.length == 0) {
                  alert('Please Enter Valid Login Id');

              }
              else {
                  // console.log(userData);
                  if (loginId == userData[0].login_id && oldPassword == userData[0].pwd) {

                      if (newPassword == confirmPassword && newPassword != null && newPassword != "" && confirmPassword != null && confirmPassword != "") {

                          var externalLogInId = userData[0].external_login_id;
                          var role_id = userData[0].role_id;
                          var status = userData[0].status;
                          var is_sync = userData[0].is_sync;
                          var sync_dt = userData[0].sync_dt;
                          var bank_sync_dt = userData[0].bank_sync_dt;
                          var bank_id = userData[0].bank_id;

                          //alert('ExId' + externalLogInId);
                          //alert('loginId' + loginId);
                          //alert('confirmPassword' + confirmPassword);

                          //alert('RoleId'+role_id);
                          //alert('Status'+status);
                          //alert('isSyan'+is_sync);
                          //alert('sync_dt' + sync_dt);
                          //alert('bank_sync_dt' + bank_sync_dt);
                          //alert('bank_id' + bank_id);

                          var request = $http({
                              method: "put",
                              url: "http://mbankwcfdataservices.azurewebsites.net/mBankDataService.svc/user_details(" + loginId + ")",
                              crossDomain: true,
                              data: {
                                  external_login_id: externalLogInId,
                                  login_id: loginId,
                                  pwd: confirmPassword,
                                  role_id: role_id,
                                  status: status,
                                  is_sync: is_sync,
                                  sync_dt: sync_dt,
                                  bank_sync_dt: bank_sync_dt,
                                  bank_id: bank_id
                              },
                              headers: { 'Content-Type': 'application/json' },
                          }).success(function () {

                              alert('Password Change Successfully...');
                             
                          })

                         

                      } else {
                          alert('Please Enter Same Password');

                      }
                  }
                  else {
                      alert('Please Enter Valid Old Password');

                  }


              }

          }
          ).error(function (err) {
              alert('Please Enter Valid User Id');

          });
        this.loginId = null;
        this.oldPassword = null;
        this.newPassword = null;
        this.confirmPassword = null;
    }



    // clear change password field
    $scope.clear = function () {
        this.loginId = null;
        this.oldPassword = null;
        this.newPassword = null;
        this.confirmPassword = null;


    }





});
