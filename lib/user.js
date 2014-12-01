module.exports = User;


function User(client, userStore) {
  this.client = client;
  this.userStore = userStore;
}


/**
 * Return a users profile and public info.
 */
User.prototype.info = function(done) {
  var self = this;

  this.userStore.getUser(function(err, info) {
    if(err) return done(err);

    self.publicInfo(info.username, function(err, publicInfo) {
      if(err) return done(err);
      info.public = publicInfo;
      return done(null, info);
    });
  });
}


/**
 * Gets a users public user info.
 */
User.prototype.publicInfo = function(username, done) {
  this.userStore.getPublicUserInfo(username, done);
}
