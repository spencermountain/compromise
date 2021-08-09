import { methods, model } from '../lib/world.js'

class View {
  constructor(document, pointer, groups = {}) {
    this.document = document
    Object.defineProperty(this, 'model', {
      enumerable: false,
      value: model,
      writable: true,
    })
    Object.defineProperty(this, 'methods', {
      enumerable: false,
      value: methods,
      writable: true,
    })
    Object.defineProperty(this, '_groups', {
      enumerable: false,
      value: groups,
      writable: true,
    })
    Object.defineProperty(this, '_cache', {
      enumerable: false,
      value: null,
      writable: true,
    })
    // helper isView boolean
    Object.defineProperty(this, 'isView', {
      enumerable: false,
      value: true,
      writable: true,
    })
    this.pointer = pointer
  }
  /* getters:  */
  // lazy-getter (fires once)
  get docs() {
    let docs = this.document
    if (this.pointer) {
      docs = methods.one.getDoc(this.pointer, this.document)
    }
    Object.defineProperty(this, 'docs', {
      value: docs,
    })
    return docs
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
    let { docs, pointer } = this
    let ptrs = pointer || docs.map((_d, n) => [n])
    return ptrs.map((a, n) => {
      a[1] = a[1] || 0
      a[2] = a[2] || docs[n].length
      return a
    })
  }
  // create a new View, from this one
  update(pointer) {
    let m = new View(this.document, pointer)
    m._cache = this._cache // share this full thing
    return m
  }
}
export default View
