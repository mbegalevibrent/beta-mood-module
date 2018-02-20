'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'views/view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$location', function($scope, $location) {

var nextView = 'moodRating';

$scope.currentIndex = 0;

$scope.onboardingContent = [];

$scope.onboardingContent[0] = {text:'Research has shown that happiness and sadness can affect your health in many different ways.', image:'slide1.png'};
$scope.onboardingContent[1] = {text:'We want to understand if feeling happy or sad is related to other health information you’ve shared with us.', image:'slide1.png'};

$scope.onboardingContent[2] = {text:'You can help us by answering some questions about your mood.', image:'slide1.png'};
$scope.onboardingContent[3] = {text:'You will be asked to answer a brief daily question about your mood and a few longer questionnaires once a week. <br> <br> You don’t have to answer anything you don’t want to!', image:'slide3.png'};

$scope.onboardingContent[4] = {text:'We will also send you reminders to answer these questions. <br> You can control how often you receive a reminder.', image:'slide2.png'};

$scope.currentText = $scope.onboardingContent[$scope.currentIndex].text;
$scope.currentImage = $scope.onboardingContent[$scope.currentIndex].image;

$scope.next = function(){
	if ($scope.onboardingContent.length-1 > $scope.currentIndex){
		$scope.currentIndex++;
		$scope.currentText = $scope.onboardingContent[$scope.currentIndex].text;
		$scope.currentImage = $scope.onboardingContent[$scope.currentIndex].image;
	} else if ($scope.onboardingContent.length-1 == $scope.currentIndex){ 
		$location.url('/view2');
	}
}
$scope.back = function(){
	if ($scope.currentIndex != 0){
		$scope.currentIndex--;
		$scope.currentText = $scope.onboardingContent[$scope.currentIndex].text;
		$scope.currentImage = $scope.onboardingContent[$scope.currentIndex].image;
	}
}

$scope.firstSlideTrue = function(){
	return $scope.currentIndex == 0
}


}]);