module.exports = Auth;


function Auth(client) {
  this.client = client;
}


Auth.prototype.start = function(callbackUrl, done) {
  this.client.getRequestToken(callbackUrl, function(err, oauthToken, oauthTokenSecret, results) {
    done(err, {
      oauthToken: oauthToken,
      oauthTokenSecret: oauthTokenSecret,
      authorizeUrl: client.getAuthorizeUrl(oauthToken)
    });
  });
}


Auth.prototype.finish = function(oauthToken, oauthTokenSecret, oauthVerifier, done) {
  this.client.getAccessToken(
    oauthToken,
    oauthTokenSecret,
    oauthVerifier,
    function(err, token, tokenSecret, results) {
      done(err, {
        token: token,
        tokenSecret: tokenSecret
      });
    }
  );
}
