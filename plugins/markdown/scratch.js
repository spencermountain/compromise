import nlp from '../../src/three.js'
import mdPlugin from './src/plugin.js'
nlp.plugin(mdPlugin)
import readFile from './tests/examples/index.js'

// nlp.fromMarkdown('<3')
nlp.fromMarkdown('hello <3')
// let md = readFile('full-page')

const doc = nlp.fromMarkdown("I can't go to school.")
doc.match('school').replaceWith('work')

console.log(doc.text()) // "I can't go to work."
doc.updateTree() // throws: ambiguous ownership

// const doc = nlp.fromMarkdown(md, { lists: 'skip', quotations: 'skip' })
// console.log(doc.text())
