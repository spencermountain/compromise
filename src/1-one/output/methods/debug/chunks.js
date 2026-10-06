/* eslint-disable no-console */
import { blue, green, yellow, red } from '../../../../API/_color.js'

const showChunks = function (view) {
  const { docs } = view
  console.log('')
  docs.forEach(terms => {
    const out = []
    terms.forEach(term => {
      if (term.chunk === 'Noun') {
        out.push(blue(term.implicit || term.normal))
      } else if (term.chunk === 'Verb') {
        out.push(green(term.implicit || term.normal))
      } else if (term.chunk === 'Adjective') {
        out.push(yellow(term.implicit || term.normal))
      } else if (term.chunk === 'Pivot') {
        out.push(red(term.implicit || term.normal))
      } else {
        out.push(term.implicit || term.normal)
      }
    })
    console.log(out.join(' '), '\n')
  })
  console.log('\n')
}
export default showChunks
