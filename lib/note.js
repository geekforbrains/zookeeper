ZookeeperNote = function(client, enNoteMeta) {
  this._client = client;
  this._enNoteMeta = enNoteMeta;
}

ZookeeperNote.prototype._client = null;
ZookeeperNote.prototype._enNoteMeta = null;

ZookeeperNote.prototype.meta = function(done) {
  done(null, enNoteMeta);
}

ZookeeperNote.prototype.info = function(done) {
  // TODO
  done(null, null);
}

ZookeeperNote.prototype.toHtml = function(done) {
  // TODO
  done(null, null);
}

ZookeeperNote.prototype.toMarkdown = function(done) {
  // TODO
  done(null, null);
}

exports.ZookeeperNote = ZookeeperNote;
