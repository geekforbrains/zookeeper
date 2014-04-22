var async = require('async');

function ZookeeperUser(zk) {
  this._zk = zk;
}

ZookeeperUser.prototype._zk = null;

ZookeeperUser.prototype.info = function(done) {
  this._zk.client.getUserStore().getUser(done);
}

ZookeeperUser.prototype.notebooks = function(done) {
  this._zk.client.getNoteStore().listNotebooks(function(err, enNotebooks) {
    var zkNotebooks = [];

    console.log(enNotebooks);
    async.each(enNotebooks,
      function(enNotebook, doneAsync) {
        zkNotebooks.push(new this._zk.Notebook(this._zk, enNotebook));
        doneAsync();
      },
      function(err) {
        done(err, zkNotebooks);
      }
    );
  });
}

ZookeeperUser.prototype.notes = function(done) {
  // TODO
  done(null, null);
}

ZookeeperUser.prototype.tags = function(done) {
  // TODO
  done(null, null);
}

exports.ZookeeperUser = ZookeeperUser;
