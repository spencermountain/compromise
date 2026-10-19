/* eslint-disable no-console */
import { readFileSync } from 'node:fs'
import nlp from '../../src/three.js'
import html from './src/plugin.js'

nlp.plugin(html)
const page = readFileSync(new URL('./tests/examples/full-page.html', import.meta.url), 'utf8')
// Full-page mode retains the doctype, head, and body in the source tree.
const doc = nlp.fromHtml(page, { fragment: false })
console.log(doc.text())
console.log('Matches across markup:', doc.has('walks to school'))
// doc.match('walks to school').debug('ast')
//
// // Change a bound word, then explicitly apply the edit to its original text node.
// doc.match('walks').replaceWith('walked')
// doc.match('farewellToken').replaceWith('goodbyeToken')
// doc.updateHast()
// console.log(doc.html())
