Zookeeper
=========

A tool for taming the Evernote API

The Evernote SDK is clunky and repetitive. I hope Zookeeper will make your work
with their API more enjoyable.

Installation
------------

```
npm install evernote-zookeeper
```

Usage
-----

```
var Zookeeper = require('evernote-zookeeper');
var zk = new Zookeeper(accessToken);
```

### User

```
zk.user.info(function(err, info) {
  // work with user info (includes public info - see user.publicInfo)
});

zk.user.publicInfo(function(err, publicInfo) {
  // work with public user info
});
```

### Notebooks

```
zk.notebook.withGuid(guid, options, function(err, notebook) {
  // work with single notebook instance
});

zk.notebooks.all(function(err, notebooks) {
  // work with notebooks
});
```

### Notes

```
zk.note.withGuid(guid, options, function(err, note) {
  // work with single note object
});

zk.notes.all(function(err, notes) {
  // work with all notes
});

zk.notes.inNotebook(notebookGuid, function(err, notes) {  
  // work with notes in specific notebook
});

zk.notes.taggedWith(tags, function(err, notes) {
  // work with tagged notes
});

zk.note.share(webApiUrlPrefix, noteGuid, function(err, shareInfo) {
  // `webApiUrlPrefix` can be retrieved by calling user.publicInfo method.
  // work with shared note
});
```

### Tags

```
zk.tags.all(function(err, tags) {
  // all tags
});

zk.tag.withGuid(tagGuid, function(err, tag) {
  // a single tag object
});

zk.tags.named(['tag-a', 'tag-b'], function(err, tags) {
  // work with tag objects
});
```

Tests
-----

You'll need an Evernote API key as well as an account to run tests. During the test
you'll be asked for your API keys in order to generate an access token. Just follow
the prompts.

```
npm test
```
