import world from './world.js'
import api from './methods/index.js'
import { repair, isSame } from './methods/_repair.js'

class View {
  constructor(document, pointer, groups = {}) {
    Object.defineProperty(this, 'document', {
      value: document,
      writable: true,
    })
    Object.defineProperty(this, 'world', {
      value: world,
      writable: true,
    })
    Object.defineProperty(this, '_groups', {
      value: groups,
      writable: true,
    })
    Object.defineProperty(this, '_cache', {
      value: null,
      writable: true,
    })
    // Object.defineProperty(this, 'pointer', {
    //   value: pointer,
    //   writable: true,
    // })
    this.ptrs = pointer
    // this.size = pointer ? pointer.length : 0
  }
  /* getters:  */
  get docs() {
    let docs = this.document
    if (this.ptrs) {
      docs = world.methods.one.getDoc(this.ptrs, this.document)
    }
    // is the pointer stale?
    if (this.frozen && isSame(docs, this.frozen) === false) {
      repair(this)
      docs = world.methods.one.getDoc(this.ptrs, this.document)
    }
    // lazy-getter (fires once)
    // Object.defineProperty(this, 'docs', {
    //   value: docs,
    // })
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
    if (frozen && isSame(docs, this.frozen) === false) {
      repair(this)
      docs = this.docs
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
    m._cache = this._cache // share this full thing
    return m
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
    let m = new View(document, this.pointer)
    // m._cache = this._cache //clone this too?
    return m
  }
}
Object.assign(View.prototype, api)
export default View
