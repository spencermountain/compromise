 
import build from '../../builds/two/compromise-two.mjs'
import src from '../../src/two.js'
let nlp = src
if (process.env.TESTENV === 'prod') {
  console.warn('== production build test 🚀 ==')
  nlp = build
}
export default nlp
