/**
 * @author Adam Jaso <ajaso@pocketly.com>
 * @copyright 2014 Pocketly
 */ 

var sand = require('sand')({appPath: __dirname});
var TestModule = require('./TestModule');

sand.use(TestModule, {myParam: 'hello world!'}).start();


describe('TestModule', function() {

  it('should be a property of global sand', function() {

    sand.TestModule.should.be.instanceof(TestModule);

  });

  it('should have access to the config', function() {

    sand.TestModule.myConfig.should.be.ok;
    sand.TestModule.myConfig.myParam.should.match(/hello world/);

  });

});

describe('TestModule#hooks', function() {

  it('should all be called', function() {

    sand.TestModule.amIInitialized.should.be.true;

    sand.shutdown();
    sand.TestModule.amIShutdown.should.be.true;

  });

});
