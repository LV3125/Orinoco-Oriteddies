/*
* SCRIPT JavaScript - Affichage de la liste des produits disponibles
*/

// Url de l'API - liste des produits
const url = "http://localhost:3000/api/teddies";
// Séléction de la balise div conteneur des produits
const listBears = document.getElementById('fromServer');

/*
* Appel de la fonction getTeddies() en passant l'url de l'API en paramètre
* - then: si réussi, parse la réponse, affiche la réponse dans la console et appel la fonction createListTeddies() en prenant en paramètre la réponse parsée
* - catch: si echec, affiche l'erreur dans la console
* - then: affiche la fin de l'exécution de la requête dans la console
*/
getResp(url).then(response => {
    let teddies = JSON.parse(response);
    console.log(teddies);
    createListTeddies(teddies);
}).catch(error => {
    console.error(error);
}).then(function(){
    console.log("Fin des requêtes Ajax");
});


/*
* SCRIPT JavaScript - Affichage des détails d'un produit
*/

// Récupération de l'id du produit via l'URL
const hash = window.location.hash;
const idHash = hash.replace('#', '/');
const nomUrl = url + idHash;


// Séléction de la balise div conteneur des détails du produit
const productCard = document.getElementById('productCard');


/*
* Appel de la fonction getTeddy() en passant l'url de l'API + id en paramètre
* - then: si réussi, parse la réponse, affiche la réponse dans la console et appel la fonction detailProduct() en prenant en paramètre la réponse parsée
* - catch: si echec, affiche l'erreur dans la console
* - then: affiche la fin de l'exécution de la requête dans la console
*/
getResp(nomUrl).then(function(response){
    let teddy = JSON.parse(response);
    console.log(teddy);
    detailProduct(teddy);
}).catch(error => {
    console.error(error);
})
.then(function(){
    console.log("Fin des requêtes Ajax");
})