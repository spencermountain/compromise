import terser from '@rollup/plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import sizeCheck from 'rollup-plugin-filesize-check'

const createBuild = (tier, output) => ({
  input: `src/${tier}.js`,
  plugins: [nodeResolve()],
  output: output.map(options => ({
    ...options,
    // Terser infers module mode from the output format.
    // Size limits are enforced by scripts/filesize.js in CI.
    plugins: [terser({ keep_classnames: true }), sizeCheck()],
  })),
})

export default [
  // === One ==
  createBuild('one', [
    { file: 'builds/one/compromise-one.cjs', format: 'umd', name: 'nlp' },
    { file: 'builds/one/compromise-one.mjs', format: 'esm' },
  ]),

  // === Two ==
  createBuild('two', [
    { file: 'builds/two/compromise-two.cjs', format: 'umd', name: 'nlp' },
    { file: 'builds/two/compromise-two.mjs', format: 'esm' },
  ]),

  // === Three ==
  createBuild('three', [
    { file: 'builds/compromise.js', format: 'umd', name: 'nlp' },
    { file: 'builds/three/compromise-three.cjs', format: 'umd', name: 'nlp' },
    { file: 'builds/three/compromise-three.mjs', format: 'esm' },
  ]),
]
