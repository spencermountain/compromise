import model from './model/index.js'
import api from './api/api.js'
import getSense from './compute/index.js'

export default {
  compute: { sense: getSense },
  api,
  model,
  hooks: ['sense'],
}
