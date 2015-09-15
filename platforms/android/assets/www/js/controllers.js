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

.controller('shareCtrl', function ($scope, $stateParams) {

        $scope.content = [{
                "name": "About Us",
                "desc": "Dial2hire is a common call center for car rental companies / Transport companies where vehicle operators willing to get vehicles hired can add vehicles & customers looking for vehicle can directly contact service providers based on route, region and type of vehicle required. Anyone can Hire any vehicle from airport, railway station, hotels or point of attraction in city.We have extensive network of vendors(vehicle operators) across cities for sourcing vehicles almost all residential and commercial locations in Mumbai,Pune,Nasik and Navi Mumbai.No advance payment required for any vehicle booking, customer only needs to select location to travel and confirm vehicle & mobile number or just make a call to our call center 88560 88560 to hire affordable cab,taxi,truck or even Auto rickshaw."
        },
            {
                "name": "CAR Rental Services",
                "desc": "Dial2hire is known for India's best car rental or cab rental service company. We have many different vehicles registered with us for local or outstation services like Indica, Innova , scorpio, Bolero , Xylo, Swift Dzire, SUV and more Our primary goal to achieve Customer high satisfaction to give fair price and well maintain car. You can book online or call us on 088560 88560 for car rental in Mumbai, car on rent in Pune, car on rent in Delhi, car on rent in Nashik, car on rent in Bangalore, car rental in Chennai or other cities In India and Airport Cab Service in all major cities with cheap price."
        },
            {
                "name": "TRUCK Rental Services",
                "desc": "Dial2hire.com is a first call center dedicated for transporters & various customers across different industries. It is a place where you can find any types of heavy vehicle because we have huge network of commercial vehicles across the county which helps to fulfill your requirement on time for any types of commercial vehicle or transport services on phone call. We are market leader in transportation service in Mumbai and major location in India. We are one of the top players for Goods Transport Services in Mumbai and all major cities in India. We are expert in these industries and provide one place to full fill your every transportation requirement services, you can call us or visit online for hire truck, Tempo hire, Ashoklayland truck, trailers, LCV, ODC, Containers Handlers, Frozen Cargo, Frozen Food, Full Truck Load, Parcel Service, crane-forklift, Part Load, Canteen Dept, Heavy & Over Dimension, CFA Transportation, Exhibition activities, Food Carrier, FTL, Household Goods, Packing & Moving, Custom House Agent, Containers, Fright Liner, Tarpaulin Dealers, Steel consignments, Over Dimension Materials, Warehousing, Packers & Movers, Project & Handling, Prompt Service, Sensitive Item, Transport Clearing Forwarding, Truck Load, Toras transport vehicles, Vehicle Transportation and tempo of various sizes with many futures like closed or open type truck hire or tempo hire which is required in various industrial zones. Now you can Book any Truck on rent, tempo traveler service, Eicher 1190 truck hire, Tata lpt 16 ft truck, Eicher 14 ft or 17 ft truck on hire, Tata 407 for local or outstation hiring is available on phone call."
        },
            {
                "name": "TAXI Rental Services",
                "desc": "We are also in taxi rental services, you can book online or booking available on call for Black yellow taxi and cool cab taxi stand - we have vast network within city and available phone connectivity to all regional taxi stand to ensure the vehicle sourcing done for customers in nearby locality. Now you can book your taxi at home by call or online with Dial2hire.com"
        }, {
                "name": "AUTO Rental Services",
                "desc": "Auto rickshaw hire is a new service we have recently started where operators can add his auto for hiring and person willing to hire auto for full day or other meetings in city can be handled. With direct contacts of auto owner are shared."
        }];

        $scope.toggleGroup = function (group) {
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        };
        $scope.isGroupShown = function (group) {
            return $scope.shownGroup === group;
        };


    })
    .controller('accountCtrl', function ($scope, $stateParams) {

        $scope.callcc = function () {
            window.open('tel:88560 88560', '_system');
        };
    })

