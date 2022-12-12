USERS.initializeEvents = function() {

    USERS.setUserSesion(localStorage.getItem('activeuser'));
    USERS.signOut();

    const formInfo = document.getElementById('rideInfo');
    const formDate = document.getElementById('rideDate');
  
    if (JSON.parse(localStorage.getItem('justlook')) == true) {
        for (let i = 0; i < formInfo.elements.length; i++) {
            const element = formInfo.elements[i];
            element.setAttribute('disabled', '');
        }
        for (let j = 0; j < formDate.elements.length; j++) {
            const element = formDate.elements[j];
            element.setAttribute('disabled', '');
        }
        $('#save').css("display","none");
    } 
    
    if(localStorage.getItem('actualride')) {
        $('#sectionData').append('<a href="dashboard.html">Dashboard</a> > <a href="dashboard.html">Rides</a> > Edit');
        var ride = RIDES.getRide(localStorage.getItem('actualride'));
        formInfo['name'].value = ride['name'];
        formInfo['desc'].value = ride['description'];
        formInfo['start'].value = ride['start'];
        formInfo['end'].value = ride['end'];
        for (let i = 0; i < formDate.elements.length; i++) {
            const element = formDate.elements[i];
    
            switch (element.type) {
                case 'time':
                    if(element.name == 'dep'){
                        element.value = ride.departure;
                    } else {
                        element.value = ride.arrival;
                    }
                    break;
            
                case 'checkbox':
                    if(ride['days'].includes(element.value)) {
                        element.checked = true;
                    }
                    break;
            }
            
        }
    } else {
        $('#sectionData').append('<a href="dashboard.html">Dashboard</a> > <a href="dashboard.html">Rides</a> > Add');
        
    }

    $('#cancel').bind('click', function() {
        document.location.href = 'dashboard.html';
    })

    $("#save a").bind('click', function() {
 
        

    var ride = {
        id: RIDES.getLastId() + 1,
        userId: localStorage.getItem('activeuser'),
        name: formInfo['name'].value,
        description: formInfo['desc'].value,
        start: formInfo['start'].value,
        end: formInfo['end'].value,
        departure: null,
        arrival: null,
        days: [],
    }

    for (let i = 0; i < formDate.elements.length; i++) {
        const element = formDate.elements[i];

        switch (element.type) {
            case 'time':
                if(element.name == 'dep'){
                    ride.departure = element.value;
                } else {
                    ride.arrival = element.value;
                }
                break;
        
            case 'checkbox':
                if(element.checked) {

                    ride.days.push(element.value);
                }
                break;
        }
        
    }
    if (ride.arrival <= ride.departure) {
        $(document).ready(function () {
            $('#myInput').text("The ride can't ends before it starts.");
            $('.modal').modal('show');
          }); 

    } else if(ride.arrival != '' && ride.departure != ''   && ride.end != ''  && ride.name != ''  && ride.start != '' && ride.days.length != 0){
            if(localStorage.getItem('actualride')){
                ride.id = JSON.parse(localStorage.getItem('actualride'));
                RIDES.updateRide(ride);
            } else {
                RIDES.addRide(ride);
            }
            document.location.href = 'dashboard.html';
    } else {
        $(document).ready(function () {
            $('#myInput').text("Incomplete Information.");
            $('.modal').modal('show');
          }); 
    }

    });

    
    window.onunload = function() {
        if(localStorage.getItem('actualride')){
            localStorage.removeItem('actualride');
            localStorage.removeItem('justlook')
        }
    }
}

USERS.initializeEvents();