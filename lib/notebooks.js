function notebooks(client) {

  /**
   * Return all notebook objects for the user.
   */
  function all(done) {
    client.getNoteStore().listNotebooks(done);
  }

  /**
   * Return a single Evernote notebook object associated with the given
   * notebook guid.
   */
  function single(notebookGuid, done) {
    client.getNoteStore().getNotebook(notebookGuid, done);
  }

  /**
   * Return the users default Evernote notebook.
   */
  function _default(done) {
    client.getNoteStore().getDefaultNotebook(done);
  }

  return {
    all: all,
    single: single,
    default: _default
  };

}

module.exports = notebooks;
