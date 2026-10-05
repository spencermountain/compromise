/* eslint-disable no-console, no-unused-vars */
import nlp from '../../../src/three.js'
import plugin from './src/plugin.js'
nlp.extend(plugin)


const txt = '! i walk !ohyeah gh'
const doc = nlp(txt)
doc.searchBangs()
doc.debug()

