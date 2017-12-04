'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'views/view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$location', function($scope,$location) {

	$scope.currentQuestion = {};
	$scope.currentQuestion.field_label = 'How is your mood right now?';
	$scope.currentQuestion.field_name = "mood";
	$scope.currentQuestion.select_choices_or_calculations = [];
	$scope.currentQuestion.select_choices_or_calculations[0] = {code:0, value:'Bad', image:'moodface1.png'};
	$scope.currentQuestion.select_choices_or_calculations[1] = {code:1, value:'Somewhat Bad', image:'moodface2.png'};
	$scope.currentQuestion.select_choices_or_calculations[2] = {code:2, value:'Neutral', image:'moodface3.png'};
	$scope.currentQuestion.select_choices_or_calculations[3] = {code:3, value:'Somewhat Good', image:'moodface4.png'};
	$scope.currentQuestion.select_choices_or_calculations[4] = {code:4, value:'Good', image:'moodface5.png'};

	$scope.setValue = function(value){

		localStorage['mood'] = value;
		$scope.nextDisabled = '';

	}

	$scope.nextDisabled = 'disabled';

	$scope.next = function(){$location.url('/view3/')};

}]);