USERS.initializeEvents = function () {
    var id = 0;
    if (localStorage.getItem('activeuser') != null) {
        id = localStorage.getItem('activeuser');
    }
    USERS.setUserSesion(id);
    USERS.signOut();
    var user = null;


    if (localStorage.getItem('activeuser')) {
        user = JSON.parse(localStorage.getItem('activeuser'));
    }
    if (user != null) {
        document.getElementById('welcome').style.display = "none";
        document.getElementById('tab').style.display = "flex";
    } else {
        document.getElementById('welcome').style.display = "flex";
        document.getElementById('tab').style.display = "none";
    }
    if (document.getElementById('findBtn')) {
        document.getElementById('findBtn').addEventListener("click", function () {
            var start = document.getElementById('start').value;
            var end = document.getElementById('end').value
            if (start && end) {

                USERS.clear();
                RIDES.resetTabe();
                RIDES.findRides(start, end);
                $('.edit').bind('click', function () {
                    var id = $(this).attr("value");
                    localStorage.setItem('actualride', id);
                    localStorage.setItem('justlook', true);
                    document.location.href = '/sections/agregar_ver_rides.html'
                })
            } else {
                $(document).ready(function () {
                    $('#myInput').text("Complete all fields to find a ride");
                    $('.modal').modal('show');
                });
            }
        })

    }





}
USERS.initializeEvents();
