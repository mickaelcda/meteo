const CLEFAPI = '991ff047e338538647241cf8a3a2470a';
let resultatApi;
const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const humidite = document.querySelector('.humidite');
const vent = document.querySelector('.vent');
const heure = document.querySelectorAll('.heure-nom-prevision');
const tempsPourH = document.querySelectorAll('.heure-prevision-valeur');


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        // console.log(position);
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        AppelAPI(long, lat);
    }, () => {
        alert(" Vous avez refusé la geolocalisation,Veuillez recharger la page et l'activer pour le bon fonctionement de l'application ")
    })
}

function AppelAPI(long, lat) {
    
    // console.log(long, lat);
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEFAPI}`)
        .then((reponse) => {
            return reponse.json();
        }) 
        .then((data) => {
             console.log(data);
            resultatApi = data;

            temps.innerText = resultatApi.current.weather[0].description;
            temperature.innerText = `${Math.trunc(resultatApi.current.temp)}°`;
            localisation.innerText = resultatApi.timezone;
            humidite.innerText = `Humidité : ${resultatApi.current.humidity} %`;
            vent.innerText = `Vent : ${Math.trunc(resultatApi.current.wind_speed * 3.6)} KM/H`;
            

              //les heures par tranche de trois , avec leurs valeurs(temperature)
            
            let heureActuelle = new Date().getHours();

            for (let i = 0; i < heure.length; i++){

                let heureIncr = heureActuelle + i * 3;

                if (heureIncr > 24) {

                    heure[i].innerText = `${heureIncr - 24} h`
    
                }
                else if (heureIncr === 24) {
    
                    heure[i].innerText = "00 h";
                }
                else {
                    heure[i].innerText = `${heureIncr} h`
                }
                
            }

            for (let j = 0; j < tempsPourH.length; j++){
                tempsPourH[j].innerText = `${Math.trunc(resultatApi.hourly[j *3].temp)} °`;
                
            }
        
        })
    
  
    
}