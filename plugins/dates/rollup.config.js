import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'
import sizeCheck from 'rollup-plugin-filesize-check'
const name = 'compromise-dates'
import alias from '@rollup/plugin-alias'

import { version } from './package.json'
const banner = `/* ${name} ${version} MIT */`

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: `builds/${name}.mjs`,
        format: 'esm',
        banner: banner,
      },
    ],
    plugins: [
      alias({
        entries: [
          { find: 'spacetime', replacement: 'spacetime/builds/spacetime.js' },
          { find: 'spacetime-holiday', replacement: 'spacetime-holiday/builds/spacetime-holiday.js' },
        ],
      }),
      resolve(),
      json(),
      commonjs(),
      babel({
        babelrc: false,
        presets: ['@babel/preset-env'],
      }),
      sizeCheck(),
    ],
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: `builds/${name}.js`,
        format: 'umd',
        sourcemap: true,
        name: 'compromiseDates',
        banner: banner,
      },
    ],
    plugins: [
      alias({
        entries: [
          { find: 'spacetime', replacement: 'spacetime/builds/spacetime.js' },
          { find: 'spacetime-holiday', replacement: 'spacetime-holiday/builds/spacetime-holiday.js' },
        ],
      }),
      resolve(),
      json(),
      commonjs(),
      babel({
        babelrc: false,
        presets: ['@babel/preset-env'],
      }),
      sizeCheck(),
    ],
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: `builds/${name}.min.js`,
        format: 'umd',
        name: 'compromiseDates',
      },
    ],
    plugins: [
      alias({
        entries: [
          { find: 'spacetime', replacement: 'spacetime/builds/spacetime.js' },
          { find: 'spacetime-holiday', replacement: 'spacetime-holiday/builds/spacetime-holiday.js' },
        ],
      }),
      resolve(),
      json(),
      commonjs(),
      babel({
        babelrc: false,
        presets: ['@babel/preset-env'],
      }),
      terser(),
      sizeCheck(),
    ],
  },
]
