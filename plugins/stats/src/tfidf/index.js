import compileModel from './compile/index.js'
import model from './_model.js'
// import { unpack } from 'efrt'
import diff from './diff.js'

// const model = unpack(packed)
// console.log(model)


const addMethods = function (View) {
  View.prototype.tfidf = function (mod) {
    if (!mod) {
      mod = model
    }
    let freq = Object.entries(compileModel(this))
    return diff(freq, mod)
  }

  View.prototype.freq = function () {
    return compileModel(this)
  }
}
export default addMethods