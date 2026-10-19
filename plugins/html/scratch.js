/* eslint-disable no-console */
import { readFileSync } from 'node:fs'
import nlp from '../../src/three.js'
import html from './src/plugin.js'
nlp.plugin(html)

// Default: parse a fragment without adding html/head/body wrappers.
const snippet = nlp.fromHtml('<p>Hello world.</p>', { fragment: false })
console.log(snippet.toHtml({ format: true }))
