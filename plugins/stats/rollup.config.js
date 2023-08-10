import terser from '@rollup/plugin-terser'
import sizeCheck from 'rollup-plugin-filesize-check'
import { nodeResolve } from '@rollup/plugin-node-resolve';

const opts = { keep_classnames: true, module: true }

export default [
  {
    input: 'src/plugin.js',
    output: [{ file: 'builds/compromise-stats.cjs', format: 'umd', name: 'compromiseStats' }],
    plugins: [nodeResolve(), sizeCheck({ expect: 76, warn: 15 })],
  },
  {
    input: 'src/plugin.js',
    output: [{ file: 'builds/compromise-stats.min.js', format: 'umd', name: 'compromiseStats' }],
    plugins: [nodeResolve(), terser(opts), sizeCheck({ expect: 67, warn: 15 })],
  },
  {
    input: 'src/plugin.js',
    output: [{ file: 'builds/compromise-stats.mjs', format: 'esm' }],
    plugins: [nodeResolve(), terser(opts), sizeCheck({ expect: 67, warn: 15 })],
  }
]
