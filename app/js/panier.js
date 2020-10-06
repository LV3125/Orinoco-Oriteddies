/*
* Récupérer les données de la liste "productWish" qui regroupe tous les produits sélectionnés par l'utilisateur
*/
let basket = JSON.parse(window.localStorage.getItem("productWish"));

let recapProduct = document.getElementById("basketRecap");

/*
* Boucle for pour créer les éléments dans le DOM pour chaque élément de la liste de produits sélectionnés
*/
for(let i in basket){
    let productInfo = document.createElement("div");
        productInfo.classList.add("row", "rowProduct");

    let productImage = document.createElement("div");
        productImage.classList.add("image","col-4");
        productImage.src = `${basket[i].imageUrl}`;
        productImage.style.background = "url(" + productImage.src + ") no-repeat";
        productImage.style.backgroundSize = "cover";
        productImage.style.backgroundPosition = "center";

    let productDetail = document.createElement("div");
        productDetail.classList.add("detail","col-8");

    let productName = document.createElement("h2");
        productName.innerText = `${basket[i].name}`;

    let price = `${basket[i].price}`;
    let priceComa = price.slice(0,2);
    let productPriceUnique = document.createElement("p");
        productPriceUnique.innerHTML = "<span class='bold'>Prix à l'unité:</span> " + priceComa + "€";

    let quantityChoiceDiv = document.createElement("div");
        quantityChoiceDiv.classList.add("quantityDiv")
    // Affichage du nombre d'occurence de cet objet + sous-total de cet objet
    let productQuantity = document.createElement("p");
        productQuantity.classList.add("bold");
        productQuantity.innerHTML = "Quantité: " + `${basket[i].quantity}`;
    let subPriceUnique = document.createElement("p");
    let subPrice = `${basket[i].quantity}` * priceComa;
        subPriceUnique.innerHTML = "<span class='italic'>Sous-total:</span><span class='bold'> " + subPrice + "€</span>";

    // Ajout de la possibilité d'ajouter ou supprimer une occurence de cet objet
    // Ajouter
    let addProduct = document.createElement("button");
        addProduct.classList.add("btn");
        addProduct.innerHTML = "<i class='fa fa-plus-square'></i>";
        addProduct.onclick = function(){
            //on récupère la liste de souhait 
            let tableOfProduct = localStorage.getItem("productWish");
            //On décode le contenu
            tableOfProduct = JSON.parse(tableOfProduct);            
        
            //On incrémente de 1 la quantité de cet objet et on met à jour le sous-total qu'on change dynamiquement dans le DOM
            tableOfProduct[i].quantity++;
            productQuantity.innerHTML = "Quantité: " + `${tableOfProduct[i].quantity}`;
            subPrice = `${tableOfProduct[i].quantity}` * priceComa;
            subPriceUnique.innerHTML = "<span class='italic'>Sous-total:</span><span class='bold'> " + subPrice + "€</span>";

            //On encode en JSON le tableau qui contient les nouvelles informations
            tableOfProduct = JSON.stringify(tableOfProduct);
            //On renvoit ce tableau dans le localStorage
            localStorage.setItem("productWish", tableOfProduct);
        }

    // Supprimer
    let removeProduct = document.createElement("button");
        removeProduct.classList.add("btn");
        removeProduct.innerHTML = "<i class='fa fa-minus-square'></i>";
        removeProduct.onclick = function(){
            //on récupère la liste de souhait 
            let tableOfProduct = localStorage.getItem("productWish");
            //On décode le contenu
            tableOfProduct = JSON.parse(tableOfProduct);
            
            if(!tableOfProduct[i]){
                //Si l'objet n'existe pas dans la liste, on retourne false
                return false;
            }else{
                //Si l'objet existe, on enlève 1 à la quantité de cet objet et on met à jour le sous-total qu'on change dynamiquement dans le DOM
                tableOfProduct[i].quantity--;
                productQuantity.innerHTML = "Quantité: " + `${tableOfProduct[i].quantity}`;
                subPrice = `${tableOfProduct[i].quantity}` * priceComa;
                subPriceUnique.innerHTML = "<span class='italic'>Sous-total:</span><span class='bold'> " + subPrice + "€</span>";
            }
            if(tableOfProduct[i].quantity <= 0 ){
                //remove the item
                tableOfProduct.splice(i,1);
                recapProduct.removeChild(productInfo);
            }
            //On encode en JSON le tableau qui contient les nouvelles informations
            tableOfProduct = JSON.stringify(tableOfProduct);
            //On renvoit ce tableau dans le localStorage
            localStorage.setItem("productWish", tableOfProduct);
        }

    recapProduct.append(productInfo);
    quantityChoiceDiv.append(addProduct, productQuantity, removeProduct);
    productDetail.append(productName, productPriceUnique, quantityChoiceDiv, subPriceUnique);
    productInfo.append(productImage, productDetail);
    
}