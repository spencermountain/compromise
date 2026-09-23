import terser from '@rollup/plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'

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
            expect: 45, // sizes in kb
            warn: 10, // acceptable change (+/-)
            throw: 25, // unacceptable change (+/-)
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
        plugins: [terser({ keep_classnames: true })],
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
        plugins: [terser({ keep_classnames: true })],
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
        plugins: [terser({ keep_classnames: true })],
      },
    ],
  },
]
