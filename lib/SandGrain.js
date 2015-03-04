"use strict";
/**
 * Module Dependencies
 */

var EventEmitter = require('events').EventEmitter;
var only = require('only');
var _ = require('lodash');

try {
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
class SandGrain extends EventEmitter {
  constructor() {
    super();

    this.name = this.constructor.name || 'SandGrain';
    this.env = SandGrain.getEnv();
    this.configName = this.name;
    this.config = this.config || {};
    this.defaultConfig = this.defaultConfig || {};

    this.version = 'unknown';
  }

  /**
   * Returns only select parameters when inspecting
   *
   * @returns {object}
   */
  inspect() {
    "use strict";
    return only(this, [
      'name',
      'env',
      'version'
    ]);
  }

  /**
   * Gets called when the process starts up, use this
   * to initialize your module
   *
   * @param {object|string} config - the config object or path to the config file
   * @param {function} done - Call this when done initializing
   *
   * @returns {SandGrain}
   */
  init(config, done) {
    // Setup the logger
    this.log = (new Logger(this.name)).log;

    // Load config
    this.loadConfig(config);

    if (typeof done === 'function') {
      done();
    }

    return this;
  }

  /**
   * Loads the config
   *
   * @param {object|string} config - the config object or path to the config file
   */
  loadConfig(config) {
    var passedInConfig;
    if (typeof config === 'object') {
      passedInConfig = config;
    } else if (typeof config === 'string') {
      // Must be a path
      passedInConfig = require(config);
    }

    if (passedInConfig) {
      if (!this.validateConfig(passedInConfig)) {
        this.log('Missing env ' +  this.env  + ' or all on the config object falling back to all');
      }

      this.config = SandGrain.getConfig(passedInConfig);
    }
  }

  /**
   * Gets called when process is shutting down
   * Use this method to cleanup your module
   *
   * @param {Function} done - Call this when done cleaning up
   *
   * @returns {SandGrain}
   */
  shutdown(done) {
    if ('function' === typeof done) {
      done();
    }

    return this;
  }

  /**
   * Checks to see if the config has an "env" member or "all"
   *
   * @param {object} config - the config object to check
   *
   * @returns {object}
   */
  validateConfig(config) {
    // Default we check that it has environment or all
    return _.isPlainObject(config[this.env]) || _.isPlainObject(config['all']);
  }

  /**
   * Get the Config for the environment
   *
   * @param {object} config - The config to extract the real config from
   * @param {object} [defaultConfig] - The default config to merge with
   *
   * @returns {object} The merged object for the current environment
   */
  static getConfig(config, defaultConfig) {
    var env = config[SandGrain.getEnv()] || {};
    var all = config['all'] || {};
    var obj = all || env ? {} : config; // Fallback to config if no all or env

    return _.merge({}, defaultConfig, all, env, obj);
  }

  /**
   * Get the currently running Environment
   *
   * @returns {string}
   */
  static getEnv() {
    return typeof global.sand !== 'undefined' ? global.sand.env : (process.env.NODE_ENV || 'development');
  }
}

module.exports = SandGrain;