var USERS = {
    property: 10,

    initializeEvents: function () {

    },



    addUser: function (user) {
        var users = [];
        if (localStorage.getItem('users')) {
            users = JSON.parse(localStorage.getItem('users'));
        }
        users.push(user);
        localStorage.removeItem('users');
        localStorage.setItem('users', JSON.stringify(users));
        USERS.clear();
    },

    updateUser: function (userUpdate) {
        var users = [];
        if (localStorage.getItem('users')) {
            users = JSON.parse(localStorage.getItem('users'));
        }

        users.forEach(user => {
            if (user['id'] == userUpdate['id']) {
                user['name'] = userUpdate['name'];
                user['lastName'] = userUpdate['lastName'];
                user['speed'] = userUpdate['speed'];
                user['desc'] = userUpdate['desc'];
            }
        })
        localStorage.removeItem('users');
        localStorage.setItem('users', JSON.stringify(users));
        USERS.clear();
    },

    clear: function () {
        $('input').val("");
    },

    checkUser: function (userNameLog, pass, id = null) {

        var userInfo = null;
        var users = [];
        if (localStorage.getItem('users')) {
            users = JSON.parse(localStorage.getItem('users'));
        }

        users.forEach(user => {

            if ((user['username'] == userNameLog && user['password'] == pass)||(user['id'] == id)) {
 
                userInfo = user;
            }
        })

        return userInfo;
    },
    checkUsername: function (username) {
        var exists = false;
        var users = [];
        if (localStorage.getItem('users')) {
            users = JSON.parse(localStorage.getItem('users'));
        }

        users.forEach(user => {
            if (user['username'] == username) {
                exists = true;
            }
        })

        return exists;
    },

    setUserSesion: function (id) {

        if (id != null) {
            var users = [];
            if (localStorage.getItem('users')) {
                users = JSON.parse(localStorage.getItem('users'));
            }

            users.forEach(user => {

                if (user['id'] == id) {
                    $('#user p').text(user['username']);
                }
            })
        } else if (JSON.parse(localStorage.getItem('justlook')) == true) {
            document.location.href = "/sections/login.html"
        }else {
            document.location.href = "../index.html"
        }
    },

    getUserName: function(id) {
        var users = [];
        let name;
        if (localStorage.getItem('users')) {

            users = JSON.parse(localStorage.getItem('users'));
            users.forEach(user => {
                if (user['id'] == id) {
                    name = user['username'];
                }
            })
        }
        return name;
    },

    getLastId: function () {
        var users = [];
        let id = 0;
        if (localStorage.getItem('users')) {

            users = JSON.parse(localStorage.getItem('users'));
            users.forEach(user => {
                if (user.id >= id) {
                    id = user.id;
                }
            })
        }
        return id;
    },

    signOut: function () {
        if ($('#signoutBtn')) {
            $('#signoutBtn').bind('click', function () {
                localStorage.removeItem('activeuser');
                document.location.href = '../index.html';
            });
        }
    }


};

USERS.initializeEvents();


