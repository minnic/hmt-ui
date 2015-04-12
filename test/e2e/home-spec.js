var chai = require('chai'),
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

var expect = chai.expect;

describe('it', function() {
  beforeEach(function() {
    
  });

  it('should be connected', function() {
    browser.get('/');
    expect(browser.getTitle()).to.eventually.equal('HANA Migration Tool');
  });
});