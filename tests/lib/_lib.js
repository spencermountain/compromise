/* eslint-disable no-console */
// import path from 'path'
// import * as build from '../builds/compromise.min.js'
import src from '../../src/index.js'

// import './_error.js'

let nlp = src
if (process.env.TESTENV === 'prod') {
  // eslint-disable-next-line
  console.warn('== production build test 🚀 ==')
  // nlp = build
}
export default nlp
