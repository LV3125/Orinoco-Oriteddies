/*
* Requête GET
* - Requête vers l'API pour récupérer les données des produits sous forme de Promesse en fonction de l'url passer en paramètre
* - Si réussi: fonction resolve pour récupèrer la réponse
* - Si échec: fonction reject pour récupèrer la requète et afficher l'erreur.
*/
let getResp = url => {
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
* Requête POST
* - Requête vers l'API pour envoyer les données au serveur sous forme de Promesse
* - Si réussi: fonction resolve pour récupérer la réponse
* - Si échec: fonction reject pour récupèrer la requète et afficher l'erreur.
*/
let reqToServer = (url, obj) => {
return new Promise(function(resolve, reject){
    let req = new XMLHttpRequest();
        req.open("POST", url);
        req.setRequestHeader("Content-Type", "application/json");
        req.send(JSON.stringify(obj));
        req.onreadystatechange = function() {
            if(req.readyState == XMLHttpRequest.DONE){
                if(req.status == 201){
                    resolve(req.responseText);
                }else{
                    reject(req);
                }
            }
        }
});
}