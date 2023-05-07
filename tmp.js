import pairs from './data/pairs/AdjToNoun.js'

import { compress, learn } from 'suffix-thumb'
const model = learn(pairs, { reverse: false })
let m = compress(model)
console.log(m)
