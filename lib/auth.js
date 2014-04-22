function ZookeeperAuth(client) {
  this._client = client;
}

ZookeeperAuth.prototype._client = null;

ZookeeperAuth.prototype.start = function(callbackUrl, done) {
  this._client.getRequestToken(callbackUrl, function(err, oauthToken, oauthTokenSecret, results) {
    done(err, {
      oauthToken: oauthToken,
      oauthTokenSecret: oauthTokenSecret,
      authorizeUrl: client.getAuthorizeUrl(oauthToken)
    });
  });
}

ZookeeperAuth.prototype.finish = function(oauthToken, oauthTokenSecret, oauthVerifier, done) {
  this._client.getAccessToken(oauthToken, oauthTokenSecret, oauthVerifier, function(err, token, tokenSecret, results) {
    done(err, {
      token: token,
      tokenSecret: tokenSecret
    });
  });
}

exports.ZookeeperAuth = ZookeeperAuth;
