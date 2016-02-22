
// create the module and name it scotchApp
var scotchApp = angular.module('app.create_product', ['ngRoute'])


scotchApp.controller('create_productController', function ($rootScope, $scope, $http, $routeParams, $location, $filter, $cookieStore) {
    $scope.CheckLogin = function () {if ($cookieStore.get('bankIDImg') == undefined) { $location.path('/'); }
 
    }

    var roughtDetails = $cookieStore.get('user');
    var imageIDData = $cookieStore.get('bankIDImg');
    $scope.imgIdDdURL = imageIDData;


    var linkglobal = $cookieStore.get('urlBanks');  //Bank Bhandara


    //CREATE

    $scope.createproduct = function () {

        var productDes = this.description;
        var productType = this.productType;

        if (this.description == null || this.productType == null) {
            alert('Please Select/Fill All Field');
        }
        else
        {
            var request = $http({
                method: "post",
                url: linkglobal + "/products",
                crossDomain: true,
                data: {
                    pDetails: productDes,
                    pType: productType,
                },
                headers: { 'Content-Type': 'application/json' },
            }).success(function (data) {


                alert('Data Saved On Server');



            }).error(function (err) {

                alert('Data Can Not Saved On Server');

            });

            this.description = "";
            this.productType = "";
            $scope.form.$setPristine();
        };
    }




    //CLEAR
    $scope.clearData = function () {
        $scope.description = "";
        $scope.productType = "";
        $scope.form.$setPristine();
    }




})//last