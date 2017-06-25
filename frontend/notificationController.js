(function(){
  var app = angular.module('notification',[]);

  app.controller('notificationController',['$scope',function($scope){
    $scope.notifications = [];

    if( "WebSocket" in window){
      var ws = new WebSocket("ws://localhost:8080/echo");

      ws.onopen = function(){
        console.log("Websocket connection established");
      }

      ws.onmessage = function(evt){
        var message = evt.data;
        $scope.notifications = $scope.notifications.concat(JSON.parse(message));
        $scope.$apply();
        console.log($scope.notifications.length)
      }

      ws.onclose = function(){
        alert("Connection to websocket closed");
      }

      $('#myDropdown').on('hide.bs.dropdown', function () {
        var ids = [];
        for(var i in $scope.notifications){
          ids.push($scope.notifications[i].id);
          console.log(ids);
        }
        ids = JSON.stringify(ids);
        ws.send(ids);
        $scope.notifications = [];
        $scope.$apply();
      });
    }
    else{
      alert("Browser doesnt support web sockets");
    }
  }]);
})();
