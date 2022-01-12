// import corpus from 'nlp-corpus'
import nlp from '../../src/one.js'
import plugin from './src/index.js'
nlp.extend(plugin)

let txt = 'i saw the toronto raptors play a cleveland foops'
nlp(txt).wikipedia().debug()