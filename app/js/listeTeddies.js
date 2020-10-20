
// Appel de l'Api
const url = "http://localhost:3000/api/teddies";
// Séléction de la balise div conteneur des produits
const listBears = document.getElementById('fromServer');

//Fonction
let request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    let response = JSON.parse(this.responseText);
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) { 
            let response = JSON.parse(this.responseText);                   
            console.log(response);

            function oursEnPeluche() {                                      
                for(let i = 0; i < response.length; i++) { 
                    let productCard = document.createElement('section');
                        productCard.classList.add('row', 'product');

                    let productLeftDiv = document.createElement('div');
                        productLeftDiv.classList.add("col-5", "image-product")
                        productLeftDiv.src = response[i].imageUrl;
                        productLeftDiv.style.background = "url(" + productLeftDiv.src + ") no-repeat";
                        productLeftDiv.style.backgroundPosition = "center";
                        productLeftDiv.style.backgroundSize = "cover";

                    let productRightDiv = document.createElement('div');
                        productRightDiv.classList.add("col-7", "title-product");

                    let productName = document.createElement('h2');
                        productName.innerText = response[i].name;

                    let productPrice = document.createElement('p');
                        productPrice.innerHTML = response[i].price/100 + " €";

                    let productDescription = document.createElement('p');
                        productDescription.innerText = response[i].description;

                    let btnProduct = document.createElement("a");
                        btnProduct.classList.add("btn");
                        btnProduct.textContent = "En savoir plus";
                        btnProduct.setAttribute("href", "ficheProduit.html#" + response[i]._id);
                        

                    listBears.append(productCard);
                    productCard.append(productLeftDiv,productRightDiv);
                    productRightDiv.append(productName,productPrice,productDescription, btnProduct);
                    
                };
            };
            oursEnPeluche();                                               
            
        };
    };
};
request.open("GET", url);
request.send();

