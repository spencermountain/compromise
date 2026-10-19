import nlp from '../../../../tests/01-one/lib.js'

const production = process.env.TESTENV === 'prod'
const path = production ? '../builds/compromise-wikipedia.mjs' : '../src/plugin.js'
const { default: plugin } = await import(path)
nlp.plugin(plugin)

export default nlp
