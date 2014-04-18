module.exports = function(client, enNoteMeta) {

  return {
    /**
     * Get this notes metadata.
     */
    meta: function(callback) {
      callback(enNoteMeta);
    },

    /**
     * Get this notes full data.
     */
    data: function(callback) {
      // TODO
    }

    /**
     * Get all tags for this note.
     */
    tags: function(callback) {
      // TODO
    },

    /**
     * Get this notes content as valid HTML markup.
     */
    toHtml: function(callback) {
      // TODO
    },

    /**
     * Get this notes content as Markdown.
     */
    toMarkdown: function(callback) {
      // TODO
    }
  }

}
