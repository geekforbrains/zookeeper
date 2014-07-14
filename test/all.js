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
var TAG_NAME = null;
var TAG_GUIDS = [];

var zk = zookeeper({
  consumerKey: config.consumerKey,
  consumerSecret: config.consumerSecret
});

// If no token was set in the config, we need to auth first
if(!TOKEN) {
  describe('auth', function() {
    describe('.start', function() {
      it('should return oauth tokens and authorize url', function(done) {
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

    describe('.finish', function() {
      it('should return access token and secret', function(done) {
        this.timeout(0); // Disable Mocha timeout so prompt can wait for user input

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
  });
}

// Once we've finished auth, set the Zookeeper instance to use the access token
zk = zookeeper({token: TOKEN});

describe('user', function() {
  describe('.info', function() {
    it('should return an Evernote user object', function(done) {
      zk.user.info(function(err, info) {
        expect(info).to.have.property('id');
        expect(info).to.have.property('username');
        done();
      });
    });
  })
});

describe('tags', function() {
  describe('.all', function() {
    it('should return an array of Evernote tag objects', function(done) {
      zk.tags.all(function(err, tags) {
        expect(tags[0]).to.have.property('guid');
        TAG_NAME = tags[0].name;
        for(k in tags) {
          TAG_GUIDS.push(tags[k].guid);
        }
        done();
      });
    })
  });

  describe('.single', function() {
    it('should return a single Evernote tag object', function(done) {
      zk.tags.single(TAG_GUIDS[0], function(err, tag) {
        expect(tag).to.have.property('guid');
        expect(tag.guid).to.equal(TAG_GUIDS[0]);
        done();
      });
    });
  });

  describe('.byName', function() {
    it('should return a single Evernote tag object with the given name', function(done) {
      zk.tags.byName([TAG_NAME], function(err, tags) {
        done();
      });
    });
  });
});

describe('notebooks', function() {
  describe('.all', function() {
    it('should return an array of all available Evernote notebook objects', function(done) {
      zk.notebooks.all(function(err, notebooks) {
        expect(notebooks[0]).to.have.property('guid');
        NOTEBOOK_GUID = notebooks[0].guid;
        done();
      });
    });
  });

  describe('.single', function() {
    it('should return a single Evernote notebook object', function(done) {
      zk.notebooks.single(NOTEBOOK_GUID, function(err, notebook) {
        expect(notebook).to.have.property('guid');
        expect(notebook.guid).to.equal(NOTEBOOK_GUID);
        done();
      });
    });
  });
});

describe('notes', function() {
  describe('.all', function() {
    it('should return an array of all available Evernote note objects', function(done) {
      zk.notes.all(function(err, notes) {
        expect(notes instanceof Array).to.equal(true);
        expect(notes[0]).to.have.property('guid');
        NOTE_GUID = notes[0].guid;
        done();
      });
    });
  });

  describe('.single', function() {
    it('should return a single Evernote note object', function(done) {
      zk.notes.single(NOTE_GUID, function(err, note) {
        expect(note).to.have.property('guid');
        expect(note.guid).to.equal(NOTE_GUID);
        done();
      });
    });
  });

  describe('.inNotebook', function() {
    it('should return an array of Evernote note objects associated with notebook GUID', function(done) {
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

  describe('.taggedWith', function() {
    it('should return an array of Evernote note objects tagged with given tag GUIDs', function(done) {
      zk.notes.taggedWith(TAG_GUIDS[0], function(err, notes) {
        if(notes.length > 0) {
          expect(notes[0]).to.have.property('guid');
        }

        done();
      });
    });
  });

  describe('.toHtml', function() {
    it('should return a notes content as valid html markup', function(done) {
      zk.notes.toHtml('TODO', function(err, html) {
        expect(true).to.equal(false);
        done();
      })
    });
  });

  describe('.toMarkdown', function() {
    it('should return a notes content as valid Markdown', function(done) {
      zk.notes.markDown('TODO', function(err, html) {
        expect(true).to.equal(false);
        done();
      })
    });
  });
});
