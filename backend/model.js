var Conf = require('./config.js')

var Notification = Conf.sequelize.define('notification',{
  from : {
    type : Conf.Sequelize.STRING
  },
  content : {
    type : Conf.Sequelize.STRING
  },
  isRead : {
    type : Conf.Sequelize.BOOLEAN
  }
},{
  timestamps : false
});

Notification.sync({force:false}).then(() => {
  console.log("Table Created");
})
.catch((err) => {
  console.log(err);
})

module.exports = Notification;
