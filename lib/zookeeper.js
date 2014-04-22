var Evernote = require('evernote').Evernote;

function Zookeeper(config) {
  this.client = new Evernote.Client({
    consumerKey: config.consumerKey,
    consumerSecret: config.consumerSecret,
    token: config.token,
    sandbox: config.sandbox
  });
}

// Reference to lazy-loaded instances
Zookeeper.prototype._auth = null;
Zookeeper.prototype._user = null;

// Reference to the Evernote.Client object
Zookeeper.prototype.client = null;

// Helpers for Zookeeper classes
Zookeeper.prototype.Auth = require('./auth').ZookeeperAuth;
Zookeeper.prototype.User = require('./user').ZookeeperUser;
Zookeeper.prototype.Notebook = require('./notebook').ZookeeperNotebook;
Zookeeper.prototype.Note = require('./note').ZookeeperNote;
Zookeeper.prototype.Tag = require('./tag').ZookeeperTag;

/**
 * zk = new Zookeeper({consumerKey: 'xxx', consumerSecret: 'yyy'});
 * zk.auth().start('http://localhost/callback-url');
 */
Zookeeper.prototype.auth = function() {
  if(!this._auth) this._auth = new this.Auth(this);
  return this._auth;
}

/**
 * zk = new Zookeeper({token: 'xxx'});
 * zk.user().info();
 */
Zookeeper.prototype.user = function () {
  if(!this._user) this._user = new this.User(this);
  return this._user;
}

exports.Zookeeper = Zookeeper;
