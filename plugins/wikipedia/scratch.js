// import corpus from 'nlp-corpus'
import nlp from '../../src/one.js'
import plugin from './src/plugin.js'
nlp.extend(plugin)

let txt = ''
txt = `Moreover, it is always possible to consolidate for discovery different cases that involve construction of the same claims.`

txt = 'i saw the toronto raptors play a cleveland foops'
const doc = nlp(txt)
const m = doc.wikipedia()
m.debug()