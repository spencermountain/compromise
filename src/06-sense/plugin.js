import model from './model/index.js'
import getSense from './compute/index.js'

export default {
  compute: { sense: getSense },
  model: model,
  hooks: ['sense'],
}
