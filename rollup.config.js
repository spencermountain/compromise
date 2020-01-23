import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'
import alias from '@rollup/plugin-alias'
import { version } from './package.json'
const banner = '/* spencermountain/compromise ' + version + ' MIT */'

export default [
  {
    input: 'src/index.js',
    output: [{ file: 'builds/compromise-tokenize.js', format: 'umd', sourcemap: false, name: 'nlp' }],
    plugins: [
      json(),
      commonjs(),
      babel({
        babelrc: false,
        presets: ['@babel/preset-env'],
      }),
      alias({
        //remove a bunch of imports with no-ops
        entries: [
          { find: './_data', replacement: __dirname + '/scripts/no-ops/_object' },
          { find: '../02-tagger', replacement: __dirname + '/scripts/no-ops/_function' },
          { find: 'efrt-unpack', replacement: __dirname + '/scripts/no-ops/_function' },
        ],
      }),
      terser(),
    ],
  },
  {
    input: 'src/index.js',
    output: [{ banner: banner, file: 'builds/compromise.mjs', format: 'esm' }],
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
    output: [{ banner: banner, file: 'builds/compromise.js', format: 'umd', sourcemap: true, name: 'nlp' }],
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
    output: [{ file: 'builds/compromise.min.js', format: 'umd', name: 'nlp' }],
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
