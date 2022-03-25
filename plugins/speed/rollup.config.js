import { terser } from 'rollup-plugin-terser'
import sizeCheck from 'rollup-plugin-filesize-check'
import { nodeResolve } from '@rollup/plugin-node-resolve';

const opts = { keep_classnames: true, module: true }

export default [
  {
    input: 'src/plugin.js',
    output: [{ file: 'builds/compromise-speed.cjs', format: 'umd', name: 'compromiseSpeed' }],
    plugins: [nodeResolve(), sizeCheck({ expect: 530, warn: 15 })],
  },
  {
    input: 'src/plugin.js',
    output: [{ file: 'builds/compromise-speed.min.js', format: 'umd', name: 'compromiseSpeed' }],
    plugins: [nodeResolve(), terser(opts), sizeCheck({ expect: 269, warn: 15 })],
  },
  {
    input: 'src/plugin.js',
    output: [{ file: 'builds/compromise-speed.mjs', format: 'esm' }],
    plugins: [nodeResolve(), terser(opts), sizeCheck({ expect: 269, warn: 15 })],
  }
]
