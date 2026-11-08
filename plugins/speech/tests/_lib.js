import nlp from '../../../tests/01-one/lib.js'

const production = process.env.TESTENV === 'prod'
const path = production ? '../builds/compromise-speech.mjs' : '../src/plugin.js'
const { default: plugin } = await import(path)
nlp.plugin(plugin)

// Exercise the selected plugin without tokenizing the supplied term.
const splitTerm = term => {
  plugin.compute.syllables({ docs: [[term]] })
  return term.syllables
}

export { splitTerm }

export default nlp
