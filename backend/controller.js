var db = require("./model.js");

var notification = {};

var saveNotification = function(title,detail){
  // save the created notification;
}

var markNotificationAsRead = function(notification_id){
  // mark as read
}

var getAllNotifications = function(){
  // return all the notifications
}

notification.saveNotification = saveNotification;
notification.markNotificationAsRead = markNotificationAsRead;
notification.getAllNotifications = getAllNotifications;

module.exports.notifications = notification;
