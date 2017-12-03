'use strict';

angular.module('myApp.view4', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view4', {
    templateUrl: 'views/view4/view4.html',
    controller: 'View4Ctrl'
  });
}])

.controller('View4Ctrl', ['$scope', '$location', '$http', function($scope,$location,$http) {

	$scope.formLoadAttempt = 0;
	$scope.currentQuestionnaire = [];
  $scope.showQuestions = false;

	$http.get('/forms/phq9.json').success(function (data) {
        $scope.phq9 = data;
        $scope.formLoadAttempt++; 
        $scope.choosePath();       
    })
    .error(function (data) {
        console.log("there was an error");
        $scope.formLoadAttempt++;           
        $scope.choosePath();     
    });

   	$http.get('/forms/panas.json').success(function (data) {
        $scope.panas = data;     
        $scope.formLoadAttempt++;   
        $scope.choosePath();       
    })
    .error(function (data) {
        console.log("there was an error");
        $scope.formLoadAttempt++;       
        $scope.choosePath();     
    });

    $http.get('/forms/lss.json').success(function (data) {
        $scope.lss = data;                
        $scope.formLoadAttempt++;           
        $scope.choosePath();     
    })
    .error(function (data) {
        console.log("there was an error");
        $scope.formLoadAttempt++;      
        $scope.choosePath();     
    });

    $scope.onboardingContent = [];
    // Abhi to comment 
    $scope.onboardingContent['phq'] = {text:'PHQ intro content', image:'phq8.png'};

    $scope.onboardingContent['lss'] = {text:'Life Satisfaction Survey intro content', image:'lss.png'};

    $scope.onboardingContent['panas'] = {text:'We are going to ask you to describe different feelings and emotions. On the next few pages, choose the word that best represents how you are feeling right now! ', image:'panas.png'};


    $scope.faceLibrary = ['face1.png','face2.png', 'face3.png', 'face4.png', 'face5.png'];


   	$scope.choosePath = function(){
   		var moodScore = parseInt(localStorage['mood']);
   		if ($scope.formLoadAttempt == 3){

	   		if (moodScore < 3){
	   			$scope.currentQuestionnaire = $scope.phq9;
          $scope.onboardingContentName = 'phq';
	   		} else if (moodScore > 3){
	   			$scope.currentQuestionnaire = $scope.lss;
          $scope.onboardingContentName = 'lss';
	   		} else if (moodScore == 3){
	   			$scope.currentQuestionnaire = $scope.panas;
          $scope.onboardingContentName = 'panas';
          $scope.formDisplayType = 'vertical-scrolling';
          $scope.showResponseImages = true; 
	   		}

        $scope.currentOnboardingText = $scope.onboardingContent[$scope.onboardingContentName].text;
        $scope.currentOnboardingImage = $scope.onboardingContent[$scope.onboardingContentName].image;
   
   			$scope.currentQuestionIndex = 0;
   			$scope.setCurrentQuestion($scope.currentQuestionIndex);
   			
	   	}
   	}

    $scope.startQuestions= function () {
      $scope.showQuestions = true;
    }

   	$scope.setCurrentQuestion = function(index){
   		$scope.currentQuestion= $scope.currentQuestionnaire[$scope.currentQuestionIndex];
   	}

	$scope.next = function(){
		if ($scope.currentQuestionnaire.length-1 > $scope.currentQuestionIndex){
			$scope.currentQuestionIndex++;
			$scope.setCurrentQuestion($scope.currentQuestionIndex);
		} else if ($scope.currentQuestionnaire.length-1 == $scope.currentQuestionIndex){ 
			$location.url('/view5/');
		}
	}

	$scope.back = function(){
		if ($scope.currentQuestionIndex != 0){
			$scope.currentQuestionIndex--;
			$scope.setCurrentQuestion($scope.currentQuestionIndex);
		} else {
			$location.url('/view4/');
		}
	}

}]);