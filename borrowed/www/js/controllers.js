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
    },
    nudge : {
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
  $scope.toggleNudgeTab = function() {
    $scope.tabState.nudge.hidden = !$scope.tabState.nudge.hidden
  }
})

.controller('DashCtrl', function($scope, Chats) {
  $scope.chats = Chats.inventory();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('HomeCtrl', function($scope) {})

.controller('LendCtrl', function($scope, Chats, $ionicModal) {

  $ionicModal.fromTemplateUrl('lend-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal
  })  

  $scope.openModal = function(item) {
    $scope.modal.show();
    $scope.item = item;
  }

  $scope.closeModal = function(item) {
    $scope.item.borrower = item.borrower;
    $scope.item.lent = true;
    $scope.modal.hide();
  };

  $scope.closeNoSubmit = function(item) {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
})


.controller('AddCtrl', function($scope, Chats, $state) {
	$scope.chats = Chats.inventory();
	$scope.createItem = function(item) {
		$scope.chats.push({
      id: Chats.inventory_size(),
      name: item.item_name,
      borrower: null,
      lent: false,
      return_date: null, 
      // placeholder until we decide whether or not to do a photo uploader
      face: 'http://static1.tme.eu/pics/icons/no-image-placeholder-big.png'
    });
    item.item_name = "";
	$state.go('tab.chats');
	};	
})

.controller('ChatsCtrl', function($scope, Chats, $state) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.inventory();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats, $state, $ionicHistory) {
  $scope.chat = Chats.get($stateParams.chatId);
  $scope.goBack = function() {
    $ionicHistory.goBack();
  };
})

.controller('AccountCtrl', function($scope) {
})

.controller('NudgeCtrl', function($scope, $stateParams) {
	
	$scope.goBack = function(){
		$state.go("tab.chats")
	}
		
	ionic.Platform.ready(function(){
		console.log("deviceready");
		shake.startWatch(
			function(){
				console.log("device is being shaken");
				$scope.goBack();
				$scope.$apply();
			}, 40);
	})
});
