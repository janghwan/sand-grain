function FakeLogger() {
}

FakeLogger.prototype.log = function() {};
FakeLogger.prototype.log.as = FakeLogger.prototype.log.ns = function() {
  "use strict";
  return (new FakeLogger()).log;
};

FakeLogger.prototype.warn = function() {};
FakeLogger.prototype.error = function() {};

module.exports = FakeLogger;