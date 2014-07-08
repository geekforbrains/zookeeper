function ZookeeperNotebooks(client) {

  function all(done) {
    client.getNoteStore().listNotebooks(done);
  }

  function single(notebookGuid, done) {

  }

  return {
    all: all,
    single: single
  }

}

module.exports = ZookeeperNotebooks;
