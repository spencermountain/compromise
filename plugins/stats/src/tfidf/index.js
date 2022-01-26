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
// console.log(model)
// console.log(Object.keys(model).length.toLocaleString())
// console.log(model.stun)

const addMethods = function (View) {
  View.prototype.tfidf = function (mod) {
    if (!mod) {
      mod = model
    }
    this.compute('root')
    let freq = Object.entries(compileModel(this))
    let res = diff(freq, mod)
    return res
  }

  View.prototype.freq = function () {
    return compileModel(this)
  }
}
export default addMethods