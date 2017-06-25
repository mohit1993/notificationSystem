(function(){
  var id;
  if( "WebSocket" in window){
    alert("Web Socket supported by browser");

    var ws = new WebSocket("ws://localhost:8080/echo");

    ws.onopen = function(){
      // ws.send("Message send");
      console.log("Message for open is sent");
    }

    ws.onmessage = function(evt){
      var message = evt.data;
      if(JSON.parse(message).id){
        id = JSON.parse(message).id;
        console.log("id is ",id);
      }
      console.log("Message is %s",message);
    }

    ws.onclose = function(){
      console.log("Connection to socket closed");
    }

    wsButton.onclick = function(){
      ws.send(JSON.stringify(id));
    }  }
  else{
    alert("Browser doesnt support web sockets");
  }
})();
