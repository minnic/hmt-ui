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

hmt.controller('HomeController', [
        '$scope', 'TabFactory', 
        function($scope, tabFactory) {
    
    tabFactory.setCurrentTab('#/home');

    $scope.isUsingFile = false;

    $scope.setUsingFile = function(isUsingFile) {
        $scope.isUsingFile = isUsingFile;
    };

    var check = function(callback) {
        // TODO: single or file(use ajax to get from backend)
        $scope.companies = ['a', 'b'];
        $scope.company = {
            from: 'sfuser_a',
            to: 'sfuser_b'
        };

        // TODO: validate form data
        $scope.message = {};

        // check source
        if (!$scope.source) {
            $scope.message.srcPool = '#source';
            $scope.$emit('close');
        }

        // window.setTimeout(callback, 500); 
    };

    $scope.preview = function() {
        
        $scope.$emit('loading');

        check(function() {
            $scope.$emit('preview');
        });
    };

}]);

hmt.factory('PoolFactory', function() {
    var factory = {};

    factory.source = [{
        jndi: 'SH_QA_Local',
        ip: '10.129.126.194',
        port: 1521,
        sid: 'dbpool1'
    }, {
        jndi: 'SH_QA_BigData_Local',
        ip: '10.129.126.152',
        port: 1521,
        sid: 'dbpool1'
    }];

    factory.target = [{
        jndi: 'SH1_SFUSER',
        ip: '10.129.126.150',
        port: 30015
    }];

    return factory;
});

hmt.directive('hmtPool', ['PoolFactory', function(poolFactory) {
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
            var isSource = $attrs['hmtPool'] == 'source';

            if ($attrs['hmtPool'] == 'source') {
                $scope.pools = poolFactory.source;
            } else {
                $scope.pools = poolFactory.target;
            }

            $scope.setPoolName = function(index) {
                $scope.poolName = $scope.pools[index].jndi;
                $scope.isActive = false;

                $scope.$parent[isSource ? 'source' : 'target'] = $scope.pools[index];
            };
        }
    };
}]);

hmt.directive('hetero', function() {
    return {
        restrict: 'C',
        link: function(scope, element) {
            element.on('click', function() {
                if (element.hasClass('active')) {
                    element.removeClass('active');
                } else {
                    element.addClass('active');
                }
            });
        }
    };
});

hmt.directive('hmtPreviewDialog', function() {
    return {
        restrict: 'AE',
        link: function(scope, element) {
            var show = function() {
                element.removeClass('loading');
                element.addClass('active');
            };

            var loading = function() {
                element.removeClass('active');
                element.addClass('loading');
            };

            var close = function() {
                element.removeClass('loading');
                element.removeClass('active');
            };

            scope.$on('close', close);
            scope.$on('loading', loading);
            scope.$on('preview', show);
            scope.close = close;
        }
    };
});

hmt.controller('HistoryController', ['$scope', 'TabFactory', function($scope, tabFactory) {
    tabFactory.setCurrentTab('#/history');
}]);

hmt.controller('QueueController', ['$scope', 'TabFactory', function($scope, tabFactory) {
    tabFactory.setCurrentTab('#/queue');
}]);
