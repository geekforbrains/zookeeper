function tags(client) {

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
   * Get tags by their name.
   */
  function byName(tagNames, done) {
    var sortedTags = [];

    all(function(err, tags) {
      for(var k in tags) {
        if(tagNames.indexOf(tags[k].name) > -1) {
          sortedTags.push(tags[k]);
        }
      }

      done(err, sortedTags);
    });
  }

  return {
    all: all,
    single: single,
    byName: byName
  };

}

module.exports = tags;
