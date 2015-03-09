var hmt = angular.module('hmt', ['ngRoute']);

hmt.config(function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: '/home',
        controller: 'HomeController'
    }).when('/history', {
        templateUrl: '/history',
        controller: 'HistoryController'
    }).when('/queue', {
        templateUrl: '/queue',
        controller: 'QueueController'
    }).otherwise('/home');

});

hmt.factory('TabFactory', function() {
    var tabs = [
        {
            href: '#/home',
            iconClass: 'glyphicon glyphicon-home',
            label: 'Home'
        },
        {
            href: '#/history',
            iconClass: 'glyphicon glyphicon-time',
            label: 'History'
        },
        {
            href: '#/queue',
            iconClass: 'glyphicon glyphicon-list-alt',
            label: 'Queue'
        }
    ],
    factory = {};

    var currentTab = '#/home';

    factory.setCurrentTab = function(tab) {
        currentTab = tab;
    };

    factory.getCurrentTab = function() {
        return currentTab;
    };

    factory.getTabs = function() {
        return tabs;
    };

    return factory;

});

hmt.controller('MainController', ['$scope', 'TabFactory', function($scope, tabFactory) {
    $scope.tabs = tabFactory.getTabs();

    $scope.isCurrentTab = function(tab) {
        return tabFactory.getCurrentTab() == tab;
    };

}]);

hmt.controller('HomeController', ['$scope', 'TabFactory', function($scope, tabFactory) {

    tabFactory.setCurrentTab('#/home');

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

hmt.controller('HistoryController', ['$scope', 'TabFactory', function($scope, tabFactory) {
    tabFactory.setCurrentTab('#/history');
}]);

hmt.controller('QueueController', ['$scope', 'TabFactory', function($scope, tabFactory) {
    tabFactory.setCurrentTab('#/queue');
}]);
