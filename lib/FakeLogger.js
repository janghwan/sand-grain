function FakeLogger() {
  this.log.as =
  this.log.ns = function() {}
}

FakeLogger.prototype.log = function() {};

module.exports = FakeLogger;