var RIDES = {
    property: 10,

    initializeEvents: function () {

    },

    loadRides: function (userID) {
        var rides = [];
        if (localStorage.getItem('rides')) {
            rides = JSON.parse(localStorage.getItem('rides'));
        }
        var row;
        if (rides.length == 0) {
            row = "<tr><td>No rides matching</td></tr>";

            // agregar a la tabla
            var table = document.getElementById("rides_table");
            table.innerHTML = table.innerHTML + row;

        } else {
            row = "<tr><td>User</td><td>Start</td><td>End</td><td></td></tr>";
            var table = document.getElementById("rides_table");
            table.innerHTML = table.innerHTML + row;

            rides.forEach(ride => {
                if (ride['userId'] == userID) {
                    RIDES.fillTable(ride);
                }
            });
        }




    },
    getRide: function(rideId) {
        var rides = [];
        var rideInfo;
        if(localStorage.getItem('rides')) {
            rides = JSON.parse(localStorage.getItem('rides'));
        }
        rides.forEach(ride => {
            if(ride['id'] == rideId) {
                rideInfo = ride;
            }
        })
        return rideInfo;
    },

    findRides: function (start, end) {

        var rides = [];
        if (localStorage.getItem('rides')) {
            rides = JSON.parse(localStorage.getItem('rides'));
        }
        var ridesFoundIt = [];

        rides.forEach(ride => {
            if (ride['start'] == start && ride['end'] == end) {
                ridesFoundIt.push(ride);
            }
        });

        var row;
        if (ridesFoundIt.length == 0) {
            row = "<tr><td>No rides matching </td></tr>";

            // agregar a la tabla
            //var table = document.getElementById("rides_table");
            //table.innerHTML = table.innerHTML + row;
            $('#rides_table').append(row);

        } else {
            row = "<tr><td>User</td><td>Start</td><td>End</td><td></td></tr>";
            //var table = document.getElementById("rides_table");
            //table.innerHTML = table.innerHTML + row;
            $('#rides_table').append(row);

            ridesFoundIt.forEach(match => {
                RIDES.fillTable(match, true);
            })

        }




    },

    deleteRide: function(id) {
        var rides = [];
        var newRides = [];
        if(localStorage.getItem('rides')){
            rides = JSON.parse(localStorage.getItem('rides'));
        }
        rides.forEach(ride => {
            if(ride['id'] != id){
                newRides.push(ride);
            }
        });
        localStorage.removeItem('rides');
        localStorage.setItem('rides', JSON.stringify(newRides));

    },

    updateRide: function (rideUpdate) {
        var rides = [];
        if (localStorage.getItem('rides')) {
            rides = JSON.parse(localStorage.getItem('rides'));
        }

        rides.forEach(ride => {
            if (ride['id'] == rideUpdate['id']) {
                ride['name'] = rideUpdate['name'];
                ride['arrival'] = rideUpdate['arrival'];
                ride['departure'] = rideUpdate['departure'];
                ride['description'] = rideUpdate['description'];
                ride['end'] = rideUpdate['end'];
                ride['start'] = rideUpdate['start'];
                ride['days'] = rideUpdate['days'];
            }
        })
        localStorage.removeItem('rides');
        localStorage.setItem('rides', JSON.stringify(rides));
    },

    fillTable: function (ride, dashboard) {
        if(dashboard == true) {
            var row = "<tr><td>" + USERS.getUserName(ride['userId']) + "</td><td>" + ride.start + "</td><td>" + ride.end + "</td><td>" + "<a  class='edit' value='"+ ride['id'] +"'>View</a> </tr>";

        } else {
            var row = "<tr><td>" + USERS.getUserName(ride['userId']) + "</td><td>" + ride.start + "</td><td>" + ride.end + "</td><td>" + "<a  class='edit' value='"+ ride['id'] +"'>Edit</a> / <a class='delete' value='"+ ride['id'] +"'>Delete</a></td></tr>";

        }
        
        $('#rides_table').append(row);
    },

   
    clear: function () {
       
    },

    addRide: function (ride) {
        var rides = [];
        if (localStorage.getItem('rides')) {
            rides = JSON.parse(localStorage.getItem('rides'));
        }
        rides.push(ride);
        localStorage.removeItem('rides');
        localStorage.setItem('rides', JSON.stringify(rides));

    },

    resetTabe: function(){
        var table = document.getElementById("rides_table");
        var rowL = table.rows.length;

        for( var i = 0; i < rowL; i++ ){
            table.deleteRow(0);
        }
        
    },

    getLastId: function () {
        var rides = [];
        let id = 0;
        if (localStorage.getItem('rides')) {

            rides = JSON.parse(localStorage.getItem('rides'));
            rides.forEach(ride => {
                if (ride.id >= id) {
                    id = ride.id;
                }
            })
        }
        return id;
    },


}
RIDES.initializeEvents();