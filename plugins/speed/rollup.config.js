import terser from '@rollup/plugin-terser'
import sizeCheck from 'rollup-plugin-filesize-check'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: 'src/plugin.js',
  plugins: [nodeResolve()],
  output: [
    {
      file: 'builds/compromise-speed.cjs',
      format: 'umd',
      name: 'compromiseSpeed',
      plugins: [sizeCheck()],
    },
    {
      file: 'builds/compromise-speed.min.js',
      format: 'umd',
      name: 'compromiseSpeed',
      plugins: [terser({ keep_classnames: true }), sizeCheck()],
    },
    {
      file: 'builds/compromise-speed.mjs',
      format: 'esm',
      plugins: [terser({ keep_classnames: true }), sizeCheck()],
    },
  ],
}
