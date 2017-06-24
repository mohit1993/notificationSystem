var Notification = require("./model.js");

var saveNotification = function(from,content,ws){
  // save the created notification;
  Notification.create({
    from: from,
    content: content,
    isRead : false
  })
  .then((notification) => {
        ws.send(JSON.stringify(notification));
      }
  )
  .catch((err) => console.log(err));
}

var markNotificationAsRead = function(notification_id){
  // mark as read
  Notification
    .update(
      {isRead : true},
      {where : { id : notification_id}}
    )
    .then((success) => {
      console.log("updated successful");
      console.log(success);
    });
}

var getAllNotifications = function(ws){
  // return all the notifications
  Notification
    .findAll({
      where : {
        isRead : false
      }},
      {order : 'createdAt DESC'}
    )
    .then( (notifications) => {
      ws.send(JSON.stringify(notifications));
    })
    .catch( (err) => {
      console.log(err);
    })
}

module.exports.saveNotification = saveNotification;
module.exports.markNotificationAsRead = markNotificationAsRead;
module.exports.getAllNotifications = getAllNotifications;
