/**
 * Module Dependencies
 */

var Class = require('sand').Class;
var EventEmitter = require('events').EventEmitter;
var only = require('only');
var _ = require('lodash');
var fs = require('fs');

try {
  //console.log('logger: ', module.require.resolve('sand'));
  var Logger = require('sand').Logger;
} catch (e) {
  // Since Sand isn't loaded, lets load the fake logger
  Logger = require('./FakeLogger');
}

/**
 * Initialize a new `SandGrain`.
 *
 * @api public
 */
exports = module.exports = Class.extend(EventEmitter, {

  isSandGrain: true, // artificial duck typing to satisfy Sand.js

  construct: function() {
    this.name = this.name || 'SandGrain';
    this.env = !_.isUndefined(global.sand) ? global.sand.env : (process.env.NODE_ENV || 'development');
    this.configName = this.name;
    this.config = this.config || {};
    this.defaultConfig = this.defaultConfig || {};
    this.log = (new Logger(this.name)).log;

    try {
      this.version = this.version || require('../package').version;
    } catch(e) {
      this.version = 'unknown';
    }
  },

  inspect: toJSON,

  init: function(config, done) {
    var passedInConfig;
    if (typeof config === 'object') {
      passedInConfig = config;
    } else if (typeof config === 'string') {
      // Must be a path
      passedInConfig = require(config);
    }

    if (passedInConfig) {
      if (!this.validateConfig(passedInConfig)) {
        this.log('Missing env ' +  this.env  + ' or all on the config object');
        process.exit(1);
      }

      this.config = this.getConfig(passedInConfig);
    }

    if (_.isFunction(done)) {
      done();
    }

    return this;
  },

  shutdown: function(done) {
    if (_.isFunction(done)) {
      done();
    }
  },

  validateConfig: function(config) {
    // Default we check that it has environment or all
    return _.isPlainObject(config[this.env]) || _.isPlainObject(config[this.all]);
  },

  getConfig: function(config) {
    var env = config[this.env] || {};
    var all = config['all'] || {};

    return _.defaults(env, all, this.defaultConfig);
  }
});

function toJSON() {
  "use strict";
  return only(this, [
    'name',
    'version'
  ]);
}