import { methods, model } from '../world.js'
import addMethods from './methods.js'
import addAliases from './aliases.js'
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
    this.pointer = pointer
    this.verbose = false
  }
  /*
  
      getters:
      -------
    */
  // lazy-getter pattern (fires once)
  get docs() {
    let docs = this.document
    if (this.pointer) {
      docs = methods.getDoc(this.pointer, this.document)
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
  // create a new View, from this one
  update(pointer) {
    let m = new View(this.document, pointer)
    m._cache = this._cache // share this full thing
    return m
  }
}
addMethods(View)
addAliases(View)
export default View
