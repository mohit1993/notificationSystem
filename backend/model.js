var Conf = require('./config.js')

const Notification = Conf.sequelize.define('notification',{
  title : {
    type : Conf.Sequelize.STRING
  },
  detail : {
    type : Conf.Sequelize.STRING
  },
  isRead : {
    type : Conf.Sequelize.BOOLEAN
  }
});

Notification.sync({force:false}).then(() => {
  console.log("Table Created");
})
.catch((err) => {
  console.log(err);
})
