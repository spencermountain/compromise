import terser from '@rollup/plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import sizeCheck from 'rollup-plugin-filesize-check'

const terserOpts = { keep_classnames: true, compress: { passes: 2 } }
const modernTerserOpts = {
  ...terserOpts,
  ecma: 2022,
  // Keep the public entry point constructible when other functions become arrows.
  keep_fnames: /^nlp$/,
  compress: { passes: 2, unsafe_arrows: true },
}

export default [
  // === One ==
  {
    input: 'src/one.js',
    plugins: [nodeResolve()],
    output: [
      {
        file: 'builds/one/compromise-one.cjs',
        format: 'umd',
        name: 'nlp',
        plugins: [
          terser(modernTerserOpts),
          sizeCheck({
            expect: 92,
            warn: 5, // acceptable (+/-)
            throw: 25, // unacceptable (+/-)
          }),
        ],
      },
      {
        file: 'builds/one/compromise-one.mjs',
        format: 'esm',
        plugins: [terser(modernTerserOpts)],
      },
    ],
  },

  // === Two ==
  {
    input: 'src/two.js',
    plugins: [nodeResolve()],
    output: [
      {
        file: 'builds/two/compromise-two.cjs',
        format: 'umd',
        name: 'nlp',
        plugins: [
          terser(modernTerserOpts),
          sizeCheck({
            expect: 273,
            warn: 5, // acceptable (+/-)
            throw: 25, // unacceptable (+/-)
          }),
        ],
      },
      {
        file: 'builds/two/compromise-two.mjs',
        format: 'esm',
        plugins: [terser(modernTerserOpts)],
      },
    ],
  },

  // === Three ==
  {
    input: 'src/three.js',
    plugins: [nodeResolve()],
    output: [
      {
        file: 'builds/compromise.js',
        format: 'umd',
        name: 'nlp',
        plugins: [terser(terserOpts)],
      },
      {
        file: 'builds/three/compromise-three.cjs',
        format: 'umd',
        name: 'nlp',
        plugins: [
          terser(modernTerserOpts),
          sizeCheck({
            expect: 342,
            warn: 4, // acceptable (+/-)
            throw: 50, // unacceptable (+/-)
          }),
        ],
      },
      {
        file: 'builds/three/compromise-three.mjs',
        format: 'esm',
        plugins: [terser(terserOpts)],
      },
    ],
  },
]
