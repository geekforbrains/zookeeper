function ZookeeperNotebook(zk, enNotebook) {
  this._zk = zk;
  this._enNotebook = enNotebook;
}

ZookeeperNotebook.prototype._zk = null;
ZookeeperNotebook.prototype._enNotebook = null;

ZookeeperNotebook.prototype.info = function(done) {
  done(null, this._enNotebook);
}

ZookeeperNotebook.prototype.notes = function(done) {
  // TODO
  done(null, null);
}

ZookeeperNotebook.prototype.tags = function(done) {
  // TODO
  done(null, null);
}

exports.ZookeeperNotebook = ZookeeperNotebook;
