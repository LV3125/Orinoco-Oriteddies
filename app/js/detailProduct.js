// Appel de l'Api
const url = "http://localhost:3000/api/teddies";

// Récupération de l'id via l'URL
const hash = window.location.hash;
const idHash = hash.replace('#', '/');
const nomUrl = url + idHash;

// Balise div séléctionner 
const productCard = document.getElementById('productCard');

// Requete + fonction
let request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    let response = JSON.parse(this.responseText);
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) { //Vérification si c'est bon
            let response = JSON.parse(this.responseText);                   //Récupération des données en JSON.parse
            console.log(response);

            function ours() {

                // Sélection des éléments
                let productTitle = document.createElement("h1");
                    productTitle.textContent = response.name;

                let productImage = document.createElement("div");
                    productImage.classList.add("productImagePageDetail");
                    productImage.src = response.imageUrl;
                    productImage.style.background = "url(" + productImage.src + ") no-repeat";
                    productImage.style.backgroundPosition = "center";
                    productImage.style.backgroundSize = "contain";

                let productPrice = document.createElement("p");
                    productPrice.textContent = response.price/100 + " €";

                let productDescription = document.createElement("p");
                    productDescription.innerHTML = response.description;

                let colorDiv = document.createElement("div");

                let choiceLabel = document.createElement("label");
                    choiceLabel.innerText = "Choisissez une couleur: ";

                let colorsSelector = document.createElement("select");
                    colorsSelector.setAttribute("class", "color_ours");
                let colors = response.colors;
                for (let i = 0; i < colors.length; i++) {
                    let myOption = document.createElement('option');
                    myOption.textContent = colors[i];
                    myOption.setAttribute("value", colors[i]);
                    colorsSelector.appendChild(myOption);                
                };

                const mySubmit = document.querySelector('.btn_add');
                
                colorDiv.prepend(choiceLabel, colorsSelector);
                productCard.prepend(productTitle, productImage, productPrice, productDescription, colorDiv);
                
                // Stockage des informations dans le localStorage
                mySubmit.addEventListener('click', function (event) {
                    let objJson = {
                        id: response._id,
                        name: response.name,
                        image: response.imageUrl,
                        colors: colorsSelector.value,
                        price: response.price,
                        qte: 1
                    };
                    
                    let tableOfProducts = localStorage.getItem("obj");

                    //On vérifie si la liste existe
                    if(!tableOfProducts){
                        //Si elle n'existe pas
                        tableOfProducts = [];
                        objJson.qte = 1;
                        tableOfProducts.push(objJson);
                    }else{ 
                        //Si elle existe
                        tableOfProducts = JSON.parse(tableOfProducts);
                        console.log(tableOfProducts);

                        //On vérifie si le produit choisi est présent dans le tableau en comparant les id
                        if(tableOfProducts.find( choice => choice.id === objJson.id &&  choice.colors === objJson.colors)){
                            //Si il existe
                            objJson.qte++;
                            for(var i = 0; i < tableOfProducts.length; i++){
                                if(objJson.id === tableOfProducts[i].id && objJson.colors === tableOfProducts[i].colors){
                                    tableOfProducts[i].qte++;
                                    break;
                                }
                            }
                        }else{
                            //Si il n'existe pas
                            objJson.qte = 1;
                            tableOfProducts.push(objJson);
                        }
                    }

                    //On encode le tableau au format JSON avant de l'envoyer
                    tableOfProducts = JSON.stringify(tableOfProducts);

                    //On renvoie le tableau au localStorage
                    localStorage.setItem("obj", tableOfProducts);

                    
                    //Fenêtre PoPup
                    let popupAdded = document.getElementById("popupAdd");
                    if(popupAdded.classList.contains("hide")){
                        popupAdded.classList.remove("hide");
                    }else{
                        popupAdded.classList.add("hide");
                    }
                });
            };         
            ours();
        };
    };
};
request.open("GET", nomUrl);
request.send();


