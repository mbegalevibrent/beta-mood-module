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
	$scope.currentQuestion.select_choices_or_calculations[0] = {code:0, label:'Bad', image:'moodface1.png'};
	$scope.currentQuestion.select_choices_or_calculations[1] = {code:1, label:'Somewhat Bad', image:'moodface2.png'};
	$scope.currentQuestion.select_choices_or_calculations[2] = {code:2, label:'Neutral', image:'moodface3.png'};
	$scope.currentQuestion.select_choices_or_calculations[3] = {code:3, label:'Somewhat Good', image:'moodface4.png'};
	$scope.currentQuestion.select_choices_or_calculations[4] = {code:4, label:'Good', image:'moodface5.png'};
	$scope.currentQuestion.answer = null;


	$scope.setValue = function(value){
		$scope.currentQuestion.answer = value;
		localStorage['mood'] = value;
	}

	$scope.next = function(){$location.url('/view3/')};

}]);