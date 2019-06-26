import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import { terser } from 'rollup-plugin-terser'

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: 'builds/compromise.js',
        format: 'cjs',
      },
    ],
    plugins: [json(), commonjs()],
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: 'builds/compromise.min.js',
        format: 'cjs',
      },
    ],
    plugins: [json(), commonjs(), terser()],
  },
]
