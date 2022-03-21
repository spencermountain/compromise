import { spliceArr } from './lib/insert.js'

const isArray = (arr) => Object.prototype.toString.call(arr) === '[object Array]'

// append a new document, somehow
const combineDocs = function (homeDocs, inputDocs) {
  // add a space
  let end = homeDocs[homeDocs.length - 1]
  let last = end[end.length - 1]
  if (/ /.test(last.post) === false) {
    last.post += ' '
  }
  homeDocs = homeDocs.concat(inputDocs)
  return homeDocs
}

const combineViews = function (home, input) {
  // is it a view from the same document?
  if (home.document === input.document) {
    let ptrs = home.fullPointer.concat(input.fullPointer)
    return home.toView(ptrs).compute('index')
  }
  // update n of new pointer, to end of our pointer
  let ptrs = input.fullPointer
  ptrs.forEach(a => {
    a[0] += home.document.length
  })
  home.document = combineDocs(home.document, input.document)
  return home.all()
}

export default {
  // add string as new match/sentence
  concat: function (input) {
    const { methods, document, world } = this
    // parse and splice-in new terms
    if (typeof input === 'string') {
      let json = methods.one.tokenize.fromString(input, world)
      let ptrs = this.fullPointer
      let lastN = ptrs[ptrs.length - 1][0]
      spliceArr(document, lastN + 1, json)
      return this.compute('index')
    }
    // plop some view objects together
    if (typeof input === 'object' && input.isView) {
      return combineViews(this, input)
    }
    // assume it's an array of terms
    if (isArray(input)) {
      let docs = combineDocs(this.document, input)
      this.document = docs
      return this.all()
    }
    return this
  },
}