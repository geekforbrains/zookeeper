module.exports = Notebook;


function Notebook(client, noteStore) {
  this.client = client;
  this.noteStore = noteStore;
}


/**
 * Return a single Evernote notebook object associated with the given
 * notebook guid.
 */
Notebook.prototype.withGuid = function(notebookGuid, done) {
  this.noteStore.getNotebook(notebookGuid, done);
}


/**
 * Return all Evernote notebook objects.
 */
Notebook.prototype.all = function(done) {
  this.noteStore.listNotebooks(done);
}


/**
 * Return the users default Evernote notebook object.
 */
Notebook.prototype.default = function(done) {
  this.noteStore.getDefaultNotebook(done);
}
