function FakeLogger() {
  this.log.as =
  this.log.ns = function() {
    return (new FakeLogger()).log;
  }
}

FakeLogger.prototype.log = function() {};

module.exports = FakeLogger;