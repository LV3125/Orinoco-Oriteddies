function askRequest(method, url, callback, data){
    // Create a request variable and assign a new XMLHttpRequest object to it.
    let request = new XMLHttpRequest(); //objet
    
    request.onreadystatechange = function(){
        if(this.readyState == XMLHttpRequest.DONE && [200, 201].indexOf(this.status) !== false){
            callback(JSON.parse(this.responseText, this.status));
        }
    };
    // Open a new connection, using the GET request on the URL endpoint
    request.open(method, url);
    request.setRequestHeader("Content-Type", "application/json");
    if(method == 'POST'){
        request.send(JSON.stringify(data));
    }else{
        request.send();
    }
  
}