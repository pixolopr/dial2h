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
        sendsms: function (number, message) {
            return $http.get("http://alerts.solutionsinfini.com/api/web2sms.php?workingkey=15459g72ev3rezt7938tp&username=equalaccts&password=vudUhE$up@7u&to=" + number + "&sender=DIALTO&message=" + message, {
                params: {}
            });
        },
        getip: function () {
            return $http.get("http://ipv4.myexternalip.com/json", {
                params: {}
            });

        },
        sendinquiry: function (id, ip, from, to) {
            console.log(from);
            var user = $.jStorage.get("user");

            return $http.get(adminurl + "inquiry/inquiry", {
                params: {
                    data: {
                        vehicleid: id,
                        userid: user.id,
                        ip: ip,
                        fromloc: from,
                        toloc: to
                    }
                }
            });
        },
    }
});