import terser from '@rollup/plugin-terser'
import sizeCheck from 'rollup-plugin-filesize-check'
import { nodeResolve } from '@rollup/plugin-node-resolve';

const opts = { keep_classnames: true, module: true }

export default [
  {
    input: 'src/plugin.js',
    output: [{ file: 'builds/compromise-paragraphs.cjs', format: 'umd', name: 'compromiseParagraphs' }],
    plugins: [nodeResolve(), sizeCheck({ expect: 5, warn: 15 })],
  },
  {
    input: 'src/plugin.js',
    output: [{ file: 'builds/compromise-paragraphs.min.js', format: 'umd', name: 'compromiseParagraphs' }],
    plugins: [nodeResolve(), terser(opts), sizeCheck({ expect: 5, warn: 15 })],
  },
  {
    input: 'src/plugin.js',
    output: [{ file: 'builds/compromise-paragraphs.mjs', format: 'esm' }],
    plugins: [nodeResolve(), terser(opts), sizeCheck({ expect: 5, warn: 15 })],
  }
]
