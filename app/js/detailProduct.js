/*
* Récupération des données dans le LocalStorage
*/
let product = JSON.parse(window.localStorage.getItem("productDetails"));

/*
* Edition de la page de détail de l'article à partir de la data
*/
function displayDetailProduct(){
    let pageProduct = document.getElementById("productCard");

    let productTitle = document.createElement("h1");
        productTitle.innerHTML = `${product.name}`;

    let productImage = document.createElement("div");
        productImage.classList.add("productImagePageDetail");
        productImage.src = `${product.imageUrl}`;
        productImage.style.background = "url(" + productImage.src + ") no-repeat";
        productImage.style.backgroundPosition = "center";
        productImage.style.backgroundSize = "contain";

    let price = `${product.price}`;
    let priceComa = price.slice(0,2);
    let productPrice = document.createElement("p");
        productPrice.innerHTML = "<span class='bold'>Prix</span><br/>" + priceComa + "€";

    let productDescription = document.createElement("p");
        productDescription.innerHTML = `${product.description}`;

    //Ajout du choix de couleur du produit
    let colorTeddy = product.colors;
    let choiceLabel = document.createElement("label");
         choiceLabel.innerText = "Choisissez une couleur: ";
    let colorChoice = document.createElement("select");
        colorChoice.classList.add("bold");

    //Ajout des différentes options : choix de couleur
    for (var i = 0; i < colorTeddy.length; i++) {
        var color = document.createElement("option");
        color.classList.add("selectItems", "bold");
        color.value = colorTeddy[i];
        color.text = colorTeddy[i];
        colorChoice.appendChild(color);
    }


    productCard.prepend(productTitle, productImage, productPrice, productDescription, choiceLabel, colorChoice);
}

displayDetailProduct();


