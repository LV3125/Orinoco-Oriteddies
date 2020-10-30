// Récupération du localStorage
const myReponse = JSON.parse(localStorage.getItem("commande"));
const myTotal = JSON.parse(localStorage.getItem("total"));
console.log(myReponse);
console.log("Numéro de commande: " + myReponse.orderId);

let commandeResume = document.getElementById("resumeCommand");

let clientName = document.createElement("p");
    clientName.setAttribute("class", "col-12");
    clientName.innerHTML = "Merci <span class='bold'>" + myReponse.contact.firstName + "</span>";

let numCommand = document.createElement("p");
    numCommand.setAttribute("class", "col-12");
    numCommand.innerHTML = "Votre commande portant le numéro : <span class='bold'>" + myReponse.orderId + "</span> a bien été prise en compte. Vous allez recoir un mail très prochainement avec votre résumé de commande. Vous pouvez suivre l'avancée de votre commande grâce au numéro de commande ci-dessus.";

let totalCommand = document.createElement("p");
    totalCommand.setAttribute("class", "col-12");
    totalCommand.innerHTML = "Total de la commande : <span class='bold'>" + myTotal + " €</span>";

// Bouton retour a l'acceuil
let returnHome = document.createElement("button");
    returnHome.setAttribute("class", "btn btn-home");
    returnHome.innerText = "Retour à l'accueil";
    returnHome.addEventListener("click", function(event){
        localStorage.clear();
        window.location.href = "index.html";
    });

    
commandeResume.append(clientName, numCommand, totalCommand, returnHome);