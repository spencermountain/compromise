import nlp from '../../../tests/01-one/lib.js'

const production = process.env.TESTENV === 'prod'
const path = production ? '../builds/compromise-speed.mjs' : '../src/plugin.js'
const { streamFile } = await import(path)

export { streamFile }
export default nlp
