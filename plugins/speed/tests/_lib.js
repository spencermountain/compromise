import build from '../../../builds/one/compromise-one.mjs'
import src from '../../../src/one.js'
let nlp;

if (process.env.TESTENV === 'prod') {
  console.warn('== production build test 🚀 ==')  // eslint-disable-line
  nlp = build
} else {
  nlp = src
}
export default nlp
