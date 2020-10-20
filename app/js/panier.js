let recapProduct = document.getElementById("basketRecap");

//Déclaration total somme
let total = 0; 

// Récupération des données du localStorage
let objLinea = localStorage.getItem("obj");
let commande = JSON.parse(objLinea);

// Fonction d'intégration des élèments dans le tableau de notre panier
function commandeOursEnPeluche() {
    if (commande && commande.length > 0) {
        //On supprime la div qui affiche que le panier est vide
        document.getElementById("emptyBasket").remove();
        //Création des éléments dans le DOM
        let totalBasket = document.getElementById("totalBasket");
            totalBasket.setAttribute("class", "row");
        let totalBasketText = document.createElement("h2");
            totalBasketText.setAttribute("class", "col-12");
            totalBasketText.innerText = "Total de votre commande";

        let totalBasketPrice = document.createElement("p");
            totalBasketPrice.setAttribute("class", "col-12 totalToPay");

        let commandPast = document.createElement("button");
            commandPast.setAttribute("class", "offset-4 col-4 btn");
            commandPast.setAttribute("id", "btnToForm");
            commandPast.innerText = "Passer commande";

        let deletaAllBasket = document.createElement("button");
            deletaAllBasket.innerText = "Supprimer tout le panier";
            deletaAllBasket.setAttribute("class", "btn offset-3 col-6");
            deletaAllBasket.addEventListener("click", function(event){
                function deleteAllItem(){
                    localStorage.removeItem("obj");
                    window.location.reload();
                };
                deleteAllItem();
            });
        //Insertion des éléments dans le DOM
        totalBasket.append(totalBasketText, totalBasketPrice, commandPast, deletaAllBasket);

        /*
        * Boucle for pour créer les éléments dans le DOM pour chaque élément de la liste de produits sélectionnés
        */
        for(let i = 0; i < commande.length; i++) {

            let productInfo = document.createElement("div");
                productInfo.classList.add("row", "rowProduct");

            let productImage = document.createElement("div");
                productImage.classList.add("image","col-6");
                productImage.src = commande[i].image;
                productImage.style.background = "url(" + productImage.src + ") no-repeat";
                productImage.style.backgroundSize = "cover";
                productImage.style.backgroundPosition = "center";

            let productDetail = document.createElement("div");
                productDetail.classList.add("detail");

            let productName = document.createElement("h2");
                productName.innerText = commande[i].name;

            let productPriceUnique = document.createElement("p");
                productPriceUnique.innerHTML = "<span class='bold'>Prix à l'unité:</span> " + commande[i].price/100 + "€";

            let colorChoice = document.createElement("p");
                colorChoice.innerHTML = "<span class='bold'>Couleur:</span> " + commande[i].colors;

            let quantityDiv = document.createElement("div");   
                quantityDiv.setAttribute("class", "quantityDiv"); 

            let productQuantity = document.createElement("p");
                productQuantity.classList.add("bold");
                productQuantity.innerHTML = "Quantité: " + commande[i].qte;

            // Ajouter
            let addProduct = document.createElement("button");
                addProduct.classList.add("btn");
                addProduct.innerHTML = "<i class='fa fa-plus-square'></i>";
                addProduct.onclick = function(){
                    //on récupère la liste de souhait 
                    let objLinea = localStorage.getItem("obj");
                    //On décode le contenu                    
                    let commande = JSON.parse(objLinea);       
                    //On incrémente de 1 la quantité de cet objet et on met à jour le sous-total qu'on change dynamiquement dans le DOM
                    commande[i].qte++;
                    productQuantity.innerHTML = "Quantité: " + commande[i].qte;
                    // subPrice = `${tableOfProduct[i].quantity}` * priceComa;
                    // subPriceUnique.innerHTML = "<span class='italic'>Sous-total:</span><span class='bold'> " + subPrice + "€</span>";
                    //On encode en JSON le tableau qui contient les nouvelles informations
                    commande = JSON.stringify(commande);
                    //On renvoit ce tableau dans le localStorage
                    localStorage.setItem("obj", commande);

                    window.location.reload();
                }
            
            // Supprimer
            let removeProduct = document.createElement("button");
            removeProduct.classList.add("btn");
            removeProduct.innerHTML = "<i class='fa fa-minus-square'></i>";
            removeProduct.onclick = function(){
                //on récupère la liste de souhait 
                let objLinea = localStorage.getItem("obj");
                //On décode le contenu                    
                let commande = JSON.parse(objLinea);    
                
                if(!commande[i]){
                    //Si l'objet n'existe pas dans la liste, on retourne false
                    return false;
                }else{
                    //Si l'objet existe, on enlève 1 à la quantité de cet objet et on met à jour le sous-total qu'on change dynamiquement dans le DOM
                    commande[i].qte--;
                    productQuantity.innerHTML = "Quantité: " + commande[i].qte;
                    // subPrice = `${tableOfProduct[i].quantity}` * priceComa;
                    // subPriceUnique.innerHTML = "<span class='italic'>Sous-total:</span><span class='bold'> " + subPrice + "€</span>";
                }
                if(commande[i].qte <= 0 ){
                    //On supprime la ligne du produit
                    commande.splice(i,1);
                }
                //On encode en JSON le tableau qui contient les nouvelles informations
                commande = JSON.stringify(commande);
                //On renvoit ce tableau dans le localStorage
                localStorage.setItem("obj", commande);

                window.location.reload();
            }
            
            let subPriceUnique = document.createElement("p");
            let subPrice = (commande[i].price/100) * commande[i].qte;
                subPriceUnique.innerHTML = "<span class='italic'>Sous-total:</span><span class='bold'> " + subPrice + "€</span>";


            let trashProduct = document.createElement("p");
                trashProduct.setAttribute("id", "remove" + [i]);
                    trashProduct.innerHTML = "<i class='fa fa-trash'></i> Supprimer ce produit";
                    trashProduct.classList.add("removeIcone");
                    trashProduct.onclick = function(){
                        commande.splice(i, 1);
                        alert("Produit supprimé de votre panier");
                        localStorage.clear();
                        // Mise à jour du nouveau panier avec suppression de l'article
                        localStorage.setItem("obj", JSON.stringify(commande));
                        //Mise à jour de la page pour affichage de la suppression au client
                        window.location.reload();
                        console.log("Produit supprimé du panier");
                    };

            //Insertion des éléments dans le DOM
            quantityDiv.append(addProduct, productQuantity, removeProduct);
            productDetail.append(productName, productPriceUnique, colorChoice, quantityDiv, subPriceUnique, trashProduct);
            productInfo.append(productImage, productDetail);
            recapProduct.append(productInfo);

            console.log(commande[i]);
            // Total de la commande
            function totalCommande() {           
                // Récupération du prix des articles
                let value = (commande[i].price/100) * commande[i].qte;
                // Addition des articles
                total = total + value;
                totalBasketPrice.textContent = total + " €";
                // Ajout du prix total des articles dans le formulaire d'achat     
                const myTotal = localStorage.setItem("total", total);         
            };      
            totalCommande();
        }
    }else{
        document.getElementById("totalBasket").remove();
        console.log("Le panier est vide");
    }
}; 
commandeOursEnPeluche();
