/*
* SCRIPT qui regroupe l'ensemble des fonctions utilisées sur le site
*/


/* 
* CREATLISTTEDDIES()
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
* DETAILPRODUCT() 
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
* CHECKINPUT()
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