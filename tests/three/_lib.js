/* eslint-disable no-console */
import build from '../../builds/three/compromise-three.mjs'
import src from '../../src/three.js'
let nlp = src
if (process.env.TESTENV === 'prod') {
  console.warn('== production build test 🚀 ==')
  nlp = build
}
export default nlp
