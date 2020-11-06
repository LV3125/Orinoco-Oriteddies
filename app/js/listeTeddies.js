/*
* SCRIPT JavaScript - Affichage de la liste des produits disponibles
*/

// Url de l'API - liste des produits
const url = "http://localhost:3000/api/teddies";
// Séléction de la balise div conteneur des produits
const listBears = document.getElementById('fromServer');

/*
* Déclaration fonction:
* - Requête vers l'API pour récupérer les données des produits sous forme de Promesse
* - Si réussi: fonction resolve pour récupèrer la réponse
* - Si échec: fonction reject pour récupèrer la requète et afficher l'erreur.
*/
let getTeddies = url => {
    return new Promise(function(resolve, reject){
        let request = new XMLHttpRequest();
            request.open("GET", url);
            request.onreadystatechange = function(){
                if(request.readyState == 4){
                    if(request.status == 200){
                        resolve(request.responseText);
                    }else{
                        reject(request);
                    }
                }
            }
            request.send();
    });
}

/* 
* Déclaration fonction
* Fonction qui permet de créer les éléments du DOM grâce à une boucle for, qui afficheront les diverses propriétés de la réponse(argument)
*/
function createListTeddies(teddies){
    for(let i = 0; i < teddies.length; i++) { 
        let productCard = document.createElement('section');
            productCard.classList.add('row', 'product');

        let productLeftDiv = document.createElement('div');
            productLeftDiv.classList.add("col-12", "col-md-5", "image-product")
            productLeftDiv.src = teddies[i].imageUrl;
            productLeftDiv.style.background = "url(" + productLeftDiv.src + ") no-repeat";
            productLeftDiv.style.backgroundPosition = "center";
            productLeftDiv.style.backgroundSize = "cover";

        let productRightDiv = document.createElement('div');
            productRightDiv.classList.add("col-12", "col-md-7", "title-product");

        let productName = document.createElement('h2');
            productName.innerText = teddies[i].name;

        let productPrice = document.createElement('p');
            productPrice.innerHTML = teddies[i].price/100 + " €";

        let productDescription = document.createElement('p');
            productDescription.innerText = teddies[i].description;

        let btnProduct = document.createElement("a");
            btnProduct.classList.add("btn");
            btnProduct.textContent = "En savoir plus";
            btnProduct.setAttribute("href", "ficheProduit.html#" + teddies[i]._id);
            

        listBears.append(productCard);
        productCard.append(productLeftDiv,productRightDiv);
        productRightDiv.append(productName,productPrice,productDescription, btnProduct);
    };
}

/*
* Appel de la fonction getTeddies() en passant l'url de l'API en paramètre
* - then: si réussi, parse la réponse, affiche la réponse dans la console et appel la fonction createListTeddies() en prenant en paramètre la réponse parsée
* - catch: si echec, affiche l'erreur dans la console
* - then: affiche la fin de l'exécution de la requête dans la console
*/
getTeddies(url).then(response => {
    let teddies = JSON.parse(response);
    console.log(teddies);
    createListTeddies(teddies);
}).catch(error => {
    console.error(error);
}).then(function(){
    console.log("Fin des requêtes Ajax");
});

