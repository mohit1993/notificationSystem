(function(){

  var app = angular.module("notification",[]);

  app.controller('notificationController',['$scope',function($scope){
    $scope.notifications = [];

    if( "WebSocket" in window){
      var ws = new WebSocket("ws://localhost:8080/echo");

      ws.onopen = function(){
        console.log("Websocket connection established");
      }

      ws.onmessage = function(evt){
        var message = evt.data;
        if($scope.notifications.length == 0){
          $scope.notifications = JSON.parse(message);
        }
        else $scope.notifications.concat(JSON.parse(message));
        console.log($scope.notifications.length)
      }

      ws.onclose = function(){
        alert("Connection to websocket closed");
      }

      $rootScope.cleanNotifications = function(){
        var ids = [];
        for(notification in $scope.notifications) ids.push(notification.id);

        ids = JSON.stringify(ids);
        ws.send(ids);
        $scope.notifications = [];
      }
      // wsButton.onclick = function(){
      //   ws.send(JSON.stringify(id));
      // }
    }
    else{
      alert("Browser doesnt support web sockets");
    }
  }]);
})();
