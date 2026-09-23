import build from '../../../builds/three/compromise-three.mjs'
import src from 'compromise'
import plgBuild from '../builds/compromise-dates.mjs'
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
