/* eslint-disable no-console */
// import build from '../../builds/four/compromise-four.mjs'
import src from '../../src/four.js'
const nlp = src
if (process.env.TESTENV === 'prod') {
  console.warn('== production build test 🚀 ==')
  // nlp = build
  process.exit()
}
export default nlp
