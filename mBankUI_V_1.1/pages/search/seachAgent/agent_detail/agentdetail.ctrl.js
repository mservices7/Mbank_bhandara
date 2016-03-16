
// create the module and name it scotchApp
var scotchApp = angular.module('app.agent_details', ['ngRoute'])


scotchApp.controller('agent_detailsController', function ($rootScope, $scope, $http, $routeParams, $location, $filter, $cookieStore) {
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

    //Today Date
    $scope.Date1 = $filter('date')(new Date(), 'dd-MM-yyyy');
    var date2 = "'" + $scope.Date1 + "'";
    //Route Data
    $scope.trxData = $routeParams.exbank_id;

    $scope.exact_log = $routeParams.agent_id;

    $http.get(linkglobal + '/agents?$filter=bank_id eq ' + imageIDData)
       .success(function (response) {
           var agent = response;
           var user = agent.value;
           $scope.agents = user;
       });

  
    //customer update function

    $http.get(linkglobal + '/agents?$filter=agent_id eq ' + $scope.exact_log)
                 .success(function (response) {
                     var cust = response;
                     var custs = cust.value;
                     $scope.custDetail = custs;
                     $scope.external_agent_id = custs[0].external_agent_id;
                     $scope.agent_id = custs[0].agent_id;
                     $scope.agent_name = custs[0].agent_name;
                     $scope.agent_local_add = custs[0].agent_local_add;
                     $scope.agent_perm_add = custs[0].agent_perm_add;
                     $scope.agent_phno_1 = custs[0].agent_phno_1;
                     $scope.agent_phno_2 = custs[0].agent_phno_2;
                     $scope.branch_id = custs[0].branch_id;
                     $scope.agent_email_id = custs[0].agent_email_id;
                   
                     // console.log($scope.custDetail);

                 })
   

    $scope.updatecustomer = function () {

        var external_agent_id = $scope.external_agent_id;
        var agent_name = $scope.agent_name;
        var agent_id = $scope.agent_id;
        var agent_local_add = $scope.agent_local_add;
        var agent_perm_add = $scope.agent_perm_add;
        var agent_phno_1 = $scope.agent_phno_1;
        var agent_phno_2 = $scope.agent_phno_2;
        
        var agent_email_id = $scope.agent_email_id;

        //  alert(cust_name);
        $http.get(linkglobal + '/agents?$filter=agent_id eq ' + $scope.exact_log)
              .success(function (response) {
                  var agent = response;
                  var agentRecord = agent.value;
                  $scope.agentdetail = agentRecord;
                  var agent_photo = agentRecord[0].agent_photo;
                  var login_id = agentRecord[0].login_id;
                  var role_id = agentRecord[0].role_id;
                  var agent_id = agentRecord[0].agent_id;
                  var status = agentRecord[0].status;
                  var is_sync = agentRecord[0].is_sync;
                  var sync_dt = agentRecord[0].sync_dt;
                  var bank_sync_dt = agentRecord[0].bank_sync_dt;
                  var bank_id = agentRecord[0].bank_id;
                  var branch_id = agentRecord[0].branch_id;
                 

                  //     alert(cust_id);

                  var request = $http({
                      method: "put",
                      url: linkglobal + "/agents(" + agent_id + ")",
                      crossDomain: true,
                      data: {
                          external_agent_id: external_agent_id,
                          agent_name: agent_name,
                          agent_id: agent_id,
                          agent_local_add: agent_local_add,
                          agent_perm_add: agent_perm_add,
                          agent_phno_1: agent_phno_1,
                          agent_phno_2: agent_phno_2,
                          agent_photo: agent_photo,
                          
                          agent_email_id: agent_email_id,
                          login_id: login_id,
                          role_id: role_id,
                          
                          status: status,
                          is_sync: is_sync,
                          sync_dt: sync_dt,
                          bank_sync_dt: bank_sync_dt,
                          bank_id: bank_id,
                          branch_id:branch_id,
                          
                      },
                      headers: { 'Content-Type': 'application/json' },

                  }).success(function (data) {

                      alert('Data Updated On Server');
                      $http.get(linkglobal + '/agents?$filter=agent_id eq ' + $scope.exact_log)
                 .success(function (response) {
                     var agent1 = response;
                     var agents = agent1.value;
                     $scope.agentdetail = agents;
                     $scope.external_agent_id = agents[0].external_agent_id;
                     $scope.agent_id = agents[0].agent_id;
                     $scope.agent_name = agents[0].agent_name;
                     $scope.agent_local_add = agents[0].agent_local_add;
                     $scope.agent_perm_add = agents[0].agent_perm_add;
                     $scope.agent_phno_1 = agents[0].agent_phno_1;
                     $scope.agent_phno_1 = agents[0].agent_phno_1;
                    
                     $scope.agent_email_id = agents[0].agent_email_id;

                     // console.log($scope.custDetail);

                 })

                  });
              })

    }



});











