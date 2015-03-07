function FakeLogger() {
  this.log.as =
  this.log.ns = function() {
    return (new FakeLogger()).log;
  }
}

FakeLogger.prototype.log = function() {};
FakeLogger.prototype.warn = function() {};
FakeLogger.prototype.error = function() {};

module.exports = FakeLogger;