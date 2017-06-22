const Notification = sequelize.define('notification',{
  title : {
    type : Sequelize.STRING
  },
  detail : {
    type : Sequelize.STRING
  },
  isRead : {
    type : Sequelize.BOOLEAN
  }
});

Notification.sync({force:false}).then(() => {
  console.log("Table Created");
})
