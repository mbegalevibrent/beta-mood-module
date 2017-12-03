'use strict';

angular.module('myApp.view5', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view5', {
    templateUrl: 'views/view5/view5.html',
    controller: 'View5Ctrl'
  });
}])

.controller('View5Ctrl', ['$scope', '$location', function($scope,$location) {

	var feedbackOptions = [];
	// Abhi -- proposal
	// we start by triaging feedback to mood alone
	// then we triage to a "gross score" of lss, phq, panas
	// then we triage to a "per item" of lss, phq, panas	

	feedbackOptions['mood_neutral'] = 'Abhi text';
	feedbackOptions['mood_negative'] = 'Abhi text';
	feedbackOptions['mood_positive'] = 'Abhi text';
	feedbackOptions['phq_gross_score_lt_5'] = 'Abhi text';
	feedbackOptions['phq_gross_score_gt_5_lt_10'] = 'Abhi text';
	feedbackOptions['phq_gross_score_gt_10_lt_20'] = 'Abhi text';
	feedbackOptions['phq_item_1'] = 'something about being down, depressed or hopeless';
	feedbackOptions['panas_emotion'] = 'Abhi text';
	feedbackOptions['lss_happy'] = 'Abhi text';

	$scope.selectedFeedbackLabel = function(){return 'PHQ_Score_lt_5'}
    $scope.currentText = feedbackOptions[$scope.selectedFeedbackLabel()];
	$scope.next = function(){window.location.href= 'https://participant.joinallofus.org/';};

}]);

// <h3>Depression is common and treatable</h3><p>Clinical depression is different than typical sadness and may require treatment. A first toward finding relief is understanding your symptoms.</p><p><b>PHQ-9: a depression screening tool</b><br/>The Patient Health Questionnaire, or PHQ-9, is a clinically validated 9-question screening tool used widely by doctors and health professionals. It takes about 5 minutes to answer the questions and get results.</p>