/* eslint-disable no-console */
import { blue, green, yellow, red } from '../../../../API/_color.js'

const colors = { Noun: blue, Verb: green, Adjective: yellow, Pivot: red }

const showChunks = view => {
  console.log('')
  view.docs.forEach(terms => {
    const out = terms.map(term => {
      const text = term.implicit || term.normal
      if (Object.hasOwn(colors, term.chunk)) {
        return colors[term.chunk](text)
      }
      return text
    })
    console.log(out.join(' '), '\n')
  })
  console.log('\n')
}

export default showChunks
