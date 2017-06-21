const express = require("express");
const http = require("http");
const url = require("url");
const WebSocket = require("ws");

const app = express();

app.use(function(req, res){
  res.send({
    msg : "Hello"
  });
})

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

wss.on('connection',function connection(ws,req){
  const location = url.parse(req.url, true);
  console.log("Connection established");
  ws.on('message', function incoming(message){
    console.log('recieved: %s', message);
  });

  ws.send('Hello Mohit');
  setInterval(function(){
    ws.send("This is test message")
  },2000);
})

server.listen(8080,function listening(){
  console.log('Listening on %d',server.address().port);
})
