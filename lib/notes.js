var async = require('async');
var evernote = require('evernote').Evernote;


function ZookeeperNotes(client) {

  /**
   * Return a single note.
   */
  function single(noteGuid, config, done) {
    if(!done) {
      done = config;
      config = {
        withContent: true,
        withResourcesData: true,
        withResourcesRecognition: false,
        withResourcesAlternateData: false
      };
    }

    client.getNoteStore().getNote(
      noteGuid,
      config.withContent,
      config.withResourcesData,
      config.withResourcesRecognition,
      config.withResourcesAlternateData,
      done
    );
  }

  /**
   * Gets all notes based on the given filter and result spec options. See
   * Evernote API docs for available parameters.
   */
  function find(filterOptions, resultSpecOptions, done) {
    if(!resultSpecOptions) {
      resultSpecOptions = {
        includeTitle: true,
        includeContentLength: false,
        includeCreated: true,
        includeUpdated: true,
        includeDeleted: true,
        includeUpdateSequenceNum: true,
        includeNotebookGuid: true,
        includeTagGuids: false,
        includeAttributes: false,
        includeLargestResourceMime: false,
        includeLargestResourceSize: false
      };
    }

    var noteStore = client.getNoteStore();
    var filter = new evernote.NoteFilter(filterOptions);
    var resultSpec = new evernote.NotesMetadataResultSpec(resultSpecOptions);

    var notes = [];
    var noteCount = -1; // -1 to ensure we ignore the first test below so note count is set from result
    var offset = 0;
    var limit = evernote.EDAM_USER_NOTES_MAX;

    async.until(
      function() {
        return noteCount >= 0 && (offset + 1) * limit > noteCount;
      },
      function(next) {
        noteStore.findNotesMetadata(filter, offset, limit, resultSpec,
          function(err, result) {
            noteCount = result.totalNotes;
            for(var i = 0; i < result.notes.length; i++) {
              notes.push(result.notes[i]);
            }
            offset++;
            next(err);
          }
        );
      },
      function(err) {
        done(null, notes);
      }
    );
  }

  /**
   * Return all notes.
   *
   * Makes use of the findNotesMetadata Evernote API method. Because of this,
   * only note metadata is returned. If additional data is needed, you'll need
   * to make a follow-up call to the single() method.
   *
   * A convenience method based on find().
   */
  function all(resultSpecOptions, done) {
    if(!done) {
      done = resultSpecOptions;
      resultSpecOptions = null;
    }

    find(null, resultSpecOptions, done);
  }

  /**
   * Return all notes in given notebook.
   *
   * A convenience method based on find().
   */
  function inNotebook(notebookGuid, resultSpecOptions, done) {
    if(!done) {
      done = resultSpecOptions;
      resultSpecOptions = null;
    }

    find({notebookGuid: notebookGuid}, resultSpecOptions, done);
  }

  /**
   * Return all notes tagged with given tag guids. Note that this will only
   * return notes that contain *all* of the tag guids given.
   */
  function taggedWith(tagGuids, resultSpecOptions, done) {
    if(!done) {
      done = resultSpecOptions;
      resultSpecOptions = null;
    }

    if(!(tagGuids instanceof Array)) {
      tagGuids = [tagGuids];
    }

    find({tagGuids: tagGuids}, resultSpecOptions, done);
  }

  /**
   * Returns a notes content converted from ENML to valid HTML markup.
   *
   * TODO
   */
  function toHtml(content, done) {
    done(null, content);
  }

  /**
   * Returns a notes content converted from ENML to Markdown. This is for notes
   * that have Markdown syntax in them and need the ENML stripped away.
   *
   * TODO
   */
  function toMarkdown(content, done) {
    done(null, content);
  }

  return {
    all: all,
    single: single,
    inNotebook: inNotebook,
    taggedWith: taggedWith,
    toHtml: toHtml,
    toMarkdown: toMarkdown
  }

}

module.exports = ZookeeperNotes;
