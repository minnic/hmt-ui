exports.config = {
  baseUrl: 'http://localhost:3000',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  getPageTimeout: 20000,
  capabilities: {
    'browserName': 'chrome'
  },
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    reporter: 'list'
  }
};