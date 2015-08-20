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


        $scope.vehicletypes = [{
                id: 1,
                selected: true,
                icon: "icon-car",
                image: "img/car_display_pic.png",
                value: "tourist"
    },
            {
                id: 2,
                selected: false,
                icon: "icon-truck",
                image: "img/truck_display_pic.png",
                value: "tourist"
    },
            {
                id: 3,
                selected: false,
                icon: "icon-auto",
                image: "img/rickshaw_display_pic.png",
                value: "transporter"
    },
            {
                id: 4,
                selected: false,
                icon: "icon-taxi",
                image: "img/taxi_display_pic.png",
                value: "transporter"
    }];

        $scope.showimage = $scope.vehicletypes[0].image;

        $scope.selectvehicle = function (id) {
            for (var q = 0; q < $scope.vehicletypes.length; q++) {
                if (id == $scope.vehicletypes[q].id) {
                    $scope.vehicletypes[q].selected = true;
                    $scope.showimage = $scope.vehicletypes[q].image;
                } else {
                    $scope.vehicletypes[q].selected = false;
                };
            };
        };

        $scope.getvehicles = function (type) {
            for (var w = 0; w < $scope.vehicletypes.length; w++) {
                if ($scope.vehicletypes[w].selected == true) {
                    var type = $scope.vehicletypes[w].value
                };
            };
            $location.path("/app/vehiclelist/" + type);
        };
    })
    .controller('vehiclelistCtrl', function ($scope, $stateParams, $location, MyServices, $ionicLoading, $ionicSideMenuDelegate) {

        //PAGE SETUP
        //CAN DRAG CONTENT FOR MENU - TRUE
        $ionicSideMenuDelegate.canDragContent(true);
        console.log($ionicSideMenuDelegate.canDragContent(true));
        //TAB TO SHOW VARIABLE
        $scope.tab = false;

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

        $scope.map = {
            center: {
                latitude: 18.9750,
                longitude: 72.8258
            },
            zoom: 8
        };


    });