/*
* SCRIPT JavaScript - Affichage du formulaire de contact pour passer la commande
*/

// Séléction du bouton qui permet d'accéder au formulaire de contact
const myButtonSubmit = document.getElementById('btnToForm');

// Séléction du conteneur du formulaire de contact qui est caché
let formCommandSection = document.getElementById("formCommandSection");
    formCommandSection.style.display = "none";
//Lorsque l'on clique sur passer la commande, on arrive de manière fluide sur le formulaire de commande qui s'affiche sous le bouton
myButtonSubmit.onclick = function(){
    if(formCommandSection.style.display == "none"){
        formCommandSection.style.display = "block";
        formCommandSection.scrollIntoView({
            behavior: "smooth",
            block: "end"
        });
    }
}

//Récupérarion des inputs du formulaires afin de les tester
let formPrenom = document.getElementById("prenom");
let formNom = document.getElementById("nom");
let formAdresse = document.getElementById("adresse");
let formAdresseComp = document.getElementById("adresse2");
let formVille = document.getElementById("ville");
let formEmail = document.getElementById("email");

//Récupération des span pour afficher les erreurs pour chaque input
let spanErreur = document.getElementsByClassName("spanErreur");
let erreurPrenom = document.getElementById("messagePrenom");
let erreurNom = document.getElementById("messageNom");
let erreurAdresse = document.getElementById("messageAdresse");
let erreurAdresseComp = document.getElementById("messageAdresseComp");
let erreurVille = document.getElementById("messageVille");
let erreurEmail = document.getElementById("messageEmail");


// Sélection du formulaire de contact
let form = document.getElementById("formCommandPast");
//Appel de la fonction checlInput() lors de la soumission du formulaire
form.addEventListener("submit", (event) => {
    event.preventDefault();
    if(checkInput() != false){
        console.log("le formulaire est correct");
        //Récupération des données saisie par l'utilisateur en créant un objet 'contact'
        let contact = {
            firstName: formPrenom.value,
            lastName: formNom.value,
            address: formAdresse.value,
            adresseComp: formAdresseComp.value,
            city: formVille.value,
            email: formEmail.value
        };

        // Récupération de la commande
        let products = [];
        for (let i = 0; i < commande.length; i++) {
            products.push(commande[i].id);
        };
        // Ajout des données de contact et produit dans dataPanier qui sera envoyé au serveur
        let dataPanier = { contact, products };

        /*
        * Appel de la fonction reqToServer() en passant l'url de l'API (order) en paramètre
        * - then: si réussi, parse la réponse, affiche la réponse dans la console, on ajoute la réponse dans le localStorage et on ouvre la page "confirmation.html"
        * - catch: si echec, appel de la fonction catchError qui affiche l'erreur dans la console
        * - then: affiche la fin de l'exécution de la requête dans la console
        */
        reqToServer("http://localhost:3000/api/teddies/order", dataPanier).then(function(resp){
            let response = JSON.parse(resp);
            console.log(response);
            let myReponse = JSON.stringify(response);
            localStorage.setItem("commande", myReponse);
            localStorage.removeItem("obj");
            window.location.href = "confirmation.html";
        }).catch(function(error){
            console.error(error);
        }).then(function(){
            console.log("Fin des requêtes Ajax");
        })
    }else{
        console.log("Il y a une erreur dans le formulaire");
    };
    
});
  
