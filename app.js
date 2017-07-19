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
    
    var api = `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?`;
        api += `lat=${latitude}`;
        api += `&lon=${longitude}`;
        api += `&appid=eb7cf282541ad0aeab5e0e609161a441`;
    
    console.log(api);
    
    /* global fetch */
    fetch(api)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log('parsed json', json);
      const iconUrl = "https://openweathermap.org/img/w/" 
                      + json.weather[0].icon + ".png";
      console.log(json.weather[0].description);
      weather.innerHTML = '<div>' + json.name 
        + ', ' + json.sys.country
        + ': ' 
        + '<br>' 
        + '<span>'
        + ((json.wind.deg > 0) 
          ? "+" + json.wind.deg.toFixed(2) + "°C"
          : "-" + json.wind.deg.toFixed(2) + "°C")
        + '</span>'
        + '</div>';
          
      var img = new Image();
      
      img.onload = function() {
        weather.appendChild(img);
      };
      
      img.src = iconUrl;
      img.className = "weather-icon";
      
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

