import terser from '@rollup/plugin-terser'
import sizeCheck from 'rollup-plugin-filesize-check'
import { nodeResolve } from '@rollup/plugin-node-resolve';

const opts = { keep_classnames: true, module: true }
const umdOpts = { ...opts, module: false }

export default [
  {
    input: 'src/plugin.js',
    output: [{ file: 'builds/compromise-speed.cjs', format: 'umd', name: 'compromiseSpeed' }],
    plugins: [nodeResolve(), sizeCheck({ expect: 5, warn: 15 })],
  },
  {
    input: 'src/plugin.js',
    output: [{ file: 'builds/compromise-speed.min.js', format: 'umd', name: 'compromiseSpeed' }],
    plugins: [nodeResolve(), terser(umdOpts), sizeCheck({ expect: 5, warn: 15 })],
  },
  {
    input: 'src/plugin.js',
    output: [{ file: 'builds/compromise-speed.mjs', format: 'esm' }],
    plugins: [nodeResolve(), terser(opts), sizeCheck({ expect: 5, warn: 15 })],
  }
]
