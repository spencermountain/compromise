import build from '../../../builds/one/compromise-one.mjs'
import src from '../../../src/one.js'
import plgBuild from '../builds/compromise-speech.mjs'
import plg from '../src/plugin.js'
let nlp;

if (process.env.TESTENV === 'prod') {
  console.warn('== production build test 🚀 ==')  // eslint-disable-line
  nlp = build
  nlp.plugin(plgBuild)
} else {
  nlp = src
  nlp.plugin(plg)
}
export default nlp
