function ZookeeperUser(client) {

  /**
   * Return a users profile info.
   */
  function info(done) {
    client.getUserStore().getUser(done);
  }

  return {
    info: info
  }

}

module.exports = ZookeeperUser;
