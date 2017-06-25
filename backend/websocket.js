const express = require("express");
const http = require("http");
const url = require("url");
const WebSocket = require("ws");
var notification = require("./controller.js");
var Data = require("./data.js");

const app = express();

app.use(function(req, res){
  res.send({
    msg : "Hello WebSocket is now running"
  });
})

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

wss.on('connection',function connection(ws,req){
  const location = url.parse(req.url, true);
  console.log("Connection established with the client websocket");

  // Send all unread notifications to frontend
  notification.getAllNotifications(ws);

  var randomMesssageIndex = 0;
  var randomNameIndex = 0;

  //Randomly generate new notifications between 1sec - 5sec
  var sendNotification = function(){
    randomNameIndex     = Math.round(Math.random() * (Data.names.length-1));
    randomMesssageIndex = Math.round(Math.random() * (Data.messages.length-1));
    notification.saveNotification(
      Data.names[randomNameIndex],
      Data.messages[randomMesssageIndex],
      ws
    );
    setTimeout(sendNotification,(Math.round(Math.random() * 4000) + 1000));
  }
  sendNotification();

  //On receiving read notification id, save to database
  ws.on('message', function incoming(message){
    console.log('recieved ids: %s', message);
    var ids = JSON.parse(message);
    notification.markNotificationAsRead(ids);
  });

})

server.listen(8080,function listening(){
  console.log('Listening on %d',server.address().port);
})
