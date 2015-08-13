angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $ionicNavBarDelegate) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('shareCtrl', function ($scope, $stateParams) {})
    .controller('accountCtrl', function ($scope, $stateParams) {})

.controller('loginCtrl', function ($scope, $stateParams, $location) {

        $scope.login = function () {
            $location.path("/app/home");
        };

        $scope.opensignuppage = function () {
            $location.path("/app/signup");
        };
    })
    .controller('otpCtrl', function ($scope, $stateParams, $location) {
        $scope.verifyotp = function () {
            $location.path("/app/home");
        };
    })
    .controller('signupCtrl', function ($scope, $stateParams, $location, MyServices) {

        $scope.signupdata = {};

        var signupsuccess = function (data, status) {
            if (data == "false") {
                alert("Number already registered");
            } else {
                $location.path("/app/otp");
                console.log(data);
            };
        };

        $scope.signup = function () {
            MyServices.signupuser($scope.signupdata).success(signupsuccess);
        };
    })
    .controller('searchCtrl', function ($scope, $stateParams, $location) {
        $scope.getvehicles = function (type) {
            $location.path("/app/vehiclelist/" + type);
        };
    })
    .controller('vehiclelistCtrl', function ($scope, $stateParams, $location, MyServices, $ionicLoading, $ionicSideMenuDelegate) {

        //PAGE SETUP
        //CAN DRAP CONTENT FOR MENU - TRUE
        $ionicSideMenuDelegate.canDragContent(true);
        console.log($ionicSideMenuDelegate.canDragContent(true));

        var type = $stateParams.type;

        $ionicLoading.show({
            template: 'Fetching Vehicles...'
        });

        var getvehiclesbytypesuccess = function (data, status) {
            console.log(data);
            $scope.vehicledata = data;
            $ionicLoading.hide();
        };
        var location = {
            latitude: "19.50",
            longitude: "23.50"
        };
        MyServices.getvehiclesbytype(type, location).success(getvehiclesbytypesuccess);
    });