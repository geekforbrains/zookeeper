var evernote = require('evernote').Evernote;


function ZookeeperNotes(client) {

  /**
   * Return all notes.
   *
   * Makes use of the findNotesMetadata Evernote API method. Because of this,
   * only note metadat is returned. If additional data is needed, you'll need
   * to make a follow-up call to the single() method.
   */
  function all(done) {
    var filter = new evernote.NoteFilter();
    var resultSpec = new evernote.NotesMetadataResultSpec({
      includeTitle: true,
      includeContentLength: true,
      includeCreated: true,
      includeUpdated: true,
      includeDeleted: true,
      includeUpdateSequenceNum: true,
      includeNotebookGuid: true,
      includeTagGuids: true,
      includeAttributes: true,
      includeLargestResourceMime: true,
      includeLargestResourceSize: true
    });

    client.getNoteStore().findNotesMetadata(filter, 0, evernote.EDAM_USER_NOTES_MAX, resultSpec, function(err, result) {
      // If more notes to process (based on total notes and offset) - call "all" again with extra params
    });
  }

  /**
   * Return a single note.
   */
  function single(noteGuid, done) {

  }

  /**
   * Return all notes in given notebook.
   */
  function inNotebook(notebookGuid, done) {

  }

  /**
   * Return all notes tagged with one or more of the given tags.
   */
  function taggedWith(tags, done) {

  }

  return {
    all: all,
    single: single,
    inNotebook: inNotebook,
    taggedWith: taggedWith
  }

}

module.exports = ZookeeperNotes;
