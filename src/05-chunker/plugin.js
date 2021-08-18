import api from './api/index.js'
import chunks from './compute/index.js'

export default {
  compute: { chunks },
  api: api,
  // hooks: ['chunks'],
}
