/* eslint-disable no-console */
import build from '../../../builds/three/compromise-three.mjs'
import src from '../../../src/three.js'
let nlp = src
import dates from '../src/plugin.js'

// import dateBuild from '../builds/compromise-dates.js'
if (process.env.TESTENV === 'prod') {
  console.warn('== production build test 🚀 ==')
  nlp = build
}
nlp.plugin(dates)
export default nlp
