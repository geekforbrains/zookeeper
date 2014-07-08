var evernote = require('evernote').Evernote;
var auth = require('./auth');
var user = require('./user');
var notebooks = require('./notebooks');
var notes = require('./notes');


function Zookeeper(config) {

  var client = new evernote.Client({
    consumerKey: config.consumerKey,
    consumerSecret: config.consumerSecret,
    token: config.token,
    sandbox: config.sandbox
  });

  return {
    auth: auth(client),
    user: user(client),
    notebooks: notebooks(client),
    notes: notes(client)
  }

}

module.exports = Zookeeper;
