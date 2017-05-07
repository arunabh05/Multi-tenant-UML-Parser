// public/js/app.js
var app = angular.module('CloudGrader', [ 'ngRoute', 'appRoutes', 'MainCtrl',
		'LoginCtrl', 'TenantCtrl' ]);
app.config([ '$qProvider', function($qProvider) {
	$qProvider.errorOnUnhandledRejections(false);
} ]).directive('stringToNumber', function() {
	return {
		require : 'ngModel',
		link : function(scope, element, attrs, ngModel) {
			ngModel.$parsers.push(function(value) {
				return '' + value;
			});
			ngModel.$formatters.push(function(value) {
				return parseFloat(value);
			});
		}
	};
});
;
