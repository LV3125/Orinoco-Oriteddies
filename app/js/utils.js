function askRequest(method, url, callback, data){
    //Création d'une variable à laquelle on assigne une nouvelle requête
    let request = new XMLHttpRequest(); //initialise un objet

    request.onreadystatechange = function(){
        if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
            callback(JSON.parse(this.responseText, this.status));
        }
    }

    //Ouvre et envoi une nouvelle requête au serveur
    request.open(method, url);
    request.setRequestHeader("Content-Type", "application/json");
    if(method == "POST"){
        request.send(JSON.stringify(data));
    }else{
        request.send();
    }
}