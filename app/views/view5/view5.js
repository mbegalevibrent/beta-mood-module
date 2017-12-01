'use strict';

angular.module('myApp.view5', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view5', {
    templateUrl: 'views/view5/view5.html',
    controller: 'View5Ctrl'
  });
}])

.controller('View5Ctrl', ['$scope', '$location', function($scope,$location) {
    $scope.currentText= '<h3>Depression is common and treatable</h3><p>Clinical depression is different than typical sadness and may require treatment. A first toward finding relief is understanding your symptoms.</p><p><b>PHQ-9: a depression screening tool</b><br/>The Patient Health Questionnaire, or PHQ-9, is a clinically validated 9-question screening tool used widely by doctors and health professionals. It takes about 5 minutes to answer the questions and get results.</p>';
	$scope.next = function(){window.location.href= 'https://participant.joinallofus.org/';};

}]);