import tabJourEnOrdre from "./Utilitaire/gestionTemps.js";
// console.log("depuis main js " + tabJourEnOrdre);

const CLEFAPI = '991ff047e338538647241cf8a3a2470a';
let resultatApi;
const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const humidite = document.querySelector('.humidite');
const vent = document.querySelector('.vent');
const heure = document.querySelectorAll('.heure-nom-prevision');
const tempsPourH = document.querySelectorAll('.heure-prevision-valeur');
const jourDiv = document.querySelectorAll('.jour-prevision-nom');
const tempJoursDiv = document.querySelectorAll('.jour-prevision-temp');
const imgIcone = document.querySelector('.logo-meteo');
const chargementContainer = document.querySelector('.overlay-icone-chargement');

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

            for (let i = 0; i < heure.length; i++) {

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

            for (let j = 0; j < tempsPourH.length; j++) {
                
                tempsPourH[j].innerText = `${Math.trunc(resultatApi.hourly[j * 3].temp)} °`;
                
            }

            // recuperer les trois premieres lettres des jours

            for (let k = 0; k < tabJourEnOrdre.length; k++){

                jourDiv[k].innerText = tabJourEnOrdre[k].slice(0, 3);

            }

            // prevision temperature jour 
            for (let l = 0; l < 7; l++){

                tempJoursDiv[l].innerText = `${Math.trunc(resultatApi.daily[l +1].temp.day)} °`

            }

            // Icone dynamique 
            if(heureActuelle >= 6 && heureActuelle < 21) {
            imgIcone.src = `ressources/jour/${resultatApi.current.weather[0].icon}.svg`
            } else  {
           imgIcone.src = `ressources/nuit/${resultatApi.current.weather[0].icon}.svg`
            }

            chargementContainer.classList.add('disparition');
            
        })
    
        
    
}