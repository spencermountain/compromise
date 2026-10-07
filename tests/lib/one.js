/* eslint-disable no-console */
const production = process.env.TESTENV === 'prod'
const path = production ? '../../builds/one/compromise-one.mjs' : '../../src/one.js'
const { default: nlp } = await import(path)
if (production) {
  console.warn('== production build test 🚀 ==')
}
export default nlp
