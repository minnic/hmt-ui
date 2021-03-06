var hmt = angular.module('hmtApp', ['ngRoute', 'ngResource']);

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

hmt.factory('ErrorMessage', function() {
    var message = {};
    return {
        get: function(key) {
            return message[key];
        },
        set: function(key, value) {
            message[key] = value;
            // console.log(message);
        }
    }
});

hmt.factory('PoolFactory', ['$resource', function($resource) {

    // TODO: it should be read from backend
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
        port: 30015,
        prefix: ['AUTOMATION', 'SFUSER'] 
    }];

    // return $resource('/data/home');
    return factory;
}]);

// source/target db pool
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

                            // TODO: autocomplete scope.jndi
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
            $scope.message = '';

            var isSource = $attrs['hmtPool'] == 'source';

            var errorHandler = function(evt, err) {
                $scope.message = err.message;
            };

            if ($attrs['hmtPool'] == 'source') {
                $scope.pools = poolFactory.source;
                $scope.$on('source.error', errorHandler);
            } else {
                $scope.pools = poolFactory.target;
                $scope.$on('target.error', errorHandler);
            }

            $scope.setPoolName = function(index) {
                $scope.jndi = $scope.pools[index].jndi;
                $scope.isActive = false;

                $scope.$parent[isSource ? 'source' : 'target'] = $scope.pools[index];

                // console.log($scope.pools[index]);
            };
        }
    };
}]);

// source company when using file
hmt.directive('hmtFile', function() {
    return {
        restrict: 'A',
        link: function(scope, element) {

            var form = element[0]; 
            
            var submit = function(evt, callback) {

                var iframe = document.createElement('iframe');
                iframe.name = 'iframe-file';
                iframe.style.display = 'none';

                form.target = 'iframe-file';
                form.appendChild(iframe);
                
                iframe.onload = function() {
                    var responseText = window.frames['iframe-file'].document.body.innerHTML;
                    // console.log('load: #', responseText);
                    callback(responseText);
                    form.removeChild(iframe);
                };

                form.submit();
            };

            scope.$on('submit', submit);

            scope.validateFile = function() {
                submit(null, function(responseText) {
                    console.log(responseText);
                });
            };
        }
    };
});

// target company
hmt.directive('hmtTargetCompany', function() {
    return {
        restrict: 'A',
        link: function(scope, element) {
            var childNodes = element.children()[1].childNodes,
                button = angular.element(childNodes[0]),
                list = angular.element(childNodes[1]);

            button.on('click', function() {
                list.toggleClass('active');
            });

            scope.changePrefix = function(prefix) {
                if (!scope.isUsingFile) {
                    if (!scope.company) {
                        scope.company = {};
                    }
                    if (!scope.company.to) {
                        scope.company.to = '';
                    }
                    scope.company.to = prefix + '_' +
                        scope.company.to.substring(1 + scope.company.to.lastIndexOf('_'));
                }

                list.removeClass('active');
            };

            // TODO: disable input if using file
        }
    };
});

// heterogeneous checkbox
hmt.directive('hetero', function() {
    return {
        restrict: 'C',
        link: function(scope, element) {
            element.on('click', function() {
                if (element.hasClass('active')) {
                    scope.isHeterogenerous = false;
                    element.removeClass('active');
                } else {
                    scope.isHeterogenerous = true;
                    element.addClass('active');
                }
            });
        }
    };
});

// preview dialog
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


