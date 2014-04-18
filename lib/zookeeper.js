var Evernote = require('evernote').Evernote;


module.exports = function(config) {

  var client = new Evernote.Client({
    consumerKey: config.consumerKey,
    consumerSecret: config.consumerSecret,
    token: config.token,
    sandbox: config.sandbox
  });

  return {
    auth: require('./auth')(client),
    user: require('./user')(client)
  }

}
