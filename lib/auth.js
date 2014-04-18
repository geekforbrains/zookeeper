module.exports = function(client) {

  return {
    start: function(callbackUrl, callback) {
      client.getRequestToken(callbackUrl, function(err, oauthToken, oauthTokenSecret, results) {
        callback(err, {
          oauthToken: oauthToken,
          oauthTokenSecret: oauthTokenSecret,
          authorizeUrl: client.getAuthorizeUrl(oauthToken)
        });
      });
    },

    finish: function(oauthToken, oauthTokenSecret, oauthVerifier, callback) {
      client.getAccessToken(oauthToken, oauthTokenSecret, oauthVerifier, function(err, token, tokenSecret, results) {
        callback(err, {
          token: token,
          tokenSecret: tokenSecret
        });
      });
    }
  }

}
