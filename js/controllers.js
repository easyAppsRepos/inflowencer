angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,  $rootScope, $location) {

 console.log(window.location.href );

 



})
.controller('HomeCtrl', function($scope) {})
.controller('RequestCtrl', function($scope) {

    $scope.openPage = function(link){

  if(link == null || link == 'null' || link == 'undefinded'){console.log('nolink')}

  else{
    //  window.open(link, '_blank', 'location=yes'); return false;
      var refff = cordova.InAppBrowser.open(link, '_blank', 'location=no');

  }  
}


})
.controller('ProfileCtrl', function($scope) {})
.controller('paymentMethodCtrl', function($scope) {})
.controller('personalCtrl', function($scope) {})
.controller('historyCtrl', function($scope) {})
.controller('notisCtrl', function($scope) {})



.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
