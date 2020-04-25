import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'
import alias from '@rollup/plugin-alias'
import sizeCheck from 'rollup-plugin-filesize-check'

import { version } from './package.json'
console.log('\n 📦  - running rollup..\n')

const banner = '/* compromise ' + version + ' MIT */'
const noop = __dirname + '/scripts/build/no-ops/_function'
const noobj = __dirname + '/scripts/build/no-ops/_object'

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
          { find: './data/conjugations', replacement: noobj },
          { find: './data/plurals', replacement: noobj },
          { find: './data/misc', replacement: noobj },
          { find: '../transforms/conjugate', replacement: noop },
          { find: '../transforms/adjectives', replacement: noop },
          { find: '../transforms/toPlural', replacement: noop },
          { find: '../transforms/toSingular', replacement: noop },
          { find: '../transforms/toInfinitive', replacement: noop },
          { find: './_data', replacement: noobj },
          { find: '../02-tagger', replacement: __dirname + '/src/02-tagger/tiny' },
          { find: 'efrt-unpack', replacement: noop },
        ],
      }),
      terser(),
      sizeCheck({ expect: 82, warn: 5 }),
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
      sizeCheck({ expect: 330, warn: 10 }),
    ],
  },
  {
    input: 'src/index.js',
    output: [{ banner: banner, file: 'builds/compromise.js', format: 'umd', sourcemap: false, name: 'nlp' }],
    plugins: [
      resolve(),
      json(),
      commonjs(),
      babel({
        babelrc: false,
        presets: ['@babel/preset-env'],
      }),
      sizeCheck({ expect: 351, warn: 10 }),
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
      sizeCheck({ expect: 173, warn: 10 }),
    ],
  },
]
