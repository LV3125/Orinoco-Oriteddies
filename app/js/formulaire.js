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


/*
* Déclaration fonction
* Permet de vérifier les données entrées dans le formulaire grâce à des règles regex
*/
function checkInput() {
    // Règle regex
    let checkNumber = /[0-9]/;
    let checkEmail = /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
    let checkSpecialCharacter = /[!@#$%^&*(),.?":{}|<>_]/;

    //Vérification de chaque input et affichage des erreurs personnalisées par input
    //Prénom
    if(checkNumber.test(formPrenom.value) == true || checkSpecialCharacter.test(formPrenom.value) == true || formPrenom.value.length > 25 || formPrenom.value == ""){
        erreurPrenom.style.display = "";
        erreurPrenom.innerHTML = "Problème ! Les chiffres et les caractères spéciaux ne sont pas autorisés ! (25 caractères max)";
        formPrenom.classList.add("erreurInput");
        return false; 
        
    }else{
        console.log("Prénom valide :" + formPrenom.value + '(' + formPrenom.value.length + ' caractères)');
        erreurPrenom.style.display = "none";
        formPrenom.classList.remove("erreurInput");
    }
    //Nom
    if(checkNumber.test(formNom.value) == true || checkSpecialCharacter.test(formNom.value) == true || formNom.value.length > 25 || formNom.value == ""){
        erreurNom.style.display = "";
        erreurNom.innerHTML = "Problème ! Les chiffres et les caractères spéciaux ne sont pas autorisés ! (25 caractères max)";
        formNom.classList.add("erreurInput");
        return false;    
    }else{
        console.log("Nom valide :" + formNom.value + '(' + formNom.value.length + ' caractères)');
        erreurNom.style.display = "none";
        formNom.classList.remove("erreurInput");
    }
    //Adresse
    if(checkSpecialCharacter.test(formAdresse.value) == true || formAdresse.value.length > 100 || formAdresse.value == ""){
        erreurAdresse.style.display = "";
        erreurAdresse.innerHTML = "Problème ! Les caractères spéciaux ne sont pas autorisés ! (100 caractères max)";
        formAdresse.classList.add("erreurInput");
        return false;    
    }else{
        console.log("Adresse valide: " + formAdresse.value + "(" + formAdresse.value.length + " caractères)");
        erreurAdresse.style.display = "none";
        formAdresse.classList.remove("erreurInput");
    }
    //Complément d'adresse
    if(checkSpecialCharacter.test(formAdresseComp.value) == true || formAdresseComp.value.length > 100){
        erreurAdresseComp.style.display = "";
        erreurAdresseComp.innerHTML = "Problème ! Les caractères spéciaux ne sont pas autorisés ! (100 caractères max)";
        formAdresseComp.classList.add("erreurInput");
        return false; 
    }else{
        console.log("Adresse valide :" + formAdresseComp.value + '(' + formAdresseComp.length + ' caractères)');
        erreurAdresseComp.style.display = "none";
        formAdresseComp.classList.remove("erreurInput");
    }
    //Ville
    if(checkNumber.test(formVille.value) == true || checkSpecialCharacter.test(formVille.value) == true || formVille.value.length > 40 || formVille.value == ""){
        erreurVille.style.display = "";
        erreurVille.innerHTML = "Problème ! Les chiffres et les caractères spéciaux ne sont pas autorisés ! (40 caractères max)";
        formVille.classList.add("erreurInput");
        return false;  
    }else{
        console.log("Ville valide :" + formVille.value + '(' + formVille.value.length + ' caractères)');
        erreurVille.style.display = "none";
        formVille.classList.remove("erreurInput");
    }   
    //Email
    if(formEmail.value.length > 254 || formEmail.value == "" || checkEmail.test(formEmail.value) == false){
        erreurEmail.style.display = "";
        erreurEmail.innerHTML = "Veuillez vérifier les informations concernant votre email. Adresse email valide : 'exemple@email.fr'";
        formEmail.classList.add("erreurInput");
        return false; 
    }else{
        console.log("Email valide :" + formEmail.value + '(' + formEmail.value.length + ' caractères)');
        erreurEmail.style.display = "none";
        formEmail.classList.remove("erreurInput");
    }   
}

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
        * Déclaration fonction:
        * - Requête vers l'API pour envoyer les données au serveur sous forme de Promesse
        * - Si réussi: fonction resolve pour récupérer la réponse
        * - Si échec: fonction reject pour récupèrer la requète et afficher l'erreur.
        */
        let reqToServer = url => {
            return new Promise(function(resolve, reject){
                let req = new XMLHttpRequest();
                    req.open("POST", url);
                    req.setRequestHeader("Content-Type", "application/json");
                    req.send(JSON.stringify(dataPanier));
                    req.onreadystatechange = function() {
                        if(req.readyState == XMLHttpRequest.DONE){
                            if(req.status == 201){
                                resolve(req.responseText);
                            }else{
                                reject(req);
                            }
                        }
                    }
            });
        }

        /*
        * Appel de la fonction reqToServer() en passant l'url de l'API (order) en paramètre
        * - then: si réussi, parse la réponse, affiche la réponse dans la console, on ajoute la réponse dans le localStorage et on ouvre la page "confirmation.html"
        * - catch: si echec, appel de la fonction catchError qui affiche l'erreur dans la console
        * - then: affiche la fin de l'exécution de la requête dans la console
        */
        reqToServer("http://localhost:3000/api/teddies/order").then(function(resp){
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
  
