import uuid from './uuid.js'
import eachTerm from '../../tokenize/compute/_lib.js'

const compute = {
  id: function (view) {
    eachTerm(view.docs, term => {
      term.id ||= uuid(term)
    })
  }
}

export default compute
