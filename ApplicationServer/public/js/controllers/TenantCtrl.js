// public/js/controllers/TenantCtrl.js
angular.module('TenantCtrl', ['ngFileUpload']).controller('TenantController',

function ($scope,$http,$location ,Upload,$window) {

	if($window.localStorage.getItem('username') === null){
		$location.url('/#login');
	}else{
		$scope.username = $window.localStorage.getItem('username');
	}
	
	$scope.submit = function(tenant) {
    	console.log($scope.tenant);
      if ($scope.form.file.$valid && $scope.file) {
        $scope.upload($scope.file, tenant);
      }
    };

    $scope.upload = function (file,tenant) {
        console.log($scope.tenant);
    	console.log(file);
        Upload.upload({
            url: '/generateUML',
            data: {file: file,tenant:$scope.tenant}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            $scope.image = resp.data.image;
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };
    
    $scope.next = function(){
    	$scope.graded = true;
    };
    
    $scope.score = 0;
    
    $scope.submitScore = function(){
    	console.log($scope.tenant);
    	console.log($scope.sid);
    	console.log($scope.comments);
    	
		$http({
			method : "POST",
			url : '/grade',
			data : {
				tenant : $scope.tenant,
				studentID : $scope.sid,
				score : $scope.score,
				comments : $scope.comments
			}
		}).then(function(data) {
			if (data.statusCode === 401) {
				console.log('error: '+ data);
			} else {
				console.log('success: '+ data);
				$scope.graded = true;
				$location.url('/home');
				$scope.tenant = null;
				$scope.sid = null;
				$scope.comments = '';
				$scope.score = 0;
			}
		});
    };
});