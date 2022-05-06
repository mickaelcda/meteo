const jourSemaine = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']; 

let ajd = new Date();
let options = { weekday: 'long' };
let jourActuel = ajd.toLocaleDateString('fr-FR', options);

console.log(jourActuel);

let tabJourEnOrdre = jourSemaine.slice(jourSemaine.indexOf(jourActuel )+1).concat(jourSemaine.slice(0, jourSemaine.indexOf(jourActuel )+1));
 console.log(tabJourEnOrdre);
 console.log(jourSemaine.indexOf(jourActuel)+1);
// console.log(jourSemaine);


export default tabJourEnOrdre; 