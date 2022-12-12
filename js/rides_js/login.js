USERS.initializeEvents = function () {
    
    if (document.getElementById('logbutton')) {
        document.getElementById('logbutton').addEventListener("click", function () {
            if (document.getElementById('nameU') && document.getElementById('passU')) {
                var check = null;
                USERS.clear();
                check = USERS.checkUser(document.getElementById('nameU').value, window.btoa(document.getElementById('passU').value));
                if (check == null) {
                    $(document).ready(function () {
                        $('#myInput').text("Wrong Login Data");
                        $('.modal').modal('show');
                    });
                } else {
                        localStorage.setItem('activeuser', check.id);
                        document.location.href = 'dashboard.html';
                }
            }
        })
    }
    USERS.signOut();
}
USERS.initializeEvents();