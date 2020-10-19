/*
* Formulaire pour passer la commande
*/
let commandPast = document.getElementById("btnToForm");
let formCommandSection = document.getElementById("formCommandSection");
    formCommandSection.style.display = "none";
//Lorsque l'on clique sur passer la commande, on arrive de manière fluide sur le formulaire de commande qui s'affiche sous le bouton
commandPast.onclick = function(){
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
let erreurPrenom = document.getElementById("messagePrenom");
let erreurNom = document.getElementById("messageNom");
let erreurAdresse = document.getElementById("messageAdresse");
let erreurAdresseComp = document.getElementById("messageAdresseComp");
let erreurVille = document.getElementById("messageVille");
let erreurEmail = document.getElementById("messageEmail");

/*
* Vérification du formulaire de commande
*/
let form = document.getElementById("formCommandPast");
//Appel de la fonction checkForm() lors de la soumission du formulaire
form.addEventListener("submit", (event) => {
    event.preventDefault();
    checkForm();
    createCommand();
});


// Fonction qui vérifie les inputs
function checkForm(){
    //Règles RegEx
    let checkNumber = /[0-9]/;
    let checkEmail = /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
    let checkSpecialCharacter = /[!@#$%^&*(),.?":{}|<>_]/;

    //Vérification de chaque input et affichage des erreurs personnalisées par input
    //Prénom
    if(checkNumber.test(formPrenom.value) == true || checkSpecialCharacter.test(formPrenom.value) == true || formPrenom.value.length > 25 || formPrenom.value == ""){
        erreurPrenom.style.display = "";
        erreurPrenom.innerHTML = "Problème ! Les chiffres et les caractères spéciaux ne sont pas autorisés ! (25 caractères max)";
        formPrenom.classList.add("erreurInput");
        
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
    }else{
        console.log("Email valide :" + formEmail.value + '(' + formEmail.value.length + ' caractères)');
        erreurEmail.style.display = "none";
        formEmail.classList.remove("erreurInput");
    }   
}

/*
* Fonction pour créer l'objet de la commande à envoyer avec le formulaire
*/
let contact;
let products = [];

function createCommand(){
    if(erreurPrenom.style.display == "none" && erreurNom.style.display == "none" && erreurAdresse.style.display == "none" && erreurAdresseComp.style.display == "none" && erreurVille.style.display == "none" && erreurEmail.style.display == "none"){
        console.log("Formulaire prêt à être envoyé");
        //Création de l'objet contact à partir des données du formulaire
        contact = {
            lastName: formNom.value,
            firstName: formPrenom.value,
            address: formAdresse.value,
            adressCom: formAdresseComp.value,
            city: formVille.value,
            email: formEmail.value
        };
        //Création du tableau de produit en fonction des produits présents dans la liste de souhait de l'utilisateur
        basket.forEach((product) => {
            products.push(product._id, "quantité(" + product.quantity + ")");
        });
        console.log("Ce tableau sera envoyé à l'API : " + products);
        //Création de l'objet commandResume qui sera envoyé à l'API
        let commandResume = {
            contact,
            products
        };
        console.log(commandResume);
        
        askRequest("POST", "http://localhost:3000/api/teddies/order",function(response) {
            console.log("resp",response);
            let orderId = response.orderId;
            localStorage.clear();
            localStorage.setItem("totalAmount", totalAmount);
            localStorage.setItem("orderId", orderId);
        }, commandResume);
        window.open("confirmation.html");
        
        //Une fois la commande effectuée retour à l'état initial des tableaux/objet/localStorage
        // contact = {};
        // productsList = [];
        // localStorage.clear();
    }else{
        console.log("Erreur ! Le formulaire comporte une ou plusieurs erreurs et ne peut être envoyé");
    }
}

