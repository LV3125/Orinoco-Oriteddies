/**
 * Récupère les informations des ours en peluche depuis l'API
 * et les affiche grâce à la fonction displayTeddies() qui s'occupe d'afficher la liste des produits
 */

askRequest('GET','http://localhost:3000/api/teddies', function(bears){
    displayTeddies(bears);
});

/**
 * Affiche la liste des produits (ours en peluche)
 * */
const listBears = document.getElementById('fromServer');

function displayTeddies(bears){
    for(let i in bears) {
        let productCard = document.createElement('section');
            productCard.classList.add('row', 'product');
            
        let productLeftDiv = document.createElement('div');
            productLeftDiv.classList.add("col-5", "image-product")
            productLeftDiv.src = `${bears[i].imageUrl}`;
            productLeftDiv.style.background = "url(" + productLeftDiv.src + ") no-repeat";
            productLeftDiv.style.backgroundPosition = "center";
            productLeftDiv.style.backgroundSize = "cover";
        
        let productRightDiv = document.createElement('div');
            productRightDiv.classList.add("col-7", "title-product");

        let productName = document.createElement('h2');
            productName.innerText = `${bears[i].name}`;

        let price = `${bears[i].price}`;
        let priceComa = price.slice(0,2);
        let productPrice = document.createElement('p');
            productPrice.innerText = "Prix: " + priceComa + `€`;

        let productDescription = document.createElement('p');
            productDescription.innerText = `${bears[i].description}`;

        let btnProduct = document.createElement("button");
            btnProduct.classList.add("btn");
            btnProduct.innerText = "Plus d'information";
            btnProduct.onclick = function OpenProductPage(){
                window.localStorage.setItem('productDetails', JSON.stringify(bears[i]));
                window.open("ficheProduit.html", "_self");
            }

        listBears.append(productCard);
        productCard.append(productLeftDiv,productRightDiv);
        productRightDiv.append(productName,productPrice,productDescription, btnProduct);
    }
}