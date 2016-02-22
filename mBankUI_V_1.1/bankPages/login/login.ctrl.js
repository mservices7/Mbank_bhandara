
// create the module and name it app
var app = angular.module('app.login', ['ngRoute']);
 
// create the controller and inject Angular's $scope
app.controller('loginController', function ($rootScope, $scope, $http, $location, $routeParams, $filter) {
 
    $scope.mBank = 'mBank Login';

    var linkglobal = 'http://mbankwcfdataservices.azurewebsites.net/mBankDataService.svc'; //Bank Bhandara
    //var linkglobal = 'http://mbankwcfdataservice.azurewebsites.net/mBankDataService.svc'; //Demo



    $scope.buttonclick = function () {

        var username = this.username;
        var password = String(this.password);




        $scope.loadLoginFail = false;
        $scope.loadLoginFailInt = false;
        $scope.detailsLogin = false;
        $scope.loadLogin = true;

        if (this.username == null || this.password == null) {


            $scope.loadLogin = false;

            $scope.loadLoginFail = false;

            $scope.loadLoginFailInt = false;

            $scope.detailsLogin = true;


        }
        else {
            $scope.myForm.$setPristine();
            $http.get(linkglobal + '/user_details')
            .success(function (response) {
                var role = response;
                $scope.users = role.value;

                var users = $scope.users;
                var count = users.length;



                if (count > 0) {
                    for (var i = 0; i < count; i++) {

                        if (users[i].login_id == username && users[i].pwd == password) {
                            //alert( && parseInt(users[i].role_id) == 2);
                            //    alert(parseInt(users[i].bank_id));
                            switch (parseInt(users[i].bank_id)) {
                                case 1:
                                    switch (parseInt(users[i].role_id)) {
                                        case 1:
                                            alert('Not Authorized User')

                                            break;
                                        case 2:
                                            $rootScope.user = "admin";
                                            $rootScope.bankIDImg = users[i].bank_id;
                                            $rootScope.urlBanks = 'http://mbankwcfdataservices.azurewebsites.net/mBankDataService.svc';
                                            $location.path('/dashboard');
                                            $scope.loadLogin = false;
                                            $scope.loadLoginFailInt = false;
                                            $scope.detailsLogin = false;
                                            $scope.loadLoginFail = false;
                                            break;
                                        default:

                                            $scope.loadLogin = false;

                                            $scope.loadLoginFailInt = false;

                                            $scope.detailsLogin = false;

                                            $scope.loadLoginFail = true;
                                            break;

                                    }
                                    break;


                                case 2:
                                    switch (parseInt(users[i].role_id)) {
                                        case 1:
                                            alert('Not Authorized User')

                                            break;
                                        case 2:
                                            $rootScope.user = "admin";
                                            $rootScope.bankIDImg = users[i].bank_id;
                                            $rootScope.urlBanks = 'http://mbankwcfdataservice.azurewebsites.net/mBankDataService.svc';

                                            $location.path('/dashboard');
                                            $scope.loadLogin = false;
                                            $scope.loadLoginFailInt = false;
                                            $scope.detailsLogin = false;
                                            $scope.loadLoginFail = false;
                                            break;
                                        default:

                                            $scope.loadLogin = false;

                                            $scope.loadLoginFailInt = false;

                                            $scope.detailsLogin = false;

                                            $scope.loadLoginFail = true;
                                            break;

                                    }
                                    break;

                                default:
                                    $scope.loadLogin = false;

                                    $scope.loadLoginFailInt = false;

                                    $scope.detailsLogin = false;

                                    $scope.loadLoginFail = true;
                                    break;

                            }




                        }
                        else {
                            $scope.loadLogin = false;

                            $scope.loadLoginFailInt = false;

                            $scope.detailsLogin = false;

                            $scope.loadLoginFail = true;

                        }
                    }
                }
                else {


                    alert('Record Not Found!')
                }



            }).error(function (response) {
                $scope.loadLogin = false;
                $scope.detailsLogin = false;
                $scope.loadLoginFail = false;

                $scope.loadLoginFailInt = true;


                //alert('Incorrect Username and Password');
            });
        }

        this.username = null;
        this.password = null;

    };


    $scope.forgotpwd = function () {
        var username = this.newuser;
        var pwd = this.newpassword;
        var rpwd = this.retypenewpassword;


        $http.get(linkglobal + '/user_details?' + "$filter=login_id eq " + username + " ")
      .success(function (response) {
          console.log(response);
          var role = response;
          var user = role.value;
          var count = user.length;
          var external_login_id;
          var role_id;
          var status;
          var is_sync;
          var sync_dt;
          var bank_sync_dt;
          var bank_id;
          if (count > 0) {
              for (var i = 0; i < count; i++) {

                  external_login_id = user[i].external_login_id;
                  role_id: user[i].role_id;
                  status: user[i].status;
                  is_sync: user[i].is_sync;
                  sync_dt: user[i].sync_dt;
                  bank_sync_dt: user[i].bank_sync_dt;
                  bank_id: user[i].bank_id;

              }

          }

          if (pwd == rpwd) {
              var request = $http({
                  method: "put",
                  url: linkglobal + "/user_details(" + username + ")",
                  crossDomain: true,
                  data: {
                      login_id: username,
                      role_id: role_id,
                      status: status,
                      is_sync: is_sync,
                      pwd: pwd,
                      sync_dt: sync_dt,
                      bank_sync_dt: bank_sync_dt,
                      bank_id: bank_id,
                      external_login_id: external_login_id
                  },
                  headers: { 'Content-Type': 'application/json' },

              }).success(function (data) {

                  alert('Password Changed');

              }).error(function (err) {
                  alert('Incorrect Username');
              });
          }
          else {
              alert("Password & Retype Password are not Equal");
          }
      })

    };

    var doParseInt = function (val) {
        if (val && val != "")
            return parseInt(val);
    }

});
 