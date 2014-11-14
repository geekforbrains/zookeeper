module.exports = User;


function User(client, userStore) {
  this.client = client;
  this.userStore = userStore;
}


/**
 * Return a users profile info.
 */
User.prototype.info = function(done) {
  this.userStore.getUser(done);
}
