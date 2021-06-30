/* eslint-disable no-console */

// import * as build from '../builds/compromise.min.js'
import src from '../src/index.js'

let nlp = src
if (process.env.TESTENV === 'prod') {
  // eslint-disable-next-line
  console.warn('== production build test 🚀 ==')
  // nlp = build
}
export default nlp
