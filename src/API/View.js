import world from './world.js'
import api from './methods/index.js'
import { getPtrs } from './methods/_repair.js'

class View {
  constructor(document, pointer, groups = {}) {
    // invisible props
    [
      ['document', document],
      ['world', world],
      ['_groups', groups],
      ['_cache', null],
      ['viewType', 'View']
    ].forEach(a => {
      Object.defineProperty(this, a[0], {
        value: a[1],
        writable: true,
      })
    })
    this.ptrs = pointer
  }
  /* getters:  */
  get docs() {
    let docs = this.document
    if (this.frozen) {
      return this.frozen
    }
    if (this.ptrs) {
      docs = world.methods.one.getDoc(this.ptrs, this.document)
    }
    return docs
  }
  get pointer() {
    return this.ptrs
  }
  get methods() {
    return this.world.methods
  }
  get model() {
    return this.world.model
  }
  get hooks() {
    return this.world.hooks
  }
  get isView() {
    return true //this comes in handy sometimes
  }
  // is the view not-empty?
  get found() {
    return this.docs.length > 0
  }
  // how many matches we have
  get length() {
    return this.docs.length
  }
  // return a more-hackable pointer
  get fullPointer() {
    let { docs, ptrs, document, frozen } = this
    // compute our pointer from frozen terms
    if (frozen) {
      return getPtrs(this)
      // return this.methods.one.pointerFromTerms(frozen)
    }
    // compute a proper pointer, from docs
    let pointers = ptrs || docs.map((_d, n) => [n])
    return pointers.map(a => {
      a = a.slice(0) //clone it
      a[1] = a[1] || 0
      a[2] = a[2] || (document[a[0]] || []).length
      return a
    })
  }
  // create a new View, from this one
  update(pointer) {
    let m = new View(this.document, pointer)
    // send the cache down, too?
    if (m._cache && pointer && pointer.length > 1) {
      // only if it's full
      let cache = []
      pointer.forEach(ptr => {
        if (ptr.length === 1) {
          cache.push(m._cache[ptr[0]])
        }
      })
      m._cache = cache
    }
    m.world = this.world
    return m
  }
  // create a new View, from this one
  toView(pointer) {
    if (pointer === undefined) {
      pointer = this.pointer
    }
    let m = new View(this.document, pointer)
    // m._cache = this._cache // share this full thing
    return m
  }
  fromText(input) {
    const { methods, world } = this
    //assume ./01-tokenize is installed
    let document = methods.one.tokenize(input, world)
    let doc = new View(document)
    doc.world = world
    // doc.compute(world.hooks)
    doc.compute(['normal', 'lexicon', 'preTagger'])
    return doc
  }
  clone() {
    // clone the whole document
    let document = this.document.slice(0)
    document = document.map(terms => {
      return terms.map(term => {
        term = Object.assign({}, term)
        term.tags = new Set(term.tags)
        return term
      })
    })
    // clone only sub-document ?
    let m = this.update(this.pointer)
    m.document = document
    m._cache = this._cache //clone this too?
    return m
  }
}
Object.assign(View.prototype, api)
export default View
