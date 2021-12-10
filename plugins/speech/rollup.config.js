import { terser } from 'rollup-plugin-terser'
import sizeCheck from 'rollup-plugin-filesize-check'

const opts = { keep_classnames: true, module: true }

export default [
  {
    input: 'src/plugin.js',
    output: [{ file: 'builds/compromise-speech.cjs', format: 'umd', name: 'compromiseSpeech' }],
    plugins: [terser(opts), sizeCheck({ expect: 45, warn: 15 })],
  },
  {
    input: 'src/plugin.js',
    output: [{ file: 'builds/compromise-speech.mjs', format: 'esm' }],
    plugins: [terser(opts), sizeCheck({ expect: 45, warn: 15 })],
  }
]
