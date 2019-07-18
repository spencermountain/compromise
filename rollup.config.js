import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import { terser } from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: 'builds/compromise.mjs',
        format: 'esm',
      },
    ],
    plugins: [resolve(), json(), commonjs()],
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: 'builds/compromise.js',
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [resolve(), json(), commonjs()],
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: 'builds/compromise.min.js',
        format: 'cjs',
      },
    ],
    plugins: [resolve(), json(), commonjs(), terser()],
  },
]
