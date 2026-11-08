// Run the same assertions against source and the distributable ESM bundle.
const path = process.env.TESTENV === 'prod' ? '../builds/compromise-html.mjs' : '../src/plugin.js'
const { default: plugin } = await import(path)

export default plugin
