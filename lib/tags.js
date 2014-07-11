function ZookeeperTags(client) {

  /**
   * Get all tags.
   */
  function all(done) {
    client.getNoteStore().listTags(done);
  }

  /**
   * Get a single tag.
   */
  function single(guid, done) {
    client.getNoteStore().getTag(guid, done);
  }

  /**
   * Get the GUID's for each given tag name.
   */
  function guids(tags, done) {

  }

  return {
    all: all,
    single: single
  }

}

module.exports = ZookeeperTags;
