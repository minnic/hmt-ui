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

    $scope.isUsingFile = false;

    $scope.setUsingFile = function(isUsingFile) {
        $scope.isUsingFile = isUsingFile;
    };

}]);

hmt.directive('hmtPool', function() {
    function checkParent(el, parent) {
        if (!el || el == document.body) {
            return false;
        }
        if (el == parent) {
            return true;
        }
        return checkParent(el.parentNode, parent);
    }

    return {
        restrict: 'A',
        templateUrl: '/template/pool',
        scope: true,
        link: function(scope, element) {
            var childNodes = element.children(),
                input = angular.element(childNodes[1]),
                doc = angular.element(document);

            var deactivate = function(event) {
                if (scope.isActive) {
                    var target = event.target || event.srcElement;
                    if (target != childNodes[1] && !checkParent(target, childNodes[2])) {
                        scope.$apply(function() {
                            scope.isActive = false;
                        });
                    }
                    console.log(event.target);
                }
            };

            input.on('focus', function() {
                scope.$apply(function() {
                    scope.isActive = true;
                });
            });

            doc.on('mousedown', deactivate);
            doc.on('keyup', deactivate);
        },
        controller: function($scope, $element, $attrs) {
            if ($attrs['hmtPool'] == 'source') {
                $scope.names = ['1', '2', '3'];
            } else {
                $scope.names = ['4', '5', '6'];
            }

            $scope.setPoolName = function(index) {
                $scope.poolName = $scope.names[index];
                console.log($scope.poolName);
                $scope.isActive = false;
            };
        }
    };
});

hmt.directive('hmtHetero', function() {
    return {
        restrict: 'A',
        link: function(scope, element) {
            element.on('click', function() {
            });
        }
    };
});

hmt.controller('HistoryController', ['$scope', 'TabFactory', function($scope, tabFactory) {
    tabFactory.setCurrentTab('#/history');
}]);

hmt.controller('QueueController', ['$scope', 'TabFactory', function($scope, tabFactory) {
    tabFactory.setCurrentTab('#/queue');
}]);
