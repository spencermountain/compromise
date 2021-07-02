import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'
import sizeCheck from 'rollup-plugin-filesize-check'

// const banner = '/* compromise ' + version + ' MIT */'
// const noop = __dirname + '/scripts/build/no-ops/_function'
// const noobj = __dirname + '/scripts/build/no-ops/_object'

// const tokenizeAliasOptions = {
//   //remove a bunch of imports with no-ops
//   entries: [
//     { find: './data/conjugations', replacement: noobj },
//     { find: './data/plurals', replacement: noobj },
//     { find: './data/misc', replacement: noobj },
//     { find: '../transforms/conjugate', replacement: noop },
//     { find: '../transforms/adjectives', replacement: noop },
//     { find: '../transforms/toPlural', replacement: noop },
//     { find: '../transforms/toSingular', replacement: noop },
//     { find: '../transforms/toInfinitive', replacement: noop },
//     { find: './_data', replacement: noobj },
//     { find: '../02-tagger', replacement: __dirname + '/src/02-tagger/tiny' },
//     { find: 'efrt-unpack', replacement: noop },
//   ],
// }

export default [
  {
    input: 'src/index.js',
    output: [{ file: 'builds/compromise.min.js', format: 'umd', name: 'nlp' }],
    plugins: [
      babel({
        babelrc: false,
        presets: ['@babel/preset-env'],
      }),
      terser(),
      sizeCheck({ expect: 190, warn: 10 }),
    ],
  },
]
