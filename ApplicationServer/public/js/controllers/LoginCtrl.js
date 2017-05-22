// public/js/controllers/LoginCtrl.js
angular.module('LoginCtrl', []).controller('LoginController',

function($scope, $http, $location, $window) {
	$scope.invalid_login = true;
	$scope.invalid_register = true;
	$scope.email_unmatch = true;
	
	if ($window.localStorage.getItem('username') !== null ) {
		$http({
			method : "GET",
			url : '/records',
		}).then(function(data) {
			console.log(data);
			$scope.tenant1 = data.data.tenant1;
			console.log(data.data.tenant1[0].COLUMN_2);
			$scope.tenant2 = data.data.tenant2;
			$scope.tenant3 = data.data.tenant3;
			$scope.tenant4 = data.data.tenant4;
		});
	}
	
	$scope.signIn = function(userId, pass) {
		$http({
			method : "POST",
			url : '/login',
			data : {
				"username" : $scope.userId,
				"password" : $scope.password
			}
		}).then(function(response) {
			console.log(response.data);
			if (response.data.statusCode == 401) {
				$scope.invalid_login = false;
			} else {
				$scope.username = response.data.user;
				$window.localStorage.setItem('username',$scope.username);
				$location.url('/home');
				$scope.invalid_login = true;
			}
		});
	};

	$scope.validateLogin = function() {
		$scope.invalid_login = true;

		var userId = $scope.userId;
		var pass = $scope.password;

		if (userId.indexOf('=') !== -1 || userId.indexOf(';') !== -1
				|| pass.indexOf('=') !== -1 || pass.indexOf(';') !== -1) {
			$scope.invalid_login = false;
			console.log("Injection Attack");
		} else {
			$scope.signIn(userId, pass);
		}
	};

	$scope.registerUser = function(fname, lname, email, pass2) {
		$http({
			method : "POST",
			url : '/register',
			data : {
				"username" : $scope.username2,
				"password" : $scope.password2,
				"email" : $scope.email,
				"firstname" : $scope.fname,
				"lastname" : $scope.lname
			}
		}).success(function(response) {
			if (response.data.statusCode == 401) {
				$scope.invalid_register = true;

			} else {
				$location('/');
				$scope.invalid_login = true;
			}
		}).error(function(error) {
			$scope.invalid_register = true;
		});
	};

	$scope.validateRegister = function() {

		$scope.invalid_register = true;
		$scope.email_unmatch = true;

		var fname = $scope.fname;
		var lname = $scope.lname;
		var username2 = $scope.username2;
		var email = $scope.email;
		var remail = $scope.remail;
		var pass2 = $scope.password2;

		if (remail !== email) {
			$scope.email_unmatch = false;
		} else {
			if (fname.indexOf('=') !== -1 || lname.indexOf('=') !== -1
					|| username2.indexOf('=') !== -1
					|| email.indexOf('=') !== -1 || pass2.indexOf(';') !== -1) {
				$scope.invalid_register = false;
				console.log("Injection Attack");
			} else {
				$scope.registerUser(fname, lname, username2, email, pass2);
			}
		}
	};
	
	$scope.logout = function(){
		$scope.username = null;
		$http({
			method : "POST",
			url : '/logout',
		}).then(function(response) {
			if (response.data.statusCode == 401) {
				$scope.invalid_register = true;
				$window.localStorage.removeItem('username');
				$location.url('/');
			} else {
				console.log('here');
				$location.url('/');
				$window.localStorage.removeItem('username');
				$scope.invalid_login = true;
			}
		});
	};
});