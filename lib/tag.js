module.exports = Tag;


function Tag(client, noteStore) {
  this.client = client;
  this.noteStore = noteStore;
}


/**
 * Get all tags.
 */
Tag.prototype.all = function(done) {
  this.noteStore.listTags(done);
}


/**
 * Get a single Evernote tag object based on the given guid.
 */
Tag.prototype.withGuid = function(guid, done) {
  this.noteStore.getTag(guid, done);
}


/**
 * Get tags by their name.
 */
Tag.prototype.byName = function(tagNames, done) {
  var sortedTags = [];

  this.all(function(err, tags) {
    for(var k in tags) {
      if(tagNames.indexOf(tags[k].name) > -1) {
        sortedTags.push(tags[k]);
      }
    }

    done(err, sortedTags);
  });
}
