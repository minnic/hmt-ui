hmt.controller('MainController', ['$scope', 'TabFactory', function($scope, tabFactory) {
    $scope.tabs = tabFactory.getTabs();

    $scope.isCurrentTab = function(tab) {
        return tabFactory.getCurrentTab() == tab;
    };

}]);

hmt.controller('HomeController', [
        '$scope', 'TabFactory', 'ErrorMessage', 
        function($scope, tabFactory, errorMessage) {
    
    var init = function() {

        tabFactory.setCurrentTab('#/home');

        $scope.isUsingFile = false;

        $scope.company = {};
        $scope.companies = [];
        $scope.message = {};
        $scope.isHeterogenerous = false;

        $scope.setUsingFile = setUsingFile;
        $scope.check = check;
        $scope.preview = preview;
        $scope.migrate = migrate;
    };


    var setUsingFile = function(isUsingFile) {
        $scope.isUsingFile = isUsingFile;
        // TODO: disable target company
    };

    var preview = function() {
        check(function() {
            $scope.$emit('preview');
        });
    };

    var check = function(callback) {

        var ok = true,
            waiting = false;

        if (!$scope.source) {
            ok = false;
            errorMessage.set('source', 'empty');
            $scope.$broadcast('source.error', {
                message: 'empty'
            });
        }
        
        if ($scope.isUsingFile) {
            waiting = true;
            $scope.$emit('loading');
            $scope.$emit('submit', function(companies) {
                $scope.$emit('close');

                // console.log(companies);
                $scope.$apply(function() {
                    $scope.companies = JSON.parse(companies);
                });
                // console.log($scope.companies);

                if (ok) {
                    callback();
                }
            });
        } else {
            if (!$scope.company.from) {
                ok = false;
                $scope.message.sourceInstance = '#Invalid company name';
            }
            if (!$scope.company.to) {
                ok = false;
                $scope.message.targetInstance = '#Invalid company name';
            } else if ($scope.target) {
                var isPrefixValid = $scope.target.prefix.some(function(v) {
                    return $scope.company.to.indexOf(v) == 0;
                });
                if (!isPrefixValid) {
                    ok = false;
                    $scope.message.targetInstance = '#Invalid company name';
                }
            }
        }
        
        if (!$scope.target) {
            ok = false;
            $scope.$broadcast('target.error', {
                message: '#target'
            });
        }

        if (ok && !waiting) {
            callback();
        }
    };

    var migrate = function() {
        console.log($scope.source);
        console.log($scope.isUsingFile);
        console.log($scope.target);
        console.log($scope.company);
        console.log($scope.isHeterogenerous);
        // TODO: disable confirm button
    };

    init();

}]);

hmt.controller('HistoryController', ['$scope', 'TabFactory', function($scope, tabFactory) {
    tabFactory.setCurrentTab('#/history');
    $scope.list = [
        {
            startDate: '2015-3-11 15:24'
        }
    ];
}]);

hmt.controller('QueueController', ['$scope', 'TabFactory', function($scope, tabFactory) {
    tabFactory.setCurrentTab('#/queue');
    $scope.list = [
        {
            startDate: '2015-3-11 15:24',
            status: 'success',
            operator: 'jchen',
            sourceSchema: 'SFUSER_A',
            targetSchema: 'SFUSER_A',
            deleteLink: '#'
        }
    ];
}]);