.controller('loginCtrl', function ($scope, $stateParams, $location) {

        $scope.login = function () {
            $location.path("/app/home");
        };

        $scope.opensignuppage = function () {
            $location.path("/app/signup");
        };
    })
    .controller('otpCtrl', function ($scope, $stateParams, $location, MyServices, $ionicLoading) {


        $scope.otpdata = {};
        $scope.otpdata.otp = "";
        $scope.errormessage = "";
        var otp = "";

        var user = $.jStorage.get("user");
        $.jStorage.set("user", {});

        var smssuccess = function () {
            console.log(data);
        };

        $scope.sendotp = function () {
            otp = Math.floor((Math.random() * 999999) + 100000);
            var message = "Dear customer, please use this OTP to login to the Dial2Hire app : " + otp;
            MyServices.sendsms(user.contact, message).success(smssuccess);
        };

        $scope.sendotp();

        var signupsuccess = function (data, status) {
            $ionicLoading.hide();
            $.jStorage.set("user", data);
            $location.path("/app/home");
        };

        var signuperror = function (data, status) {
            $scope.errormessage = "Theres seems to be an error in the server";
        };

        $scope.verifyotp = function () {
            if ($scope.otpdata.otp == otp) {
                $ionicLoading.show({
                    template: 'Signing in...'
                });
                MyServices.signupuser(user).success(signupsuccess).error(signuperror);

            } else {
                $scope.errormessage = "The OTP is invalid";
            };

        };
    })
    .controller('signupCtrl', function ($scope, $stateParams, $location, MyServices, $ionicLoading) {

        $scope.signupdata = {};
        $scope.signupdata.fullname = "";
        $scope.signupdata.contact = "";

        $scope.errormessage = "";

        /*var signupsuccess = function (data, status) {
            $ionicLoading.hide();
            if (data == "false") {
                $scope.errormessage = "Number already registered";
            } else {
                $.jStorage.set("user", data);
                $location.path("/app/otp");
                console.log(data);
            };
        };*/

        /*var signuperror = function (data, status) {
            $scope.errormessage = "There was some error signing in, please try again";
        };*/

        $scope.signup = function () {
            if ($scope.signupdata.fullname != '' && $scope.signupdata.contact != "") {
                $.jStorage.set("user", $scope.signupdata);
                $location.path("/app/otp");
                //MyServices.signupuser($scope.signupdata).success(signupsuccess).error(signuperror);
            } else {
                $scope.errormessage = "Please enter both fields";
            };
        };
    })
    .controller('searchCtrl', function ($scope, $stateParams, $location, $http, $cordovaGeolocation, $ionicLoading) {


        $scope.input = {};
        $scope.input.placeinput;

        $scope.gPlace;

        $ionicLoading.show({
            template: 'Fetching Location...'
        });

        var posOptions = {
            timeout: 10000,
            enableHighAccuracy: true
        };

        $scope.loca = {};
        $scope.currlocation = "Enter Your Location";

        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
                var lat = position.coords.latitude;
                var long = position.coords.longitude;

                var latlng = new google.maps.LatLng(lat, long);
                geocoder = new google.maps.Geocoder();
                geocoder.geocode({
                    'latLng': latlng
                }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            console.log(results[0]);
                            $scope.currlocation = results[0].formatted_address;
                            $ionicLoading.hide();
                        } else {
                            alert("No results found");
                            $ionicLoading.hide();
                        }
                    } else {
                        alert("Geocoder failed due to: " + status);
                        $ionicLoading.hide();
                    }
                });

            }, function (err) {
                alert("Unable to get your location");
                $ionicLoading.hide();
            });

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
                value: "tempo"
    },
            {
                id: 3,
                selected: false,
                icon: "icon-auto",
                image: "img/rickshaw_display_pic.png",
                value: "rickshaw"
    },
            {
                id: 4,
                selected: false,
                icon: "icon-taxi",
                image: "img/taxi_display_pic.png",
                value: "taxi"
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
    .controller('vehiclelistCtrl', function ($scope, $stateParams, $location, MyServices, $ionicLoading, $ionicSideMenuDelegate, $ionicPlatform, $cordovaDevice, $http, $cordovaGeolocation, $ionicPopup, $ionicListDelegate, $interval, $filter) {

        //////PAGE SETUP///////
        //CAN DRAG CONTENT FOR MENU - TRUE
        $ionicSideMenuDelegate.canDragContent(true);
        //TAB TO SHOW VARIABLE
        $scope.tab = true;
        ///////////////////////
        $ionicListDelegate.canSwipeItems(false);
        console.log($ionicListDelegate.canSwipeItems());


        //CHANGE TAB
        $scope.changetab = function () {
            $scope.tab = !$scope.tab;
        };

        //FETCH TYPE OF CAR AND LOCATION DETAILS
        var type = $stateParams.type;
        $scope.imagepath = "http://dial2hire.com/images/" + type + "_images/";
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

        $scope.icon = {
            url: "img/" + type + "_icon.ico"
        };
        /////MARKERS///////////
        /*var setmarkers = function () {
            $scope.markers = [];
            for (var q = 0; q < $scope.vehicledata.length; q++) {
                $scope.markers.push({
                    "id": $scope.vehicledata[q].vehicleid,
                    "location": {
                        "latitude": $scope.vehicledata[q].latitude,
                        "longitude": $scope.vehicledata[q].longitude
                    },
                    "icon": {
                        url: "img/" + type + "_icon.ico"
                    }

                });
            };
        };*/

        $scope.con = function () {
            console.log("marker clicked");
        };
        ////////FUNTION TO GET THE LIST OF VEHICLES/////
        var getvehiclesbytypesuccess = function (data, status) {
            console.log(data);
            $scope.vehicledata = data;
            for (var q = 0; q < $scope.vehicledata.length; q++) {
                $scope.vehicledata[q].call = false;
                $scope.vehicledata[q].icon = {
                    url: "img/" + type + "_icon.ico"
                };
            };
            $ionicLoading.hide();
            if (mapset == 0) {
                setmap();
                mapset = 1;
            };

            //setmarkers();
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
                enableHighAccuracy: true
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

        /*INQUIRY*/

        //SEND SMS
        var smssuccess = function (data, status) {
            console.log(data);
        };

        var timerpopup = function () {
            var tPopup = $ionicPopup.show({
                templateUrl: 'templates/timer.html',
                title: "Please wait for driver to  call...",
                scope: $scope,
                buttons: []
            });
            $interval(function () {
                tPopup.close();
            }, 3000);
        };


        //CALL THE VENDOR
        $scope.callvendor = function (vehicle) {
            var drivernumber = vehicle.drivercontact;
            var vendornumber = vehicle.vendorcontact;

            //CALL THE vendornumber HERE

        };


        //SEND INQUIRY
        $scope.inquirydata = {};

        $scope.inquirydata.date = new Date();

        var gotologin = function () {
            var loginpopup = $ionicPopup.show({
                template: '',
                title: 'You need to Login',
                subTitle: 'in order to send an Inquiry',
                scope: $scope,
                buttons: [
                    {
                        text: "cancel"
                    },
                    {
                        text: '<b>Login</b>',
                        type: 'button-energized',
                        onTap: function (e) {
                            $location.path("/app/signup");
                        }
      }

    ]
            });
        };

        $scope.sendinquiry = function (vehicle) {

            var user = $.jStorage.get("user");

            //FIND NUMBERS
            var drivernumber = vehicle.drivercontact;
            var vendornumber = vehicle.vendorcontact;

            if ($.jStorage.get("user")) {
                if ($.jStorage.get("user").contact) {


                    if (vehicle.call == false) {
                        var myPopup = $ionicPopup.show({
                            templateUrl: 'templates/inquiryform.html',
                            title: 'Send Inquiry',
                            scope: $scope,
                            buttons: [
                                {
                                    text: 'Cancel'
                    },
                                {
                                    text: '<b>Send</b>',
                                    type: 'button-energized',
                                    onTap: function (e) {

                                        $ionicLoading.show({
                                            template: 'Sending...'
                                        });

                                        if ($scope.inquirydata.from == undefined) {
                                            $scope.inquirydata.from = "Not Mentioned";
                                        };
                                        if ($scope.inquirydata.to == undefined) {
                                            $scope.inquirydata.to = "Not Mentioned";
                                        };
                                        $scope.inquirydata.date = $filter('date')($scope.inquirydata.date, "dd-MM-yyyy");

                                        var message = "You have recived an inquiry from: " + user.name + " Phone:- " + user.contact + ". From:" + $scope.inquirydata.from + " To: " + $scope.inquirydata.to + " on: " + $scope.inquirydata.date;

                                        var fromloc = $scope.inquirydata.from;
                                        var toloc = $scope.inquirydata.to;

                                        var smssuccess = function (data, status) {
                                            $ionicLoading.hide();
                                            console.log(data);
                                            timerpopup();
                                        };

                                        var inquirysuccess = function (data, status) {
                                            if (data == "true") {
                                                MyServices.sendsms(drivernumber, message).success(smssuccess);
                                                MyServices.sendsms(vendornumber, message).success(smssuccess);
                                            } else {
                                                $ionicLoading.hide();
                                                alert("There is some error is the server")
                                            };
                                        };

                                        var ipsuccess = function (data, status) {
                                            console.log(fromloc);
                                            MyServices.sendinquiry(vehicle.vehicleid, data.ip, fromloc, toloc).success(inquirysuccess);
                                        };
                                        MyServices.getip().success(ipsuccess);


                                        vehicle.call = true;
                                        vehicle.icon = {
                                            url: "img/" + type + "_icon_call.ico"
                                        };

                                        $scope.inquirydata = {};

                                        // timerpopup();

                                    }
      }
    ]
                        });
                    } else {

                        //CALL
                        window.open('tel:' + vendornumber, '_system');

                    };

                } else {
                    gotologin();
                };
            } else {
                gotologin();
            };





        };

    });