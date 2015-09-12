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
        sendsms: function (number,  message) {
            return $http.get("http://alerts.solutionsinfini.com/api/web2sms.php?workingkey=15459g72ev3rezt7938tp&username=equalaccts&password=vudUhE$up@7u&to="+number+"&sender=DIALTO&message="+message, {
                params: {}
            });
        },
    }
});