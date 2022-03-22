import { terser } from 'rollup-plugin-terser'
import sizeCheck from 'rollup-plugin-filesize-check'

const opts = { keep_classnames: true, module: true }

export default [
  {
    input: 'src/plugin.js',
    output: [{ file: 'builds/compromise-stream.cjs', format: 'umd', name: 'compromiseStream' }],
    plugins: [sizeCheck({ expect: 11, warn: 15 })],
  },
  {
    input: 'src/plugin.js',
    output: [{ file: 'builds/compromise-stream.min.js', format: 'umd', name: 'compromiseStream' }],
    plugins: [terser(opts), sizeCheck({ expect: 4, warn: 15 })],
  },
  {
    input: 'src/plugin.js',
    output: [{ file: 'builds/compromise-stream.mjs', format: 'esm' }],
    plugins: [terser(opts), sizeCheck({ expect: 4, warn: 15 })],
  }
]
