
// create the module and name it scotchApp
var scotchApp = angular.module('app.userCreate', ['ngRoute', 'ngCookies'])


scotchApp.controller('userController', function ($rootScope, $interval, $timeout, $scope, $http, $routeParams, $location, $filter, $cookieStore) {
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

   

    $http.get(linkglobal + '/branches?$filter=bank_id eq ' + imageIDData).success(function (response) {
        var amt = 0; var trx1 = response; var user1 = trx1.value; $scope.branches = user1;
    });
 

  

    $scope.changeID = function () {
       
        $http.get(linkglobal + '/user_details?$orderby=login_id desc').success(function (response) {

            var trx1 = response; var user1 = trx1.value; var count = user1.length;
            $scope.maxLoginUsers= user1[0].login_id;
            $scope.maxLoginExterUser= user1[0].external_login_id;
          
        })

        $http.get(linkglobal + '/agents?$orderby=external_agent_id desc').success(function (response) {
            

            var amt = 0; var trx1 = response; var user1 = trx1.value;
             $scope.maxAgentExterId=Math.max(user1[0].external_agent_id); 
        })
       
    }


    $scope.createuser = function () {
       
        if (this.agentBranchID == '') {
            alert('Please Select Branch For Agent');
        } else if (this.apass != this.acpass) {
            alert('Password Are Not Same');

        }else{


        var getData = $scope.maxLoginUser;
        console.log(getData)
        var getDataAgent = $scope.maxAgentUser;
        console.log(getDataAgent)

        $scope.ModifiedDate = $filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ss');


    var agent_name = this.aName;
    var agent_local_add = this.aLAdd;
    var agent_perm_add = this.aPAdd;
    var agent_phno_1 = this.aPhone1;
    var agent_phno_2 = this.aPhone2;
    var agent_email_id = this.aEmail;
    var password = String(this.apass);
    var cpassword = String(this.acpass);
    var plus2 = $scope.maxAgentExterId;
    
    var plusOne2 = parseInt(plus2) + 2;
    var bank_id =imageIDData;
    var branch_id = this.agentBranchID;
    var role_id =1;
    
    var plus = $scope.maxLoginExterUser;
    var plus1 = $scope.maxLoginUsers;
    var plusOne = parseInt(plus) + 1;
    var plusOne1 = parseInt(plus1)+1;
   
    var external_login_id = String(plusOne);
    var login_id = plusOne1;
    var role_id;
    var status=1;
    var is_sync = true;
    var sync_dt = String($scope.ModifiedDate);
    var bank_sync_dt = String($scope.ModifiedDate);
    var external_agent_id = plusOne2;

        var request = $http({
            method: "post",
            url: linkglobal + "/user_details",
            crossDomain: true,
            data: {
                external_login_id: external_login_id,
                login_id: login_id,
                pwd:password,
                role_id:1,
                status:1,
                is_sync : true,
                sync_dt : String($scope.ModifiedDate),
                bank_sync_dt : String($scope.ModifiedDate)

            },
  
        headers: { 'Content-Type': 'application/json' },

    }).success(function (data) { 
        
    }) 

        var request = $http({
            method: "post",
            url: linkglobal + "/agents",
            crossDomain: true,
            data: {
                external_agent_id: String(login_id),
                agent_name: String(agent_name),
                agent_local_add: String(agent_local_add),
                agent_perm_add: String(agent_perm_add),
                agent_phno_1: String(agent_phno_1),
                agent_phno_2: String(agent_phno_2),
                agent_email_id: String(agent_email_id),
                login_id: login_id,
                status: status,
                bank_id: imageIDData,
                branch_id: branch_id,
                role_id: 1,
                is_sync: is_sync,
                sync_dt: sync_dt,
                bank_sync_dt: bank_sync_dt
            },
            headers: { 'Content-Type': 'application/json' },

        }).success(function () {


            $scope.clearData();

            alert(agent_name + 'Agent Create');
        })


    }
    }


    $scope.clearData = function () {
        this.aName ="";
        this.aLAdd = "";
        this.aPAdd = "";
        this.aPhone1 = "";
        this.aPhone2 = "";
        this.aEmail = "";
        this.apass = "";
        this.agentBranchID = "";
        this.acpass = "";
        $scope.form.$setPristine();
        //$location.path('/home');
    }


})
