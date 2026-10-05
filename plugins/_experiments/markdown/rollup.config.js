import terser from '@rollup/plugin-terser'
import sizeCheck from 'rollup-plugin-filesize-check'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'src/plugin.js',
  plugins: [commonjs(), nodeResolve()],
  output: [
    {
      file: 'builds/compromise-markup.min.js',
      format: 'umd',
      name: 'compromiseMarkup',
      plugins: [terser({ keep_classnames: true }), sizeCheck()],
    },
  ],
}
