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
    .controller('searchCtrl', function ($scope, $stateParams, $location, $http) {


        $scope.input = {};
        $scope.input.placeinput;

        $scope.gPlace;

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
            var input = $('#inp').val();
            console.log(input);
            for (var w = 0; w < $scope.vehicletypes.length; w++) {
                if ($scope.vehicletypes[w].selected == true) {
                    var type = $scope.vehicletypes[w].value
                };
            };
            $location.path("/app/vehiclelist/" + type + "/" + input);
        };

    })
    .controller('vehiclelistCtrl', function ($scope, $stateParams, $location, MyServices, $ionicLoading, $ionicSideMenuDelegate, $ionicPlatform, $cordovaDevice, $http, $cordovaGeolocation) {

        //////PAGE SETUP///////
        //CAN DRAG CONTENT FOR MENU - TRUE
        $ionicSideMenuDelegate.canDragContent(true);
        //TAB TO SHOW VARIABLE
        $scope.tab = false;
        ///////////////////////

        //FETCH TYPE OF CAR AND LOCATION DETAILS
        var type = $stateParams.type;
        var location = $stateParams.location;
        console.log(location);

        //SHOW LOADING SIGN
        $ionicLoading.show({
            template: 'Fetching Vehicles...'
        });

        //VARIABLE INITILIZATION
        var mapset = 0;

        /////////////////////////////MAP/////////////////////////////
        var setmap = function () {
            var lat = $scope.location2.latitude + (($scope.location1.latitude - $scope.location2.latitude) / 2);
            var lng = $scope.location2.longitude + (($scope.location1.longitude - $scope.location2.longitude) / 2);
            console.log(lat);
            $scope.map = {
                center: {
                    latitude: lat,
                    longitude: lng
                },
                zoom: 13
            };
        };

        ////RECTANGLE////
        var setbounds = function () {
            $scope.bounds = {
                ne: $scope.location1,
                sw: $scope.location2
            };
            $scope.events = {
                "bounds_changed": function (e) {
                    $scope.ne = e.getBounds().getNorthEast();
                    $scope.sw = e.getBounds().getSouthWest();
                    $scope.location1 = {
                        latitude: $scope.ne.G,
                        longitude: $scope.ne.K
                    };
                    $scope.location2 = {
                        latitude: $scope.sw.G,
                        longitude: $scope.sw.K
                    };
                    MyServices.getvehiclesbytype(type, $scope.location1, $scope.location2).success(getvehiclesbytypesuccess);
                }
            };
        };
        /////MARKERS///////////
        var setmarkers = function () {
            $scope.markers = [];
            for (var q = 0; q < $scope.vehicledata.length; q++) {
                $scope.markers.push({
                    "id": (q + 1),
                    "location": {
                        "latitude": $scope.vehicledata[q].latitude,
                        "longitude": $scope.vehicledata[q].longitude
                    },
                    "icon": {url: "img/"+type+".ico"}

                });
            };
        };
        ////////FUNTION TO GET THE LIST OF VEHICLES/////
        var getvehiclesbytypesuccess = function (data, status) {
            console.log(data);
            $scope.vehicledata = data;
            $ionicLoading.hide();
            if (mapset == 0) {
                setmap();
                mapset = 1;
            };

            setmarkers();
            setbounds();

        };
        var getlist = function () {
            console.log($scope.location1, $scope.location2);
            MyServices.getvehiclesbytype(type, $scope.location1, $scope.location2).success(getvehiclesbytypesuccess);
        };
        ///////////////////////////

        //GRAB RADIUS POSITIONS
        $scope.location1 = {};
        $scope.location2 = {};

        if (location == "") {
            var posOptions = {
                timeout: 10000,
                enableHighAccuracy: false
            };
            $cordovaGeolocation
                .getCurrentPosition(posOptions)
                .then(function (position) {
                    var lat = position.coords.latitude;
                    var long = position.coords.longitude;
                    console.log(lat);
                    $scope.location1.latitude = lat + 0.0300;
                    $scope.location1.longitude = long + 0.0300;
                    $scope.location2.latitude = lat - 0.0300;
                    $scope.location2.longitude = long - 0.0300;

                    getlist();

                }, function (err) {
                    alert("Unable to get your location");
                    $ionicLoading.hide();
                });
        } else {
            $http.get("http://maps.google.com/maps/api/geocode/json", {
                params: {
                    address: location,
                    sensor: false
                }
            }).success(function (data, status) {
                $scope.location1.latitude = data.results[0].geometry.viewport.northeast.lat;
                $scope.location1.longitude = data.results[0].geometry.viewport.northeast.lng;
                $scope.location2.latitude = data.results[0].geometry.viewport.southwest.lat;
                $scope.location2.longitude = data.results[0].geometry.viewport.southwest.lng;
                getlist();
            });
        };


        //////RECTANGLE/////////////////
        $scope.boundsChanged = function (event) {
            $scope.ne = this.getBounds().getNorthEast();
            $scope.sw = this.getBounds().getSouthWest();
            console.log($scope.ne);
            console.log($scope.sw);
        };

        //



        /* $scope.initialize = function () {
             var myLatlng = new google.maps.LatLng(43.07493, -89.381388);

             var mapOptions = {
                 center: myLatlng,
                 zoom: 16,
                 mapTypeId: google.maps.MapTypeId.ROADMAP
             };
             var mapo = new google.maps.Map(document.getElementById("mapo"));
         };*/




        ////////////////MAP VARIABLES////////////
        $scope.markers = [];

        //CIRCLE
        $scope.circles = [
            {
                id: 1,
                center: {
                    "latitude": 18.9725,
                    "longitude": 72.8240
                },
                radius: 500000,
                stroke: {
                    color: '#08B21F',
                    weight: 2,
                    opacity: 1
                },
                fill: {
                    color: '#08B21F',
                    opacity: 0.5
                },
                geodesic: true, // optional: defaults to false
                draggable: true, // optional: defaults to false
                clickable: true, // optional: defaults to true
                editable: true, // optional: defaults to false
                visible: true, // optional: defaults to true
                control: {}
            }
        ];



        $scope.disableTap = function () {
            console.log("focus");
            container = document.getElementsByClassName('pac-container');
            // disable ionic data tab
            angular.element(container).attr('data-tap-disabled', 'true');
            // leave input field if google-address-entry is selected
            angular.element(container).on("click", function () {
                document.getElementById('inp').blur();
            });
        };

        var input = document.getElementById('inp');
        var options = { //options for autocomplete object
            types: ['geocode']
        };
        //autocomplete = new google.maps.places.Autocomplete(input, options);

        $scope.boundsChanged = function (event) {
            console.log("CHANGED")
        };



    });