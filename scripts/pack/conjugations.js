import { compress, learn } from 'suffix-thumb'
import pairs from '../../data/pairs/index.js'

const packConjugations = () => {
  const packed = {}
  Object.keys(pairs).forEach(key => {
    const opts = {}
    if (key === 'AdjToNoun') {
      opts.reverse = false
    }
    const model = learn(pairs[key], opts)
    packed[key] = compress(model)
  })
  return packed
}

export default packConjugations
