
// Appel de l'Api
const url = "http://localhost:3000/api/teddies";
// Séléction de la balise div conteneur des produits
const listBears = document.getElementById('fromServer');

//Fonction
let catchError = e => {
    console.error("Erreur Ajax:" + e);
}

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

getTeddies(url).then(response => {
    let teddies = JSON.parse(response);
    console.log(teddies);
    createListTeddies(teddies);
}).catch(catchError)
.then(function(){
    console.log("Fin des requêtes Ajax");
});

//Fonction globale pour créer la liste des ours en peluche présent sur l'API
function createListTeddies(teddies){
    for(let i = 0; i < teddies.length; i++) { 
        let productCard = document.createElement('section');
            productCard.classList.add('row', 'product');

        let productLeftDiv = document.createElement('div');
            productLeftDiv.classList.add("col-5", "image-product")
            productLeftDiv.src = teddies[i].imageUrl;
            productLeftDiv.style.background = "url(" + productLeftDiv.src + ") no-repeat";
            productLeftDiv.style.backgroundPosition = "center";
            productLeftDiv.style.backgroundSize = "cover";

        let productRightDiv = document.createElement('div');
            productRightDiv.classList.add("col-7", "title-product");

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