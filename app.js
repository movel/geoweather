'use strict';

/* define the toggle function */
function toggleState(item) {
  
  var on = document.getElementsByClassName("temp-span");
  
  if(item.className == "on") {
    item.className="off";

    var tempCelc = parseFloat(on[0].innerHTML);
    
    tempCelc = ((tempCelc - 32) / 9 * 5).toFixed(2);
    
    on[0].innerHTML = (tempCelc > 0) ? ("+" + tempCelc + " °C ") : ("" + tempCelc + " °C ");
    
  } else {
    item.className="on";

    var tempFar = parseFloat(on[0].innerHTML);
    
    tempFar = (tempFar * 9 / 5 + 32).toFixed(2);
    
    on[0].innerHTML = (tempFar> 0) ? ("+" + tempFar + " °F ") : ("" + tempFar + " °F ");
  }
}

window.onload = function() {
  var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
  };

  window.document.body.style.background = 'tomato';
  
  //var weather = document.getElementById("weather");
  var city = document.getElementsByClassName("city");
  var temp = document.getElementsByClassName("temp");
  var tempSpan = document.getElementsByClassName("temp-span");
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
        api += `&units=metric`;
    
    console.log(api);
    
    /* global fetch */
    fetch(api)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log('parsed json', json);
      const iconUrl = "https://openweathermap.org/img/w/" 
                      + json.weather[0].icon + ".png";
        
      city[0].innerHTML =  '' + json.name + ', ' + json.sys.country;
      tempSpan[0].innerHTML =  ((json.main.temp > 0) 
                        ? "+" + json.main.temp.toFixed(2) + " °C"
                        : "-" + json.main.temp.toFixed(2) + " °C");
          
      var img = new Image();
      
      img.onload = function() {
        temp[0].appendChild(img);
      };
      
      img.src = iconUrl;
      img.className = "weather-icon";
      
    }).catch(function(ex) {
      console.log('parsing failed', ex);
    });
  
    output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
  
    /* global Image */
    var img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=420x280&sensor=false";
  
    output.appendChild(img);
  
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    output.innerHTML = "Unable to retrieve your location";
  }
  
  /* global navigator */
  navigator.geolocation.getCurrentPosition(success, error, options);
};

