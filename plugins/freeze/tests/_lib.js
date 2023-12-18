import build from '../../../builds/two/compromise-two.mjs'
import src from '../../../src/two.js'
import plgBuild from '../builds/compromise-freeze.mjs'
import plg from '../src/plugin.js'
let nlp

if (process.env.TESTENV === 'prod') {
  console.warn('== production build test 🚀 ==') // eslint-disable-line
  nlp = build
  nlp.plugin(plgBuild)
} else {
  nlp = src
  nlp.plugin(plg)
}
export default nlp
