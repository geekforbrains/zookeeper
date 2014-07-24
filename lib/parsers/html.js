var async = require('async');


/**
 * Resources are sent to the formatter function. Their values are used to replace
 * any <en-media> tags in the note content.
 */
function html(note, formatter, done) {
  var formattedResources = {};

  if(!done) {
    done = formatter;
    formatter = null;
  }

  if(note.resources && formatter) {
    async.each(note.resources,
      function(resource, nextResource) {
        var resourceHash = new Buffer(resource.data.bodyHash).toString('hex');
        formatter(resource, function(err, replacement) {
          formattedResources[resourceHash] = replacement;
          nextResource(err);
        });
      },
      function(err) {
        console.log(formattedResources);
        done(note.content);
      }
    );
  } else {
    console.log('No resources');
    done(note.content);
  }

}

module.exports = html;
