import nlp from '../../../tests/03-three/lib.js'

const production = process.env.TESTENV === 'prod'
const path = production ? '../builds/compromise-dates.mjs' : '../src/plugin.js'
const { default: plugin } = await import(path)
nlp.plugin(plugin)

export default nlp
