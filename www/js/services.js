//var adminurl = "http://localhost/d2hBackend/index.php/";
var adminurl = "http://pixolo.co.in/d2hBackend/index.php/";
var myservices = angular.module('myservices', [])

.factory('MyServices', function ($http, $location) {

    return {
        getvehiclesbytype: function (type, location1, location2) {
            return $http.get(adminurl + "vehicle_details/vehicleinfo", {
                params: {
                    location1: location2,
                    location2: location1,
                    type: type
                }
            });
        },
        signupuser: function (userdetails) {
            return $http.get(adminurl + "users/addusers", {
                params: {
                    data: userdetails
                }
            });
        },
    }
});