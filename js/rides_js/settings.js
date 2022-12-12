USERS.initializeEvents = function() {
    USERS.setUserSesion(localStorage.getItem('activeuser'));
    USERS.signOut();
    const form = document.getElementById("dataForm");

    var userInfo = USERS.checkUser(null, null, localStorage.getItem('activeuser'));
    
    form['NameI'].value = userInfo.name;
    form['LName'].value = userInfo.lastName;
    form['speed'].value = userInfo.speed;
    form['description'].value = userInfo.desc;
    $('#cancel').bind('click', function() {
        document.location.href = 'dashboard.html';
    })
    $('#save').bind('click', function() {
        var Id = localStorage.getItem('activeuser');
        var Name = form['NameI'].value;
        var LName = form['LName'].value;
        var Speed = form['speed'].value;
        var Desc = form['description'].value;

        if(Name.length == 0 || LName.length == 0 ) {
            $(document).ready(function () {
                $('#myInput').text("Neither Name or Lastname could be blank.");
                $('.modal').modal('show');
              }); 
        } else {
            
        var userUpdate = {
            id: Id,
            name: Name,
            lastName: LName,
            speed: Speed,
            desc: Desc
        }

        USERS.updateUser(userUpdate);
        document.location.href = 'dashboard.html'
        }

    })
}
USERS.initializeEvents();