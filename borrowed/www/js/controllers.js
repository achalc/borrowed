angular.module('starter.controllers', [])

.controller("TabsController", function($scope) {
  
  $scope.tabState = {
    account : {
      hidden : true
    },
    home : {
      hidden : true
    },
    add : {
      hidden : true
    }
  };
    
  $scope.toggleAccountTab = function() {
    $scope.tabState.account.hidden = !$scope.tabState.account.hidden
  }  
  $scope.toggleHomeTab = function() {
    $scope.tabState.home.hidden = !$scope.tabState.home.hidden
  } 
  $scope.toggleAddTab = function() {
    $scope.tabState.add.hidden = !$scope.tabState.add.hidden
  }
})

.controller('DashCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('HomeCtrl', function($scope) {})

.controller('AddCtrl', function($scope) {})

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
});
