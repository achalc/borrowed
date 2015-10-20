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

.controller('DashCtrl', function($scope, Chats, $rootScope) {
  $scope.chats = Chats.inventory();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
  $rootScope.showFooter = true;
})

.controller('HomeCtrl', function($scope, $rootScope) {
	$rootScope.showFooter = false;
})


.controller('LendCtrl', function($scope, Chats, $ionicModal, $filter, $rootScope) {

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

  $scope.received = function(item) {
    item.lent = false;
    item.return_date = null;
    item.lend_date = null;
  }

  $scope.closeModal = function(item) {
    $scope.item.borrower = item.borrower;
    $scope.item.lent = true;
    $scope.item.lend_date = $filter('date')(new Date(), 'MM/dd/yy');
    $scope.modal.hide();
  };

  $scope.closeNoSubmit = function(item) {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  $rootScope.showFooter = true;
})


.controller('AddCtrl', function($scope, Chats, $state, $rootScope) {
	$scope.chats = Chats.inventory();
	$scope.createItem = function(item) {
		$scope.chats.push({
      id: Chats.inventory_size(),
      name: item.item_name,
      borrower: null,
      lent: false,
      lend_date: null,
      return_date: null, 
      // placeholder until we decide whether or not to do a photo uploader
      face: 'http://static1.tme.eu/pics/icons/no-image-placeholder-big.png'
    });
    item.item_name = "";
	$state.go('tab.chats');
	};	
	$rootScope.showFooter = true;
})

.controller('ChatsCtrl', function($scope, Chats, $state, $rootScope) {
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
  $rootScope.showFooter = true;
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats, $state, $ionicHistory, $rootScope) {
  $scope.chat = Chats.get($stateParams.chatId);
  $scope.goBack = function() {
    $ionicHistory.goBack();
  };
  $rootScope.showFooter = true;
})

.controller('AccountCtrl', function($scope, $rootScope) {
	$rootScope.showFooter = true;
})

.controller('NudgeCtrl', function($scope, $stateParams, $rootScope, $ionicPlatform, $cordovaDeviceMotion, $ionicPopup, $timeout) {

	//document.addEventListener("deviceready", function () {
    //
	//    $cordovaDeviceMotion.getCurrentAcceleration().then(function(result) {
	//      var X = result.x;
	//      var Y = result.y;
	//      var Z = result.z;
	//      var timeStamp = result.timestamp;
	//    }, function(err) {
	//      // An error occurred. Show a message to the user
	//    });
    //
	//  }, false);
    //
	//  // watch Acceleration
	//  var options = { frequency: 20000 };
    //
	//  document.addEventListener("deviceready", function () {
    //
	//    var watch = $cordovaDeviceMotion.watchAcceleration(options);
	//    watch.then(
	//      null,
	//      function(error) {
	//      // An error occurred
	//      },
	//      function(result) {
	//        var X = result.x;
	//        var Y = result.y;
	//        var Z = result.z;
	//        var timeStamp = result.timestamp;
	//    });
    //
    //
	//    watch.clearWatch();
	//    // OR
	//    $cordovaDeviceMotion.clearWatch(watch)
	//      .then(function(result) {
	//        // success
	//        }, function (error) {
	//        // error
	//      });
    //
	//  }, false);
	  

	$scope.options = { 
		frequency: 100, // Measure every 100ms
        deviation : 25  // We'll use deviation to determine the shake event, best values in the range between 25 and 30
	};
    
	// Current measurements
	$scope.measurements = {
		x : null,
		y : null,
		z : null,
		timestamp : null
	}
    
	// Previous measurements	
	$scope.previousMeasurements = {
		x : null,
		y : null,
		z : null,
		timestamp : null
	}	
	
	// Watcher object
	$scope.watch = null;
	
	// Start measurements when Cordova device is ready
    $ionicPlatform.ready(function() {
		
		//Start Watching method
		$scope.startWatching = function() {		
    
		    // Device motion configuration
			$scope.watch = $cordovaDeviceMotion.watchAcceleration($scope.options);
			
			// Device motion initilaization
			$scope.watch.then(null, function(error) {
				console.log('Error');
			  },function(result) {
				  
				// Set current data  
				$scope.measurements.x = result.x;
				$scope.measurements.y = result.y;
				$scope.measurements.z = result.z;
				$scope.measurements.timestamp = result.timestamp;				  
				  
				// Detecta shake  
				$scope.detectShake(result);  
				  				
			});		
		};		
		
		// Stop watching method
		$scope.stopWatching = function() {	
			$scope.watch.clearWatch();
        }		
		
		// Detect shake method		
		$scope.detectShake = function(result) {	
		
		    //Object to hold measurement difference between current and old data
            var measurementsChange = {};
			
			// Calculate measurement change only if we have two sets of data, current and old
			if ($scope.previousMeasurements.x !== null) {
				measurementsChange.x = Math.abs($scope.previousMeasurements.x, result.x);
				measurementsChange.y = Math.abs($scope.previousMeasurements.y, result.y);
				measurementsChange.z = Math.abs($scope.previousMeasurements.z, result.z);
			}
			
			// If measurement change is bigger then predefined deviation
			if (measurementsChange.x + measurementsChange.y + measurementsChange.z > $scope.options.deviation) {
				$scope.stopWatching();  // Stop watching because it will start triggering like hell
                console.log('Shake detected'); // shake detected
				setTimeout($scope.startWatching(), 1000);  // Again start watching after 1 sex
				
				// Clean previous measurements after succesfull shake detection, so we can do it next time
				$scope.previousMeasurements = { 
					x: null, 
					y: null, 
					z: null
				}				
				$state.go('tab.chats');
			} else {
				// On first measurements set it as the previous one
				$scope.previousMeasurements = {
					x: result.x,
					y: result.y,
					z: result.z
				}
			}			
			
        }		
		
    });
	
	//$scope.$on('$ionicView.beforeLeave', function(){
	//    $scope.watch.clearWatch(); // Turn off motion detection watcher
	//});	
	
    $scope.nudgedPopup = function() {
    var nudgePopup = $ionicPopup.show({
      title: 'Nudge has been sent.'
    });
    nudgePopup.then(function(res) {
      console.log('Tapped!', res);
    });
    $timeout(function() {
       nudgePopup.close(); //close the popup after 3 seconds for some reason
    }, 1500);
  };
  
  //$scope.startWatching();			
	$rootScope.showFooter = true;
});
