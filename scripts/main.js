import tabJoursEnOrdre from './Utilitaire/gestionTemps.js';

//console.log(tabJoursRnOrdre);

const CLEFAPI = '991ff047e338538647241cf8a3a2470a';
let resultatAPI;
const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const heure = document.querySelectorAll('.heure-nom-prevision');
const tempPourH = document.querySelectorAll('.heure-prevision-valeur');
const jourDiv = document.querySelectorAll('.jour-prevision-nom');
const tempJourDiv = document.querySelectorAll('.jour-prevision-temp');
const imgIcone = document.querySelector('.logo-meteo');
const chargementContainer = document.querySelector('.overlay-icone-chargement');

if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
    
        //console.log(position);
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        AppelAPI(long,lat);


    }, () => {
        alert(`vous avez refusé la geolocalisation, l'application ne peut pas fonctionner veuillez l'activer`)
    })
}

function AppelAPI(long,lat){
    
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEFAPI}
    `)
    .then((reponse)=>{
        return reponse.json();
    })
    .then((data)=>{
       // console.log(data);
       resultatAPI = data;
       temps.innerText = resultatAPI.current.weather[0].description;
       temperature.innerText = `${Math.trunc(resultatAPI.current.temp)}°`
       localisation.innerText = resultatAPI.timezone;

        let heureActuelle = new Date().getHours();

        for(let i =0; i < heure.length ; i++){

            let heureincr = heureActuelle + i *3;

            if(heureincr > 24){
                heure[i].innerText = `${heureincr - 24}h`;
            }else if(heureincr === 24){
                heure[i].innerText = "00 h"
            }else {
                heure[i].innerText = `${heureincr}h`;
            }
           
        }

        //temperature pour 3 heures 
        for(let j = 0 ; j < tempPourH.length ; j++){
            tempPourH[j].innerText = `${Math.trunc(resultatAPI.hourly[j * 3].temp)}°`
        }

        //trois premieres lettres des jours 

        for(let k = 0 ; k < tabJoursEnOrdre.length; k++){
            jourDiv[k].innerText = tabJoursEnOrdre[k].slice(0,3);
        }

        // on ajoute les temperatures de la semaine

        for(let l = 0 ; l < 7; l ++) {
           tempJourDiv[l].innerText = `${Math.trunc(resultatAPI.daily[l + 1].temp.day)}°` 
        }

        //icone dynamique

        if(heureActuelle >= 6 && heureActuelle < 21){
            imgIcone.src = `ressources/jour/${resultatAPI.current.weather[0].icon}.svg`
        }else {
            imgIcone.src = `ressources/nuit/${resultatAPI.current.weather[0].icon}.svg`
        }
        chargementContainer.classList.add('disparition');
    })
    //console.log(long,lat);
    console.log(imgIcone);
}