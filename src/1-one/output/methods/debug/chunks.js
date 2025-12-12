/* eslint-disable no-console */
import cli from './_color.js'

const showChunks = function (view) {
  const { docs } = view
  console.log('')
  docs.forEach(terms => {
    const out = []
    terms.forEach(term => {
      if (term.chunk === 'Noun') {
        out.push(cli.blue(term.implicit || term.normal))
      } else if (term.chunk === 'Verb') {
        out.push(cli.green(term.implicit || term.normal))
      } else if (term.chunk === 'Adjective') {
        out.push(cli.yellow(term.implicit || term.normal))
      } else if (term.chunk === 'Pivot') {
        out.push(cli.red(term.implicit || term.normal))
      } else {
        out.push(term.implicit || term.normal)
      }
    })
    console.log(out.join(' '), '\n')
  })
  console.log('\n')
}
export default showChunks
