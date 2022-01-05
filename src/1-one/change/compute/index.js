import uuid from './uuid.js'

const compute = {
  uuid: function (view) {
    let docs = view.docs
    for (let n = 0; n < docs.length; n += 1) {
      for (let i = 0; i < docs[n].length; i += 1) {
        let term = docs[n][i]
        term.uuid = uuid(term.index[0], term.index[1])
      }
    }
  }
}

export default compute