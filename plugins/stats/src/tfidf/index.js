import pcked from './_model.js'
import tf from './tf.js'
import idf from './idf.js'
import unpack from './unpack.js'

const model = unpack(pcked)
const keys = Object.keys(model)
const max = model[keys[keys.length - 1]] * 1.1
// console.log(Object.keys(model).length.toLocaleString())
// console.log(model.sway)

const addMethods = function (View) {

  View.prototype.tfidf = function (opts = {}, mod) {
    if (!mod) {
      mod = model
    }
    // term frequency
    const counts = tf(this, opts)
    let freqs = Object.entries(counts)
    freqs = freqs.map(a => {
      const [w, count] = a
      // tfidf = tf * idf
      let tfidf = count * (model[w] || max)
      // round it 2 decimals
      tfidf = Math.round(tfidf * 100) / 100
      a[1] = tfidf
      return a
    })

    return freqs.sort((a, b) => {
      if (a[1] > b[1]) {
        return -1
      } else if (a[1] < b[1]) {
        return 1
      }
      return 0
    })
  }

  View.prototype.buildIDF = idf
}
export default addMethods