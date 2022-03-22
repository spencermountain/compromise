/* eslint-disable no-console */
import build from '../../builds/four/compromise-four.mjs'
import src from '../../src/four.js'
let nlp = src
if (process.env.TESTENV === 'prod') {
  console.warn('== production build test 🚀 ==')
  nlp = build
}
export default nlp
