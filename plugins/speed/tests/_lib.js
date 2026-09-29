import build from '../../../builds/one/compromise-one.mjs'
import src from 'compromise/one'
import { streamFile as sourceStreamFile } from '../src/plugin.js'
import { streamFile as builtStreamFile } from '../builds/compromise-speed.mjs'
export const streamFile = process.env.TESTENV === 'prod' ? builtStreamFile : sourceStreamFile
let nlp;

if (process.env.TESTENV === 'prod') {
  console.warn('== production build test 🚀 ==')  // eslint-disable-line
  nlp = build
} else {
  nlp = src
}
export default nlp
