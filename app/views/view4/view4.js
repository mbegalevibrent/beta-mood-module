'use strict';

angular.module('myApp.view4', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view4', {
    templateUrl: 'views/view4/view4.html',
    controller: 'View4Ctrl'
  });
}])

.controller('View4Ctrl', ['$scope', '$location', '$http', '$window', function($scope,$location,$http) {
  var moodScore = parseInt(localStorage['mood']);

	$scope.formLoadAttempt = 0;
	$scope.currentQuestionnaire = [];
  $scope.showQuestions = false;
  $scope.maxQuestionIndex = 0;
  $scope.questionsFinished = false;
  $scope.answers = [];


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
    var PHQ9_INTRO = '<p><b> placeholder PHQ-9: a depression screening tool</b><br/>The Patient Health Questionnaire, or PHQ-9, is a clinically validated 9-question screening tool used widely by doctors and health professionals. It takes about 5 minutes to answer the questions and get results.</p>';

    $scope.onboardingContent['phq'] = {text: PHQ9_INTRO, image:'phq8.png'};
    $scope.onboardingContent['lss'] = {text:'Life Satisfaction Survey intro content', image:'lss.png'};
    $scope.onboardingContent['panas'] = {text:'We are going to ask you to describe different feelings and emotions. On the next few pages, choose the word that best represents how you are feeling right now! ', image:'panas.png'};


    $scope.phq9WarningTitle = 'Risks';
    $scope.phq9WarningContents = '<p><strong>Get immediate help by phone. &nbsp;If you&rsquo;re thinking about&nbsp;suicide&nbsp;or would like emotional support, help is available 24/7. &nbsp;Call the&nbsp;National&nbsp;Suicide&nbsp;Prevention Line (participant can click on link to 1-800-273-TALK).</strong></p>';

    $scope.setQuestionArrayValue = function(index,value){
      $scope.answers[index] = value;
      $scope.currentQuestionIndex = index + 1;
      if($scope.maxQuestionIndex < $scope.currentQuestionIndex){
        $scope.maxQuestionIndex = $scope.currentQuestionIndex;
        $("html, body").animate({ scrollTop: $(document).height() }, "slow");
      }

      if (index+1 == $scope.currentQuestionnaire.length){
        $scope.questionsFinished = true;
      }
      
      localStorage['answers'] = $scope.answers;
    }

    $scope.saveValue = function(value, field_name){

      if ($scope.onboardingContentName == 'phq' && field_name == 'phq9_9' && parseInt(value) > 0){
          $scope.showPH9Warning();
      } 
      // else {
      //   $scope.next();
      // }

    }



    $scope.showPH9Warning = function(){
      $('#phq9Warning').modal();
    }

    $scope.faceLibrary = ['face1.png','face2.png', 'face3.png', 'face4.png', 'face5.png'];


   	$scope.choosePath = function(){
   		if ($scope.formLoadAttempt == 3){

	   		if (moodScore < 3){
	   			$scope.currentQuestionnaire = $scope.phq9;
          $scope.showNext = 'panas';
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
      $scope.nextPage();
		}
	}

  $scope.nextPage = function(){

      if (moodScore < 3 || moodScore > 3){
          localStorage['mood'] = 3;
          $location.url('/view4/');
      } else {
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