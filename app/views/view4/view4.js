'use strict';

angular.module('myApp.view4', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view4', {
    templateUrl: 'views/view4/view4.html',
    controller: 'View4Ctrl'
  });
}])
.controller('View4Ctrl', ['$scope', '$location', '$http', '$window', '$sce', function($scope,$location,$http,$sce) {
  var moodScore = parseInt(localStorage['mood']);

	$scope.formLoadAttempt = 0;
	$scope.currentQuestionnaire = [];
  $scope.showQuestions = false;
  $scope.maxQuestionIndex = 0;
  $scope.questionsFinished = false;
  $scope.onboardingContent = [];
  $scope.answers = [];
  $scope.faceLibrary = ['num1.png','num2.png', 'num3.png', 'num4.png', 'num5.png'];
  $scope.faceDesc = ['Very slightly or not at all', 'A little', 'Moderately', 'Quite a bit', 'Extremely']; 
  
  // Abhi to comment 
  var PHQ9_INTRO = 'We are going to ask you some questions about how you’re doing. This usually takes no more than 2 minutes.';
  $scope.onboardingContent['phq'] = {text: PHQ9_INTRO, image:'phq9.png'};
  $scope.onboardingContent['lss'] = {text:'Please read each of the following statements. Then, tell us how much you agree with each one on a scale from 1 (Strongly Disagree) to 7 (Strongly Agree).', image:'lss.png'};
  $scope.onboardingContent['panas'] = {text:'Once a week we will show you a number of words that describe different feelings and emotions. <br> Read each word and then select how much you feel this way right now, at this moment, on a scale from 1 (not at all) to 5 (extremely).', image:'panas.png'};
  $scope.phq9WarningTitle = '<i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Risks';
  $scope.phq9WarningContents = '<p>Get immediate help by phone. If you&rsquo;re thinking about suicide or would like emotional support, help is available 24/7.</p><p> If you need help:<br/> <a class="btn btn-primary" phone:"+1-800-273-TALK">Call the National Suicide Prevention Line</a></p>';

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

    localStorage[field_name] = value;
    // else {
    //   $scope.next();
    // }

  }

  $scope.showPH9Warning = function(){
    $('#phq9Warning').modal();
  }

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