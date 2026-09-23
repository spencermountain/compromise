import terser from '@rollup/plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import sizeCheck from 'rollup-plugin-filesize-check'
// Terser infers module mode from the output format.
// Size limits are enforced by scripts/filesize.js in CI.
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
          terser({ keep_classnames: true }),
          sizeCheck({
            expect: 90,
            warn: 10, // acceptable (+/-)
            throw: 25, // unacceptable (+/-)
          }),
        ],
      },
      {
        file: 'builds/one/compromise-one.mjs',
        format: 'esm',
        plugins: [terser({ keep_classnames: true })],
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
          terser({ keep_classnames: true }),
          sizeCheck({
            expect: 300,
            warn: 5, // acceptable (+/-)
            throw: 25, // unacceptable (+/-)
          }),
        ],
      },
      {
        file: 'builds/two/compromise-two.mjs',
        format: 'esm',
        plugins: [terser({ keep_classnames: true })],
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
        plugins: [
          terser({ keep_classnames: true }),
        ],
      },
      {
        file: 'builds/three/compromise-three.cjs',
        format: 'umd',
        name: 'nlp',
        plugins: [terser({ keep_classnames: true })],
      },
      {
        file: 'builds/three/compromise-three.mjs',
        format: 'esm',
        plugins: [
          terser({ keep_classnames: true }),
          sizeCheck({
            expect: 356,
            warn: 3, // acceptable (+/-)
            throw: 50, // unacceptable (+/-)
          }),
        ],
      },
    ],
  },
]
