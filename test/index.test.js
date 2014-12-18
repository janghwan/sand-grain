/**
 * @author Adam Jaso <ajaso@pocketly.com>
 * @author Kevin Smithson <ksmithson@pocketly.com>
 * @copyright 2014 Pocketly
 */ 

var sand = require('sand')({appPath: __dirname});
var TestModule = require('./TestModule');
var child = require('child_process');
var SandGrain = require('../lib/SandGrain');

sand.use(TestModule, {test: {myParam: 'hello world!'}}).start();

describe('Grain', function() {
  it('should error with code 1 for bad config', function(done) {
    child
      .fork('test/testBadConfig.js')
      .on('exit', function(code) {
        code.should.be.eql(1);
        done();
      })
  });

  it('should merge all and env configs', function() {
    var module = SandGrain();
    module.init({
      all: {
        test1: true
      },
      test: {
        test2: true
      }
    });

    module.config.test1.should.be.ok;
    module.config.test2.should.be.ok;
  });

  it ('should work with just an all environment', function() {
    var module = SandGrain();
    module.init({
      all: {
        test1: true
      }
    });

    module.config.test1.should.be.ok;
  });
});

describe('TestModule', function() {

  describe("Inheritance", function() {
    it('should be a property of global sand', function() {
      sand.TestModule.should.be.instanceof(TestModule);
    });

    it('should have access to the config', function() {
      sand.TestModule.config.should.be.ok;
      sand.TestModule.config.myParam.should.match(/hello world/);
    });
  });

  describe("hooks", function() {
    it('should all be called', function() {
      sand.TestModule.amIInitialized.should.be.true;

      sand.shutdown();
      sand.TestModule.amIShutdown.should.be.true;
    });
  })
});