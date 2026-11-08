import { cleanAppend, cleanPrepend } from './lib/insert.js'
import uuid from '../compute/uuid.js'
import expandContraction from './lib/_expand.js'
import { retag } from '../../../API/_helpers.js'

// set new ids for each terms
const addIds = function (terms) {
  terms = terms.map(term => {
    term.id = uuid(term)
    return term
  })
  return terms
}

const getTerms = function (input, world) {
  const { methods } = world
  // create our terms from a string
  if (typeof input === 'string') {
    return methods.one.tokenize.fromString(input, world)[0] //assume one sentence
  }
  //allow a view object
  if (typeof input === 'object' && input.isView) {
    return input.clone().docs[0] || [] //assume one sentence
  }
  //allow an array of terms, too
  if (Array.isArray(input)) {
    return Array.isArray(input[0]) ? input[0] : input
  }
  return []
}

const insert = function (input, view, prepend) {
  const { document, world } = view
  view.uncache()
  // insert words at end of each doc
  const ptrs = view.fullPointer
  const selfPtrs = view.fullPointer
  view.forEach((m, i) => {
    const ptr = m.fullPointer[0]
    const [n] = ptr
    // add-in the words
    const home = document[n]
    let terms = getTerms(input, world)
    // are we inserting nothing?
    if (terms.length === 0) {
      return
    }
    terms = addIds(terms)
    if (prepend) {
      expandContraction(view.update([ptr]).firstTerm())
      cleanPrepend(home, ptr, terms, document)
    } else {
      expandContraction(view.update([ptr]).lastTerm())
      cleanAppend(home, ptr, terms, document)
    }
    // harden the pointer
    if (document[n]?.[ptr[1]]) {
      ptr[3] = document[n][ptr[1]].id
    }
    // change self backwards by len
    selfPtrs[i] = ptr
    // extend the pointer
    ptr[2] += terms.length
    ptrs[i] = ptr
  })
  const doc = view.toView(ptrs)
  // shift our self pointer, if necessary
  view.ptrs = selfPtrs
  // try to tag them, too
  return retag(doc, ['id', 'index'])
}

const fns = {
  insertAfter: function (input) {
    return insert(input, this, false)
  },
  insertBefore: function (input) {
    return insert(input, this, true)
  },
}
fns.append = fns.insertAfter
fns.prepend = fns.insertBefore
fns.insert = fns.insertAfter

export default fns
