import api from './api/api.js'
import chunks from './compute/index.js'

export default {
  compute: { chunks },
  api: api,
  // hooks: ['chunks'],
}
