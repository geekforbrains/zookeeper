function auth(client) {

  function start(callbackUrl, done) {
    client.getRequestToken(callbackUrl, function(err, oauthToken, oauthTokenSecret, results) {
      done(err, {
        oauthToken: oauthToken,
        oauthTokenSecret: oauthTokenSecret,
        authorizeUrl: client.getAuthorizeUrl(oauthToken)
      });
    });
  }

  function finish(oauthToken, oauthTokenSecret, oauthVerifier, done) {
    client.getAccessToken(oauthToken, oauthTokenSecret, oauthVerifier, function(err, token, tokenSecret, results) {
      done(err, {
        token: token,
        tokenSecret: tokenSecret
      });
    });
  }

  return {
    start: start,
    finish: finish
  };

}

module.exports = auth;
