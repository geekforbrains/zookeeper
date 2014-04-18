Zookeeper
=========

A tool for taming the Evernote API

  var zookeeper = require('zookeeper');
  var zk = zookeeper({token: 'your-access-token'});

  zk.user.info(function(err, userData) {
    console.log(userData);
  });

  zk.user.notebooks(function(err, notebooks) {
    async.each(notebooks,
      function(notebook, callback) {
        notebook.notes(function(err, notes) {
          console.log(notes);
          callback(err);
        });
      },
      function(err) {
        console.log('Yay!');
      }
    );
  });
