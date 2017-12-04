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
	// if we decide that the form is 
	// Ref- Kroenke, K., Spitzer, R. L., & Williams, J. B. (2001). The PHQ-9: Validity of a brief depression severity measure. Journal of General Internal Medicine, 169, 606–613.

	feedbackOptions['mood_neutral'] = 'You said you had a neutral mood!';
	feedbackOptions['mood_negative'] = 'Abhi text';
	feedbackOptions['mood_positive'] = 'Abhi text';
	feedbackOptions['phq_item_1'] = 'something about being down, depressed or hopeless';
	feedbackOptions['panas_emotion'] = 'Abhi text';
	feedbackOptions['lss_happy'] = 'Abhi text';


	var MILD_DEPRESSION = '<h4>Your current PHQ-9 score {score}&nbsp;shows symptoms of moderate depression.</h4> <p><strong>Next Steps</strong></p> <ul> <li>Track your daily mood for next #x TBD weeks&nbsp;</li> </ul> <p><strong>How to find help?</strong></p> <ul><li>PMI related clinical helpline?</li> </ul><p>&nbsp;</p>';

	var MODERATE_DEPRESSION = '<h4>Your current PHQ-9 score {score}&nbsp;shows symptoms of moderate depression.</h4> <p><strong>Next Steps</strong></p> <ul> <li>Track your daily mood for next #x TBD weeks&nbsp;</li> </ul> <p><strong>How to find help?</strong></p> <ul><li>PMI related clinical helpline?</li> </ul><p>&nbsp;</p>';

	var MAJOR_DEPRESSION = '<h4>Your current PHQ-9 score {score}&nbsp;shows symptoms of moderate depression.</h4> <p><strong>Next Steps</strong></p> <ul> <li>Track your daily mood for next #x TBD weeks&nbsp;</li> </ul> <p><strong>How to find help?</strong></p> <ul><li>PMI related clinical helpline?</li> </ul><p>&nbsp;</p>';


	// Two options
	// 1
	// Mild Depression
	feedbackOptions['phq_gross_score_lt_10'] = MILD_DEPRESSION;
	//Moderate Depression
	feedbackOptions['phq_gross_score_gtOrEQ_10_ltorEq_19'] = MODERATE_DEPRESSION;
	//Major Depression
	feedbackOptions['phq_gross_score_gtOrEQ_20_ltorEq_27'] = MAJOR_DEPRESSION;
	
	//2
	// Ref- Kroenke, K., Spitzer, R. L., & Williams, J. B. (2001). The PHQ-9: Validity of a brief depression severity measure. Journal of General Internal Medicine, 169, 606–613.
	// Minimal Depression
	feedbackOptions['phq_gross_score_ltOrEq_4'] = 'Minimal Depression';
	// Mild Depression
	feedbackOptions['phq_gross_score_gtOrEQ_5_ltorEq_9'] = MILD_DEPRESSION;
	//'Moderate Depression'
	feedbackOptions['phq_gross_score_gtOrEQ_10_ltorEq_14'] = MODERATE_DEPRESSION
	//Moderately Severe Depression
	feedbackOptions['phq_gross_score_gtOrEQ_15_ltorEq_19'] = MODERATE_DEPRESSION;
	// Severe Depression
	feedbackOptions['phq_gross_score_gtOrEQ_20_ltorEq_27'] = MAJOR_DEPRESSION;



	$scope.selectedFeedbackLabel = function(){return 'PHQ_Score_lt_5'}
    $scope.currentText = feedbackOptions[$scope.selectedFeedbackLabel()];
	$scope.next = function(){
		$location.url("/view1/");
		// window.location.href= 'https://participant.joinallofus.org/';
	};

}]);




// "AS-IS from google depression screening" 
// <h3>Depression is common and treatable</h3><p>Clinical depression is different than typical sadness and may require treatment. A first toward finding relief is understanding your symptoms.</p><p><b>PHQ-9: a depression screening tool</b><br/>The Patient Health Questionnaire, or PHQ-9, is a clinically validated 9-question screening tool used widely by doctors and health professionals. It takes about 5 minutes to answer the questions and get results.</p>