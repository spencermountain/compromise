import ngram from './ngram/index.js'
import tfidf from './tfidf/index.js'
import compute from './compute.js'

const api = function (View) {
  ngram(View)
  tfidf(View)
}

export default {
  compute,
  api
}