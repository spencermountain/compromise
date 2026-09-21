import terser from '@rollup/plugin-terser'
import sizeCheck from 'rollup-plugin-filesize-check'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: 'src/plugin.js',
  plugins: [nodeResolve()],
  output: [
    {
      file: 'builds/compromise-cmd-k.cjs',
      format: 'umd',
      name: 'compromiseCmdK',
      plugins: [sizeCheck()],
    },
    {
      file: 'builds/compromise-cmd-k.min.js',
      format: 'umd',
      name: 'compromiseCmdK',
      plugins: [terser({ keep_classnames: true }), sizeCheck()],
    },
    {
      file: 'builds/compromise-cmd-k.mjs',
      format: 'esm',
      plugins: [terser({ keep_classnames: true }), sizeCheck()],
    },
  ],
}
