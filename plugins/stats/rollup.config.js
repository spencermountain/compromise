import terser from '@rollup/plugin-terser'
import sizeCheck from 'rollup-plugin-filesize-check'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: 'src/plugin.js',
  plugins: [nodeResolve()],
  output: [
    {
      file: 'builds/compromise-stats.cjs',
      format: 'umd',
      name: 'compromiseStats',
      plugins: [sizeCheck()],
    },
    {
      file: 'builds/compromise-stats.min.js',
      format: 'umd',
      name: 'compromiseStats',
      plugins: [terser({ keep_classnames: true }), sizeCheck()],
    },
    {
      file: 'builds/compromise-stats.mjs',
      format: 'esm',
      plugins: [terser({ keep_classnames: true }), sizeCheck()],
    },
  ],
}
