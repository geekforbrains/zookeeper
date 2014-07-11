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

*This is a work in progress. More examples will be posted as I further
development.*

```
var zookeeper = require('evernote-zookeeper');
var zk = zookeeper({token: '<access-token-here>'});
```

### User

```
zk.user.info(function(err, info) {
  // work with user info
});
```

### Notebooks

```
zk.notebooks.all(function(err, notebooks) {
  // work with notebooks
});

zk.notebooks.single(guid, options, function(err, notebook) {
  // work with single notebook instance
});
```

### Notes

```
zk.notes.all(function(err, notes) {
  // work with all notes
});

zk.notes.single(guid, options, function(err, note) {
  // work with single note object
});

zk.notes.inNotebook(notebookGuid, function(err, notes) {  
  // work with notes in specific notebook
});

zk.notes.taggedWith(tags, function(err, notes) {
  // work with tagged notes
});

zk.notes.toHtml(guid, function(err, html) {
  // single note converted into html
});

zk.notes.toMarkdown(guid, function(err, html) {
  // single note converted into markdown
})
```

### Tags

```
zk.tags.all(function(err, tags) {
  // all tags
});

zk.tags.single(tagGuid, function(err, tag) {
  // a single tag object
});

zk.tags.byName(tagNames, function(err, tags) {
  // tag objects for the given tag names
});
```

Tests
-----

You'll need an Evernote API key as well as an account to run tests. Set keys in the
`test/config.js` file before running.

```
npm test
```
