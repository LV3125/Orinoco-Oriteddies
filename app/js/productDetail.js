/*
* DETAIL D'UN MODELE
*/
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