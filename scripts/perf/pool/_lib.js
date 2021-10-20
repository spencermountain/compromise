/* eslint-disable no-console */
import src from '../../../src/three.js'

let nlp
if (process.env.TESTENV === 'prod') {
  console.warn('== production build test 🚀 ==')
  // nlp = require('../../../builds/compromise.min.js')
} else {
  nlp = src
  // nlp.extend(require('../plugins/numbers/src'))
}

export default nlp
