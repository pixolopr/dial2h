// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'myservices','uiGmapgoogle-maps','ngCordova'])/*,'google.places'*/

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.search', {
        url: '/search',
        views: {
            'menuContent': {
                templateUrl: 'templates/search.html',
                controller: 'searchCtrl'
            }
        }
    })

    .state('app.account', {
            url: '/account',
            views: {
                'menuContent': {
                    templateUrl: 'templates/account.html',
                    controller: 'accountCtrl'
                }
            }
        })
        .state('app.share', {
            url: '/share',
            views: {
                'menuContent': {
                    templateUrl: 'templates/share.html',
                    controller: 'shareCtrl'
                }
            }
        })
        .state('app.signup', {
            url: '/signup',
            views: {
                'menuContent': {
                    templateUrl: 'templates/signup.html',
                    controller: 'signupCtrl'
                }
            }
        })
        .state('app.otp', {
            url: '/otp',
            views: {
                'menuContent': {
                    templateUrl: 'templates/otp.html',
                    controller: 'otpCtrl'
                }
            }
        })
        .state('app.login', {
            url: '/login',
            views: {
                'menuContent': {
                    templateUrl: 'templates/login.html',
                    controller: 'loginCtrl'
                }
            }
        })
        .state('app.vehiclelist', {
            url: '/vehiclelist/:type/:location',
            views: {
                'menuContent': {
                    templateUrl: 'templates/vehiclelist.html',
                    controller: 'vehiclelistCtrl'
                }
            }
        });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/search');
})
.directive('googleplace', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {country: 'in'}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                scope.$apply(function() {
                    model.$setViewValue(element.val());                
                });
            });
        }
    };
})
 .directive('reverseGeocode', function () {
        return {
            restrict: 'E',
            template: '<div></div>',
            link: function (scope, element, attrs) {
                var geocoder = new google.maps.Geocoder();
                var latlng = new google.maps.LatLng(attrs.lat, attrs.lng);
                geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            element.text(results[1].formatted_address);
                        } else {
                            element.text('Location not found');
                        }
                    } else {
                        element.text('Geocoder failed due to: ' + status);
                    }
                });
            },
            replace: true
        }
    });