/*
* LISTE DES MODELES
*/
// Séléction de la balise div conteneur des modèles
const listBears = document.getElementById('fromServer');
/*
* Appel de la fonction getTeddies() en passant l'url de l'API en paramètre
* - then: si réussi, parse la réponse, affiche la réponse dans la console et appel la fonction createListTeddies() en prenant en paramètre la réponse parsée
* - catch: si echec, affiche l'erreur dans la console
* - then: affiche la fin de l'exécution de la requête dans la console
*/
getResp(url).then(response => {
    console.log("Communication avec l'API établie");
    let teddies = JSON.parse(response);
    console.log(teddies);
    createListTeddies(teddies);
}).catch(error => {
    alert("Erreur ! Veuillez vérifier votre connexion avec l'API");
    console.error("Erreur requête AJAX: " + error);
}).then(function(){
    console.log("Fin des requêtes Ajax");
});

