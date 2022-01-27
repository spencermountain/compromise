import pcked from './_model.js'
import tf from './tf.js'
import idf from './idf.js'
import unpack from './unpack.js'

const model = unpack(pcked)
// console.log(model)
// console.log(Object.keys(model).length.toLocaleString())
// console.log(model.stun)

const addMethods = function (View) {

  View.prototype.tfidf = function (mod, opts = {}) {
    // inverse document frequeny
    mod = !mod ? model : mod
    // term frequency
    let counts = tf(this, opts)
    let freqs = Object.entries(counts)
    freqs = freqs.map(a => {
      let [w, count] = a
      // tfidf
      console.log(w, mod[w])
      let tfidf = count * (mod[w] || 1)
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

  View.prototype.idf = idf
}
export default addMethods