"use strict";

/**
 * @author Adam Jaso <ajaso@pocketly.com>
 * @author Kevin Smithson <ksmithson@pocketly.com>
 *
 * @copyright 2014 Pocketly
 */ 

var SandGrain = require('..');

class TestModule extends SandGrain {
  constructor() {
    super();

    this.name = 'TestModule';
    this.amIInitialized = false;
    this.amIShutdown = false;
    this.myConfig = null;
  }

  init(config) {
    super.init(config);

    this.myConfig = this.config;
    this.amIInitialized = true;

    return this;
  }

  shutdown() {
    super.shutdown();
    this.amIShutdown = true;
  }
}

exports = module.exports = TestModule;