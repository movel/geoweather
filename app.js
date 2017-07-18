var options = {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 0
            };
            
            function success(pos) {
              var crd = pos.coords;
            
            //   console.log('Your current position is:');
            //   console.log(`Latitude : ${crd.latitude}`);
            //   console.log(`Longitude: ${crd.longitude}`);
            //   console.log(`More or less ${crd.accuracy} meters.`);
              
              var str = 'Your current position is:<br>';
                str += `Latitude : ${crd.latitude}<br>`;
                str += `Longitude: ${crd.longitude}<br>`;
                str += `More or less ${crd.accuracy} meters.<br>`;
                
              document.getElementById("p1").innerHTML = str;

            }
            
            function error(err) {
              console.warn(`ERROR(${err.code}): ${err.message}`);
            }
            
            /* global navigator */
            navigator.geolocation.getCurrentPosition(success, error, options);