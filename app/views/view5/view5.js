'use strict';

angular.module('myApp.view5', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view5', {
    templateUrl: 'views/view5/view5.html',
    controller: 'View5Ctrl'
  });
}])

.controller('View5Ctrl', ['$scope', '$location','$http', function($scope,$location,$http) {


	var thresholdMap = [];
	thresholdMap[0] = ['panasPositive',10,19,'panaspositive_extremely_low','img/PANAS_Feedback'];
	thresholdMap[1] = ['panasPositive',20,26,'panaspositive_very_low','img/PANAS_Feedback'];
	thresholdMap[2] = ['panasPositive',27,33,'panaspositive_low','img/PANAS_Feedback'];
	thresholdMap[3] = ['panasPositive',34,40,'panaspositive_high','img/PANAS_Feedback'];
	thresholdMap[4] = ['panasPositive',41,47,'panaspositive_very_high','img/PANAS_Feedback'];
	thresholdMap[5] = ['panasPositive',47,100,'panaspositive_extremely_high','img/PANAS_Feedback'];
	thresholdMap[6] = ['panasNegative',10,11,'panasnegative_very_low','img/PANAS_Feedback'];
	thresholdMap[7] = ['panasNegative',12,17,'panasnegative_low','img/PANAS_Feedback'];
	thresholdMap[8] = ['panasNegative',18,23,'panasnegative_high','img/PANAS_Feedback'];
	thresholdMap[9] = ['panasNegative',24,29,'panasnegative_very_high','img/PANAS_Feedback'];
	thresholdMap[10] = ['panasNegative',29,100,'panasnegative_extremely_high','img/PANAS_Feedback'];
	thresholdMap[11] = ['phq9Score',0,5,'phq9_low','img/PHQ_Feedback'];
	thresholdMap[12] = ['phq9Score',6,11,'phq9_medium','img/PHQ_Feedback'];
	thresholdMap[13] = ['phq9Score',12,15,'phq9_high','img/PHQ_Feedback'];
	thresholdMap[14] = ['phq9Score',16,100,'phq9_very_high','img/PHQ_Feedback'];	
	thresholdMap[15] = ['lssScore',5,9,'lss_extremely_dissatisfied','img/PANAS_Feedback'];
	thresholdMap[16] = ['lssScore',10,14,'lss_dissatisfied','img/PANAS_Feedback'];
	thresholdMap[17] = ['lssScore',15,19,'lss_below_avg','img/PANAS_Feedback'];
	thresholdMap[18] = ['lssScore',20,24,'lss_avg','img/PANAS_Feedback'];
	thresholdMap[19] = ['lssScore',25,29,'lss_high','img/PANAS_Feedback'];
	thresholdMap[20] = ['lssScore',30,35,'lss_very_high','img/PANAS_Feedback'];









	$http.get('/forms/feedback.json').success(function (data) {
	      $scope.feedback = data;
	      $scope.loadFeedback();       
	  })
	  .error(function (data) {
	      console.log("there was an error");
	      $scope.loadFeedback();       
	});


	var feedbackOptions = [];
	// Abhi -- proposal
	// we start by triaging feedback to mood alone
	// then we triage to a "gross score" of lss, phq, panas
	// then we triage to a "per item" of lss, phq, panas	
	// if we decide that the form is 
	// Ref- Kroenke, K., Spitzer, R. L., & Williams, J. B. (2001). The PHQ-9: Validity of a brief depression severity measure. Journal of General Internal Medicine, 169, 606–613.

	$scope.phq9Score = function(){

		var sum = 0;

		for (var i = 0; i < 9; i++) {
		   sum += parseInt(localStorage['phq9_' + (i+1)])
		}

		return sum
	}

	$scope.lssScore = function(){

		var sum = 0;

		for (var i = 0; i < 5; i++) {
		   sum += parseInt(localStorage['lss_' + (i+1)])
		}

		return sum
	}

	$scope.panasPositiveScore = function(){
		var sum = 0;

		var panasArray = localStorage.answers.split(",");
		var positivePositions = [1, 3, 5, 9, 10, 12, 14, 16, 17, 19];

		for (var i = 0; i < positivePositions.length; i++) {
		   sum += parseInt(panasArray[positivePositions[i]]);

		}

		return sum
	}

	$scope.panasNegativeScore = function(){
		var sum = 0;
		var panasArray = localStorage.answers.split(",");

		var negativePositions = [2, 4, 6, 7, 8, 11, 13, 15, 18, 20]

		for (var i = 0; i < negativePositions.length; i++) {
		   sum += parseInt(panasArray[negativePositions[i]]);
		}

		return sum
	}

	$scope.between = function(x, min, max) {
  		return x >= min && x <= max;
	}	

	$scope.loadFeedback = function(){

		for (var i = 0; i < thresholdMap.length; i++){
			switch (thresholdMap[i][0]) {
			  case 'panasNegative':
			  	if($scope.between($scope.panasPositiveScore(),thresholdMap[i][1],thresholdMap[i][2])){
			  		var items = $scope.feedback[thresholdMap[i][3]]
			  		$scope.image = thresholdMap[i][4];
			  	}
			    break;
			  case 'panasPositive':
			  	if($scope.between($scope.panasNegativeScore(),thresholdMap[i][1],thresholdMap[i][2])){
			  		var items = $scope.feedback[thresholdMap[i][3]]
			  		$scope.image = thresholdMap[i][4];
			  	}
			    break;
		      case 'lssScore':
		      	if($scope.between($scope.lssScore(),thresholdMap[i][1],thresholdMap[i][2])){
		      		var items = $scope.feedback[thresholdMap[i][3]]
			  		$scope.image = thresholdMap[i][4];
		      	}
			    break;
		      case 'phq9Score':
	      		if($scope.between($scope.phq9Score(),thresholdMap[i][1],thresholdMap[i][2])){var items = $scope.feedback[thresholdMap[i][3]];
			  		$scope.image = thresholdMap[i][4];
	      		}
			    break;
			  default:
			    var items = ['Sorry, we are out of responses'];
			}
		}

	    $scope.currentText = items[Math.floor(Math.random()*items.length)];
		localStorage.clear()
	}

	$scope.next = function(){
		$location.url("/view1/");
		// window.location.href= 'https://participant.joinallofus.org/';
	};

}]);




// "AS-IS from google depression screening" 
// <h3>Depression is common and treatable</h3><p>Clinical depression is different than typical sadness and may require treatment. A first toward finding relief is understanding your symptoms.</p><p><b>PHQ-9: a depression screening tool</b><br/>The Patient Health Questionnaire, or PHQ-9, is a clinically validated 9-question screening tool used widely by doctors and health professionals. It takes about 5 minutes to answer the questions and get results.</p>