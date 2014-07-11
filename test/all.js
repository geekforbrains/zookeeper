var url = require('url');
var prompt = require('prompt');
var expect = require('chai').expect;
var zookeeper = require('../lib/zookeeper');
var config = require('./config');

// Set during tests
var TOKEN = config.token;
var OAUTH_TOKEN = null;
var OAUTH_TOKEN_SECRET = null;
var NOTE_GUID = null;
var NOTEBOOK_GUID = null;

// If no token was set in the config, we need to auth first
if(!TOKEN) {
  describe('auth.start', function() {
    it('should return oauth tokens and authorize url', function(done) {
      var zk = zookeeper({
        consumerKey: config.consumerKey,
        consumerSecret: config.consumerSecret
      });

      zk.auth.start('http://localhost', function(err, authData) {
        expect(authData).to.have.property('oauthToken');
        expect(authData).to.have.property('oauthTokenSecret');
        expect(authData).to.have.property('authorizeUrl');
        OAUTH_TOKEN = authData.oauthToken;
        OAUTH_TOKEN_SECRET = authData.oauthTokenSecret;
        console.log('Visit: ' + authData.authorizeUrl);
        done();
      });
    });
  });

  describe('auth.finish', function() {
    it('should return access token and secret', function(done) {
      this.timeout(0); // Disable Mocha timeout so prompt can wait for user input

      var zk = zookeeper({
        consumerKey: config.consumerKey,
        consumerSecret: config.consumerSecret
      });

      prompt.start();
      prompt.get('callbackUrl', function(err, promptData) {
        var query = url.parse(promptData.callbackUrl, true).query;
        zk.auth.finish(OAUTH_TOKEN, OAUTH_TOKEN_SECRET, query.oauth_verifier, function(err, authData) {
          expect(authData).to.have.property('token');
          expect(authData).to.have.property('tokenSecret');
          TOKEN = authData.token;
          console.log('Access Token: ' + TOKEN);
          done();
        });
      });
    });
  });
}

describe('user.info', function() {
  it('should return an evernote user object', function(done) {
    var zk = zookeeper({token: TOKEN});

    zk.user.info(function(err, info) {
      expect(info).to.have.property('id');
      expect(info).to.have.property('username');
      done();
    });
  });
});

describe('user.notebooks', function() {
  it('should return an array of zookeeper notebook objects', function(done) {
    var zk = zookeeper({token: TOKEN});

    zk.notebooks.all(function(err, notebooks) {
      expect(notebooks[0]).to.have.property('guid');
      NOTEBOOK_GUID = notebooks[0].guid;
      done();
    });
  });
});

describe('user.notes.all', function() {
  it('should return an array of note objects', function(done) {
    var zk = zookeeper({token: TOKEN});

    zk.notes.all(function(err, notes) {
      expect(notes instanceof Array).to.equal(true);
      expect(notes[0]).to.have.property('guid');
      NOTE_GUID = notes[0].guid;
      done();
    });
  });
});

describe('user.notes.single', function() {
  it('should return a single Evernote note object', function(done) {
    var zk = zookeeper({token: TOKEN});

    zk.notes.single(NOTE_GUID, function(err, note) {
      expect(note).to.have.property('guid');
      expect(note.guid).to.equal(NOTE_GUID);
      done();
    });
  });
});

describe('user.notes.inNotebook', function() {
  it('should return an array of notes associated with notebook guid', function(done) {
    var zk = zookeeper({token: TOKEN});

    zk.notes.inNotebook(NOTEBOOK_GUID, function(err, notes) {
      expect(notes instanceof Array).to.equal(true);
      expect(notes[0]).to.have.property('guid');

      for(k in notes) {
        expect(notes[k].notebookGuid).to.equal(NOTEBOOK_GUID);
      }

      done();
    });
  });
});
