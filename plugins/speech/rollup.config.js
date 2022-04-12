import { terser } from 'rollup-plugin-terser'
import sizeCheck from 'rollup-plugin-filesize-check'
import { nodeResolve } from '@rollup/plugin-node-resolve';

const opts = { keep_classnames: true, module: true }

export default [
  {
    input: 'src/plugin.js',
    output: [{ file: 'builds/compromise-speech.cjs', format: 'umd', name: 'compromiseSpeech' }],
    plugins: [nodeResolve(), sizeCheck({ expect: 11, warn: 15 })],
  },
  {
    input: 'src/plugin.js',
    output: [{ file: 'builds/compromise-speech.min.js', format: 'umd', name: 'compromiseSpeech' }],
    plugins: [nodeResolve(), terser(opts), sizeCheck({ expect: 4, warn: 15 })],
  },
  {
    input: 'src/plugin.js',
    output: [{ file: 'builds/compromise-speech.mjs', format: 'esm' }],
    plugins: [nodeResolve(), terser(opts), sizeCheck({ expect: 4, warn: 15 })],
  }
]
