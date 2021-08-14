import chunker from './api/sentences.js'
import selections from './api/selections/index.js'
import chunks from './compute/index.js'

const api = function (View) {
  chunker(View)
  selections(View)
}

export default {
  compute: { chunks },
  api: api,
}
