/* eslint-disable no-console */
import build from '../../builds/compromise-one.mjs'
import src from '../../src/one/index.js'
let nlp = src
if (process.env.TESTENV === 'prod') {
  console.warn('== production build test 🚀 ==')
  nlp = build
}
export default nlp
