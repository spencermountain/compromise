import ngram from './ngram/index.js'
import tfidf from './tfidf/index.js'

const api = function (View) {
  ngram(View)
  tfidf(View)
}

export default {
  api
}