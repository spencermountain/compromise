import compileModel from './compile/index.js'
import pcked from './_model.js'
import { unpack } from 'efrt'
import diff from './diff.js'

const unzip = function (model) {
  let all = {}
  Object.keys(model).forEach(k => {
    model[k] = unpack(model[k])
    let num = Number(k)
    Object.keys(model[k]).forEach(w => {
      all[w] = num
    })
  })
  return all
}

const model = unzip(pcked)


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