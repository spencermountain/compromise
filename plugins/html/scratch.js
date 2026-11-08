/* eslint-disable no-console */
import { readFileSync } from 'node:fs'
import nlp from '../../src/three.js'
import html from './src/plugin.js'
nlp.plugin(html)

const doc = nlp.fromHtml('hello <button>world</button>')
console.log(doc.text())
// 'hello'

const doc2 = nlp.fromHtml('hello <button>world</button>', { button: true })
console.log(doc2.text())
// 'hello world'
