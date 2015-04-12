describe('HomeController', function() {

  var $scope, $controller, errorMessage;

  beforeEach(module('hmtApp'));

  beforeEach(inject(function($rootScope, _$controller_, ErrorMessage) {
    // console.log(ErrorMessage);
    $scope = $rootScope.$new();
    errorMessage = ErrorMessage;
    $controller = _$controller_('HomeController', {
      $scope: $scope
    });
  }));

  it('has no input', function() {
    $scope.check(function() {});
    expect(errorMessage.get('source')).to.equal('empty');
  });

  it('has no input', function() {
    $scope.check(function() {});
    expect(errorMessage.get('source')).to.equal('empty');
  });

  it('has no input', function() {
    $scope.check(function() {});
    expect(errorMessage.get('source')).to.equal('empty');
  });

  it('has no input', function() {
    $scope.check(function() {});
    expect(errorMessage.get('source')).to.equal('empty');
  });

  it('has no input', function() {
    $scope.check(function() {});
    expect(errorMessage.get('source')).to.equal('empty');
  });

  it('has no input', function() {
    $scope.check(function() {});
    expect(errorMessage.get('source')).to.equal('empty');
  });
});