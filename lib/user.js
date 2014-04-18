var notebook = require('./notebook');

module.exports = function(client) {

  return {
    /**
     * Get users account info.
     */
    info: function(callback) {
      client.getUserStore().getUser(callback);
    },

    /**
     * Get all notebooks in users account.
     */
    notebooks: function(callback) {
      client.getNoteStore().listNotebooks(function(err, notebooks) {
        var zkNotebooks = [];
        for(var enNotebook in enNotebooks) {
          zkNotebooks.push(notebook(client, enNotebook));
        }
        callback(err, zkNotebooks);
      });
    },

    /**
     * Get notebook by guid or default notebook if no guid is set.
     */
    notebook: function(guid, callback) {
      // TODO
    },

    /**
     * Return all notes in users account.
     */
    notes: function() {
      // TODO
    },

    /**
     * Return all tags in users account.
     */
    tags: function() {
      // TODO
    }
  }

}
