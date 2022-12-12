USERS.initializeEvents = function() {
    USERS.setUserSesion(localStorage.getItem('activeuser'));
    RIDES.loadRides(localStorage.getItem('activeuser'));
    USERS.signOut();
    
    $('.edit').bind('click', function() {
        
        var id = $(this).attr("value");
        localStorage.setItem('actualride', id);
        document.location.href = 'agregar_ver_rides.html'
    });

    $('.delete').bind('click', function() {
        
        var id = $(this).attr("value");
        RIDES.deleteRide(id);
        document.location.href = 'dashboard.html';
    })
}
USERS.initializeEvents();