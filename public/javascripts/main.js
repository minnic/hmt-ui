var hmt = angular.module('hmt', ['ngRoute']);

hmt.config(function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: '/home',
        controller: 'HomeController'
    }).when('/history', {
        templateUrl: '/history'
    }).when('/queue', {
        templateUrl: '/queue'
    }).otherwise('/home');
});

hmt.controller('HomeController', ['$scope', function($scope) {
    $scope.srcPoolOnFocus = function() {
        console.log('focus');
    };

    $scope.srcPoolOnKeyUp = function() {
        console.log($scope.srcPool);
    };

    $scope.srcPoolOnBlur = function() {
        console.log('blur');
    };
}]);