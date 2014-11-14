var url = require('url');
var prompt = require('prompt');
var expect = require('chai').expect;
var Zookeeper = require('../index');


// Will be initialized during auth
var zk;
var authToken;
var authTokenSecret;
var accessToken = process.env.TOKEN;


/**
 * Only if accessToken isn't set.
 *
 * Test auth flow. Here we also get the access token needed to run the rest
 * of the tests.
 */
if(!accessToken) {
  describe('auth', function() {
    describe('.start', function() {
      it('should return oauth tokens and authorize url', function(done) {
        this.timeout(0); // Disable mocha timeout so prompt can wait for user input
        console.log('Enter your Evernote consumer key and secret');

        prompt.start();
        prompt.get(['key', 'secret'], function(err, data) {
          zk = new Zookeeper({
            consumerKey: data.key,
            consumerSecret: data.secret
          });

          zk.auth.start('http://localhost', function(err, authData) {
            expect(authData).to.have.property('oauthToken');
            expect(authData).to.have.property('oauthTokenSecret');
            expect(authData).to.have.property('authorizeUrl');
            oauthToken = authData.oauthToken;
            oauthTokenSecret = authData.oauthTokenSecret;

            console.log('Visit URL: ' + authData.authorizeUrl);
            done();
          });
        });
      });
    });

    describe('.finish', function() {
      it('should return access tokens', function(done) {
        this.timeout(0); // Disable Mocha timeout so prompt can wait for user input
        console.log('Enter the URL your browser was redirected to');

        prompt.start();
        prompt.get('url', function(err, data) {
          var query = url.parse(data.url, true).query;

          zk.auth.finish(oauthToken, oauthTokenSecret, query.oauth_verifier, function(err, authData) {
            expect(authData).to.have.property('token');
            expect(authData).to.have.property('tokenSecret');
            accessToken = authData.token;

            console.log('Access Token: ' + accessToken);
            done();
          });
        });
      });
    });
  });
}


// Re-init Zookeeper with access token for other tests
zk = new Zookeeper({token: accessToken});


/**
 * User tests
 */
describe('user', function() {
  describe('.info', function() {
    it('should return an Evernote user object', function(done) {
      zk.user.info(function(err, user) {
        expect(user).to.have.property('id');
        expect(user).to.have.property('username');
        done();
      });
    });
  });
});


/**
 * Notebook tests
 */
describe('notebook', function() {
  var notebookGuid; // Used to look up single notebook

  describe('.default', function() {
    it('should return the default Evernote notebook object', function(done) {
      zk.notebook.default(function(err, notebook) {
        expect(notebook).to.have.property('defaultNotebook');
        expect(notebook.defaultNotebook).to.equal(true);
        done();
      });
    });
  });

  describe('.all', function() {
    it('should return an array of Evernote notebook objects', function(done) {
      zk.notebooks.all(function(err, notebooks) {
        expect(notebooks[0]).to.have.property('guid');
        notebookGuid = notebooks[0].guid; // Set for next test .withGuid(...)
        done();
      });
    });
  });

  describe('.withGuid', function() {
    it('should return a single Evernote notebook object', function(done) {
      zk.notebook.withGuid(notebookGuid, function(err, notebook) {
        expect(notebook).to.have.property('guid');
        expect(notebook.guid).to.equal(notebookGuid);
        done();
      });
    });
  });
});
