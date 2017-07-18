'use strict';

window.onload = function() {
  var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
  };
  
  window.document.body.style.background = 'tomato';
  
  var output = document.getElementById("out");
  
  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
  }
              
  function success(position) {
    var crd = position.coords;
    
    var str = 'Your current position is:<br>';
      str += `Latitude : ${crd.latitude}<br>`;
      str += `Longitude: ${crd.longitude}<br>`;
      str += `More or less ${crd.accuracy} meters.<br>`;
      
    document.getElementById("p1").innerHTML = str;
    
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
  
    output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
  
    /* global Image */
    var img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";
  
    output.appendChild(img);
  
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    output.innerHTML = "Unable to retrieve your location";
  }
  
  /* global navigator */
  navigator.geolocation.getCurrentPosition(success, error, options);
};

