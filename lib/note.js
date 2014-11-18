var async = require('async');
var en = require('evernote').Evernote;


module.exports = Note;


function Note(client, noteStore) {
  this.client = client;
  this.noteStore = noteStore;
}


/**
 * Get all Evernote notes based on the given filter and result spec options. See
 * Evernote API docs for available parameters. If no result specs are specified,
 * some sane defaults will be used.
 *
 * Makes use of the findNotesMetadata Evernote API method. Because of this,
 * only note metadata is returned. If additional data is needed, you'll need
 * to make a follow-up call to the withGuid(...) method.
 */
Note.prototype.find = function(filterOptions, resultSpecOptions, done) {
  if(!done) {
    done = resultSpecOptions;
    resultSpecOptions = null;
  }

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

  var filter = new en.NoteFilter(filterOptions);
  var resultSpec = new en.NotesMetadataResultSpec(resultSpecOptions);

  var notes = [];
  var noteCount = -1; // -1 to ensure we ignore the first test below so note count is set from result
  var offset = 0;
  var limit = en.EDAM_USER_NOTES_MAX;

  async.until(
    function() {
      return noteCount >= 0 && (offset + 1) * limit > noteCount;
    },
    function(next) {
      this.noteStore.findNotesMetadata(filter, offset, limit, resultSpec,
        function(err, result) {
          if(err) return next(err);

          noteCount = result.totalNotes;
          result.notes.forEach(function(n) {
            notes.push(n);
          });
          offset++;
          next();
        }
      );
    },
    function(err) {
      done(null, notes);
    }
  );
}


/**
 * Return a single Evernote note object based on the given guid.
 */
Note.prototype.withGuid = function(noteGuid, config, done) {
  if(!done) {
    done = config;
    config = {
      withContent: true,
      withResourcesData: true,
      withResourcesRecognition: false,
      withResourcesAlternateData: false
    };
  }

  this.noteStore.getNote(
    noteGuid,
    config.withContent,
    config.withResourcesData,
    config.withResourcesRecognition,
    config.withResourcesAlternateData,
    done
  );
}


/**
 * Return all Evernote note objects within the given notebook guid.
 *
 * See find() for details.
 */
Note.prototype.inNotebook = function(notebookGuid, resultSpecOptions, done) {
  if(!done) {
    done = resultSpecOptions;
    resultSpecOptions = null;
  }

  this.find({notebookGuid: notebookGuid}, resultSpecOptions, done);
}


/**
 * Return all Evernote note objects.
 *
 * See find() for details.
 */
Note.prototype.all = function(resultSpecOptions, done) {
  if(!done) {
    done = resultSpecOptions;
    resultSpecOptions = null;
  }

  this.find(null, resultSpecOptions, done);
}


/**
 * Return all Evernote note objects tagged with given tag guids. Note that this
* will only
 * return notes that contain *all* of the tag guids given.
 *
 * See find() for details.
 */
Note.prototype.taggedWith = function(tagGuids, resultSpecOptions, done) {
  if(!done) {
    done = resultSpecOptions;
    resultSpecOptions = null;
  }

  if(!(tagGuids instanceof Array)) {
    tagGuids = [tagGuids];
  }

  this.find({tagGuids: tagGuids}, resultSpecOptions, done);
}
