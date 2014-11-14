var en = require('evernote').Evernote;
var Auth = require('./auth');
var User = require('./user');
var Notebook = require('./notebook');
var Note = require('./note');
var Tag = require('./tag');


module.exports = Zookeeper;


function Zookeeper(config) {
  client = new en.Client({
    consumerKey: config.consumerKey,
    consumerSecret: config.consumerSecret,
    token: config.token,
    sandbox: config.sandbox
  });

  userStore = client.getUserStore();
  noteStore = client.getNoteStore();

  this.auth = new Auth(client);

  this.user = new User(client, userStore);
  this.users = this.user; // Syntactic sugar

  this.notebook = new Notebook(client, noteStore);
  this.notebooks = this.notebook; // Syntactic sugar

  this.note = new Note(client, noteStore);
  this.notes = this.note; // Syntactic sugar

  this.tag = new Tag(client, noteStore);
  this.tags = this.tag; // Syntactic sugar
}
