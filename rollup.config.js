import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import { terser } from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import alias from '@rollup/plugin-alias'

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: 'builds/compromise-tokenize.js',
        format: 'umd',
        sourcemap: true,
        name: 'nlp',
      },
    ],
    plugins: [
      json(),
      commonjs(),
      babel({
        babelrc: false,
        presets: ['@babel/preset-env'],
      }),
      alias({
        entries: [
          { find: './_data', replacement: './_data-empty' },
          { find: '../02-tagger', replacement: __dirname + '/_noop' },
          { find: 'efrt-unpack', replacement: __dirname + '/_noop' },
        ],
      }),
      terser(),
    ],
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: 'builds/compromise.mjs',
        format: 'esm',
      },
    ],
    plugins: [
      resolve(),
      json(),
      commonjs(),
      babel({
        babelrc: false,
        presets: ['@babel/preset-env'],
      }),
    ],
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: 'builds/compromise.js',
        format: 'umd',
        sourcemap: true,
        name: 'nlp',
      },
    ],
    plugins: [
      resolve(),
      json(),
      commonjs(),
      babel({
        babelrc: false,
        presets: ['@babel/preset-env'],
      }),
    ],
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: 'builds/compromise.min.js',
        format: 'umd',
        name: 'nlp',
      },
    ],
    plugins: [
      resolve(),
      json(),
      commonjs(),
      babel({
        babelrc: false,
        presets: ['@babel/preset-env'],
      }),
      terser(),
    ],
  },
]
