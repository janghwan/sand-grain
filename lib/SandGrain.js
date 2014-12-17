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
    if (typeof config === 'object') {
      this.config = config;
    } else if (typeof config === 'string') {
      // Must be a path
      this.config = require(config);
    }

    this.config = _.extend(this.defaultConfig, this.config);

    if (_.isFunction(done)) {
      done();
    }

    return this;
  },

  shutdown: function(done) {
    if (_.isFunction(done)) {
      done();
    }
  }
});

function toJSON() {
  "use strict";
  return only(this, [
    'name',
    'version'
  ]);
}