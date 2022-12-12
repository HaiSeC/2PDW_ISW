USERS.initializeEvents = function () {
  var re = / /;

  var correct = true;

  if ($('#signup input#Pass')) {
    $('#signup input#Pass').bind('keyup',function() {
      var validator = $('#signup input#Pass').val();
      if(re.test(validator)){
        $('#Error').text("Don't use spaces");
        correct = false;
      } else {
        $('#Error').text('');
        correct = true;
      }
    })
      
  }

  
  if (document.getElementById('addUserButton')) {
    document.getElementById('addUserButton').addEventListener('click', function () {

      const form = document.getElementById('signup');
      var user = {
        id: USERS.getLastId() + 1,
        name: form['FName'].value,
        username: form['username'].value,
        lastName: form['LName'].value,
        password: form['Pass'].value,
        desc: "",
        speed: "",
        phone: form['Number'].value
      };
      var checker = form['CPass'].value;
      if (user.name == '' || user.lastName == '' || user.phone == '' || user.username == '' || user.password == '') {
        $(document).ready(function () {
          $('#myInput').text("Incomplete Information. Please fill all the fields.");
          $('.modal').modal('show');
        });
      } else if (user.password.length < 8) {
        $(document).ready(function () {
          $('#myInput').text("Password too short. Please set a 8 characters long password or more");
          $('.modal').modal('show');
        });
      } else if (user.password != checker) {
        $(document).ready(function () {
          $('#myInput').text("Passwords doesn't match.");
          $('.modal').modal('show');
        });

      } else if (USERS.checkUsername(user.username)) {
        $(document).ready(function () {
          $('#myInput').text("Username already in use.");
          $('.modal').modal('show');
        });
      } else if (user.phone.length != 8) {
        $(document).ready(function () {
          $('#myInput').text("Wrong phone number format.");
          $('.modal').modal('show');
        });
      } else if (!correct) {
        $(document).ready(function () {
          $('#myInput').text("Invalid Password.");
          $('.modal').modal('show');
        });

      }else {
        user.password = window.btoa(user.password);
        USERS.addUser(user);
        localStorage.setItem('activeuser', user.id);
        document.location.href = './dashboard.html';
      }
    });
  }
}
USERS.initializeEvents();