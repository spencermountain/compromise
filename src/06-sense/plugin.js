import model from './model/index.js'
import sense from './compute/index.js'

export default {
  compute: { sense },
  model: model,
  hooks: ['sense'],
}
