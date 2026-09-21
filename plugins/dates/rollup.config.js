import terser from '@rollup/plugin-terser'
import sizeCheck from 'rollup-plugin-filesize-check'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: 'src/plugin.js',
  plugins: [nodeResolve()],
  output: [
    {
      file: 'builds/compromise-dates.cjs',
      format: 'umd',
      name: 'compromiseDates',
      plugins: [sizeCheck()],
    },
    {
      file: 'builds/compromise-dates.min.js',
      format: 'umd',
      name: 'compromiseDates',
      plugins: [terser({ keep_classnames: true }), sizeCheck()],
    },
    {
      file: 'builds/compromise-dates.mjs',
      format: 'esm',
      plugins: [terser({ keep_classnames: true }), sizeCheck()],
    },
  ],
}
