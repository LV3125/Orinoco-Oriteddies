/*
* Récupérer les données de la liste "productWish" qui regroupe tous les produits sélectionnés par l'utilisateur
*/
let basket = JSON.parse(window.localStorage.getItem("productWish"));

let recapProduct = document.getElementById("basketRecap");

/*
* Si la liste contient des produits
*/
if (basket.length > 0) {
    //On supprime la div qui affiche que le panier est vide
    document.getElementById("emptyBasket").remove();
    /*
    * Boucle for pour créer les éléments dans le DOM pour chaque élément de la liste de produits sélectionnés
    */
    for(let i in basket){
        let productInfo = document.createElement("div");
            productInfo.classList.add("row", "rowProduct");

        let productImage = document.createElement("div");
            productImage.classList.add("image","col-6");
            productImage.src = `${basket[i].imageUrl}`;
            productImage.style.background = "url(" + productImage.src + ") no-repeat";
            productImage.style.backgroundSize = "cover";
            productImage.style.backgroundPosition = "center";

        let productDetail = document.createElement("div");
            productDetail.classList.add("detail","col-6");

        let productName = document.createElement("h2");
            productName.innerText = `${basket[i].name}`;

        let priceComa = `${basket[i].price}` / 100;
        let productPriceUnique = document.createElement("p");
            productPriceUnique.innerHTML = "<span class='bold'>Prix à l'unité:</span> " + priceComa + "€";

        let quantityChoiceDiv = document.createElement("div");
            quantityChoiceDiv.classList.add("quantityDiv");

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

                window.location.reload();
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
                    //On supprime la ligne du produit
                    tableOfProduct.splice(i,1);
                }
                //On encode en JSON le tableau qui contient les nouvelles informations
                tableOfProduct = JSON.stringify(tableOfProduct);
                //On renvoit ce tableau dans le localStorage
                localStorage.setItem("productWish", tableOfProduct);

                window.location.reload();
            }

        // Ajout de la possibilité d'effacer complétement un produit du panier
        let trashProduct = document.createElement("p");
            trashProduct.setAttribute("id", "remove" + [i]);
            trashProduct.innerHTML = "<i class='fa fa-trash'></i> Supprimer ce produit";
            trashProduct.classList.add("removeIcone");
            trashProduct.onclick = function(){
                basket.splice(i, 1);
                alert("Produit supprimé de votre panier");
                localStorage.clear();
                // Mise à jour du nouveau panier avec suppression de l'article
                localStorage.setItem("productWish", JSON.stringify(basket));
                //Mise à jour de la page pour affichage de la suppression au client
                window.location.reload();
                console.log("Produit supprimé du panier");
            };

        //Insertion des éléments dans le DOM
        recapProduct.append(productInfo);
        quantityChoiceDiv.append(addProduct, productQuantity, removeProduct);
        productDetail.append(productName, productPriceUnique, quantityChoiceDiv, subPriceUnique, trashProduct);
        productInfo.append(productImage, productDetail);

        console.log(basket[i]);
    }

    /*
    * Calcul total du panier
    */
    let totalToPay = 0;
    //Boucle for qui ajoute au total du panier le sous-total par produit de la liste de souhait de l'utilisateur
    for(let product in basket){
        totalToPay += (basket[product].price * basket[product].quantity) / 100;
    }
    //Création des éléments dans le DOM
    let totalBasket = document.getElementById("totalBasket");
    let totalBasketText = document.createElement("h2");
        totalBasketText.setAttribute("class", "col-12");
        totalBasketText.innerText = "Total de votre commande";

    let totalBasketPrice = document.createElement("p");
        totalBasketPrice.setAttribute("class", "col-12");
        totalBasketPrice.innerHTML = totalToPay + " €";

    let commandPast = document.createElement("button");
        commandPast.setAttribute("class", "offset-4 col-4 btn");
        commandPast.setAttribute("id", "btnToForm");
        commandPast.innerText = "Passer commande";
    //Insertion des éléments dans le DOM
    totalBasket.append(totalBasketText, totalBasketPrice, commandPast);
    console.log(totalToPay);
 
}else{
    document.getElementById("totalBasket").remove();
}