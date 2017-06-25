const express = require("express");
const http = require("http");
const url = require("url");
const WebSocket = require("ws");
var notification = require("./controller.js")
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
  notification.getAllNotifications(ws);

  ws.on('message', function incoming(message){
    console.log('recieved: %s', message);
    var id = JSON.parse(message);
    //notification.markNotificationAsRead(id);
  });

  var from = "Mohit Goyal";
  var content = "Hi i want to be you friend";
  notification.saveNotification(from,content,ws);
  // setInterval(function(){
  //   ws.send("This is test message")
  // },2000);
})

server.listen(8080,function listening(){
  console.log('Listening on %d',server.address().port);
})
