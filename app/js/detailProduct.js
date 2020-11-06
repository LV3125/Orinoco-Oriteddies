/*
* SCRIPT JavaScript - Affichage des détails d'un produit
*/

// Url de l'API - liste des produits
const url = "http://localhost:3000/api/teddies";

// Récupération de l'id du produit via l'URL
const hash = window.location.hash;
const idHash = hash.replace('#', '/');
const nomUrl = url + idHash;


// Séléction de la balise div conteneur des détails du produit
const productCard = document.getElementById('productCard');


/*
* Déclaration fonction:
* - Requête vers l'API pour récupérer les données des produits sous forme de Promesse
* - Si réussi: fonction resolve pour récupèrer la réponse
* - Si échec: fonction reject pour récupèrer la requète et afficher l'erreur.
*/
let getTeddy = url => {
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
* Fonction qui permet de créer les éléments du DOM, qui afficheront les diverses propriétés de la réponse(argument)
*/
function detailProduct(teddy){
    // Création des éléments dans le DOM
    let productTitle = document.createElement("h1");
        productTitle.textContent = teddy.name;

    let productImage = document.createElement("div");
        productImage.classList.add("productImagePageDetail");
        productImage.src = teddy.imageUrl;
        productImage.style.background = "url(" + productImage.src + ") no-repeat";
        productImage.style.backgroundPosition = "center";
        productImage.style.backgroundSize = "cover";

    let productPrice = document.createElement("p");
        productPrice.textContent = teddy.price/100 + " €";

    let productDescription = document.createElement("p");
        productDescription.innerHTML = teddy.description;

    let colorDiv = document.createElement("div");

    let choiceLabel = document.createElement("label");
        choiceLabel.innerText = "Choisissez une couleur: ";

    let colorsSelector = document.createElement("select");
        colorsSelector.setAttribute("class", "color_ours");
    let colors = teddy.colors;
    // Boucle for pour afficher sous forme de choix d'options, les différentes couleurs disponibles du produit
    for (let i = 0; i < colors.length; i++) {
        let myOption = document.createElement('option');
        myOption.textContent = colors[i];
        myOption.setAttribute("value", colors[i]);
        colorsSelector.appendChild(myOption);                
    };

    const mySubmit = document.querySelector('.btn_add');
    
    colorDiv.prepend(choiceLabel, colorsSelector);
    productCard.prepend(productTitle, productImage, productPrice, productDescription, colorDiv);
    
    /*
    * Création d'un évènement lorsque l'on clique sur le bouton "ajouter au panier"
    * Création de l'objet "objJson" = information du produit ajouté
    * Stockage des informations dans le localStorage
    */ 
    mySubmit.addEventListener('click', function (event) {
        let objJson = {
            id: teddy._id,
            name: teddy.name,
            image: teddy.imageUrl,
            colors: colorsSelector.value,
            price: teddy.price,
            qte: 1
        };
        
        let tableOfProducts = localStorage.getItem("obj");

        //On vérifie si le tableau contenant les articles ajoutés existe
        if(!tableOfProducts){
            //Si elle n'existe pas : on créer le tableau et on ajoute un produit
            tableOfProducts = [];
            objJson.qte = 1;
            tableOfProducts.push(objJson);
        }else{ 
            //Si elle existe : on parse le tableau et on l'affiche dans la console
            tableOfProducts = JSON.parse(tableOfProducts);
            console.log(tableOfProducts);
            //On vérifie un des éléments du tableau possède le même id et la même couleur que le produit sélectionné
            if(tableOfProducts.find(choice => choice.id === objJson.id &&  choice.colors === objJson.colors)){
                //Si oui: boucle for qui passe dans le tableau et qui incrémente de 1 la quantité du produit qui possède le même id et la même couleur que le produit sélectionné
                for(var i = 0; i < tableOfProducts.length; i++){
                    if(objJson.id === tableOfProducts[i].id && objJson.colors === tableOfProducts[i].colors){
                        tableOfProducts[i].qte++;
                        break;
                    }
                }
            }else{
                //Si il n'existe pas: on définit la quantité du produit à 1 et on l'ajoute au tableau
                objJson.qte = 1;
                tableOfProducts.push(objJson);
            }
        }
        //On encode le tableau au format JSON
        tableOfProducts = JSON.stringify(tableOfProducts);

        //On renvoie le tableau au localStorage
        localStorage.setItem("obj", tableOfProducts);
        
        /*
        * Fenêtre PoPup
        * Affiche un choix: voir le panier ou continuer les achats
        */
        let popupAdded = document.getElementById("popupAdd");
        if(popupAdded.classList.contains("hide")){
            popupAdded.classList.remove("hide");
            document.body.style.overflow = "hidden";
        }else{
            popupAdded.classList.add("hide");
        }
    });
}


/*
* Appel de la fonction getTeddy() en passant l'url de l'API + id en paramètre
* - then: si réussi, parse la réponse, affiche la réponse dans la console et appel la fonction detailProduct() en prenant en paramètre la réponse parsée
* - catch: si echec, affiche l'erreur dans la console
* - then: affiche la fin de l'exécution de la requête dans la console
*/
getTeddy(nomUrl).then(function(response){
    let teddy = JSON.parse(response);
    console.log(teddy);
    detailProduct(teddy);
}).catch(error => {
    console.error(error);
})
.then(function(){
    console.log("Fin des requêtes Ajax");
})
