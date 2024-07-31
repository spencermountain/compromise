import terser from '@rollup/plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import sizeCheck from 'rollup-plugin-filesize-check'

const opts = { keep_classnames: true, module: true }

export default [
  // === Main ==
  {
    input: 'src/three.js',
    output: [{ file: 'builds/compromise.js', format: 'umd', name: 'nlp' }],
    plugins: [nodeResolve(), terser(opts), sizeCheck({ expect: 277, warn: 30 })],
  },

  // === One ==
  {
    input: 'src/one.js',
    output: [{ file: 'builds/one/compromise-one.cjs', format: 'umd', name: 'nlp' }],
    plugins: [nodeResolve(), terser(opts), sizeCheck({ expect: 69, warn: 15 })],
  },
  {
    input: 'src/one.js',
    output: [{ file: 'builds/one/compromise-one.mjs', format: 'esm' }],
    plugins: [nodeResolve(), terser(opts), sizeCheck({ expect: 69, warn: 15 })],
  },

  // === Two ==
  {
    input: 'src/two.js',
    output: [{ file: 'builds/two/compromise-two.cjs', format: 'umd', name: 'nlp' }],
    plugins: [nodeResolve(), terser(opts), sizeCheck({ expect: 226, warn: 30 })],
  },
  {
    input: 'src/two.js',
    output: [{ file: 'builds/two/compromise-two.mjs', format: 'esm' }],
    plugins: [nodeResolve(), terser(opts), sizeCheck({ expect: 226, warn: 30 })],
  },

  // === Three ==
  {
    input: 'src/three.js',
    output: [{ file: 'builds/three/compromise-three.cjs', format: 'umd', name: 'nlp' }],
    plugins: [nodeResolve(), terser(opts), sizeCheck({ expect: 277, warn: 30 })],
  },
  {
    input: 'src/three.js',
    output: [{ file: 'builds/three/compromise-three.mjs', format: 'esm' }],
    plugins: [nodeResolve(), terser(opts), sizeCheck({ expect: 277, warn: 30 })],
  },

]
