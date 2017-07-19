'use strict';

window.onload = function() {
  var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
  };
  
  window.document.body.style.background = 'tomato';
  
  var weather = document.getElementById("weather");
  var output = document.getElementById("out");
  
  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
  }
              
  function success(position) {
    var crd = position.coords;
    
    var latitude  = crd.latitude;
    var longitude = crd.longitude;
    
    var api = `http://api.openweathermap.org/data/2.5/weather?`;
    api += `lat=35`;
    api += `&lon=139`;
    api += `&appid=eb7cf282541ad0aeab5e0e609161a441`;
    
    console.log(api);
    
    /* global fetch */
    fetch(api)
    .then(function(response) {
      console.log(response.json());
      return response.json();
    }).then(function(json) {
      console.log('parsed json', json);
    }).catch(function(ex) {
      console.log('parsing failed', ex);
    });
  
    output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
  
    /* global Image */
    var img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=480x320&sensor=false";
  
    output.appendChild(img);
  
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    output.innerHTML = "Unable to retrieve your location";
  }
  
  /* global navigator */
  navigator.geolocation.getCurrentPosition(success, error, options);
};

