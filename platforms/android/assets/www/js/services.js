//var adminurl = "http://localhost/d2hBackend/index.php/";
var adminurl = "http://pixolo.co.in/d2hBackend/index.php/";
var myservices = angular.module('myservices', [])

.factory('MyServices', function ($http, $location) {

    return {
        getvehiclesbytype: function (type, location) {
            return $http.get(adminurl + "vehicle_info/vehicleinfo", {
                params: {
                    location: location,
                    type: type
                }
            });
        },
        signupuser: function(userdetails)
        {
            return $http.get(adminurl + "users/addusers", {
                params: {
                    data: userdetails
                }
            });
        },
    }
});