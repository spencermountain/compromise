import terser from '@rollup/plugin-terser'
import sizeCheck from 'rollup-plugin-filesize-check'
import { nodeResolve } from '@rollup/plugin-node-resolve';

const opts = { keep_classnames: true, module: true }

export default [
  {
    input: 'src/plugin.js',
    output: [{ file: 'builds/compromise-wikipedia.cjs', format: 'umd', name: 'compromiseWikipedia' }],
    plugins: [nodeResolve(), sizeCheck({ expect: 492, warn: 15 })],
  },
  {
    input: 'src/plugin.js',
    output: [{ file: 'builds/compromise-wikipedia.min.js', format: 'umd', name: 'compromiseWikipedia' }],
    plugins: [nodeResolve(), terser(opts), sizeCheck({ expect: 387, warn: 15 })],
  },
  {
    input: 'src/plugin.js',
    output: [{ file: 'builds/compromise-wikipedia.mjs', format: 'esm' }],
    plugins: [nodeResolve(), terser(opts), sizeCheck({ expect: 387, warn: 15 })],
  }
]
