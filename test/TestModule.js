/**
 * @author Adam Jaso <ajaso@pocketly.com>
 * @copyright 2014 Pocketly
 */ 

var SandGrain = require('..');

var TestModule = SandGrain.extend({
  name: 'TestModule',

  amIInitialized: false,
  amIShutdown: false,
  myConfig: null,

  construct: function() {
    this.super();
  },

  init: function(config) {
    this.super(config);

    this.myConfig = config;
    this.amIInitialized = true;

    return this;
  },

  shutdown: function() {
    this.super();
    this.amIShutdown = true;
  }

});

exports = module.exports = TestModule;