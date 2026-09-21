import terser from '@rollup/plugin-terser'
import sizeCheck from 'rollup-plugin-filesize-check'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: 'src/plugin.js',
  plugins: [nodeResolve()],
  output: [
    {
      file: 'builds/compromise-payload.cjs',
      format: 'umd',
      name: 'compromisePayload',
      plugins: [sizeCheck()],
    },
    {
      file: 'builds/compromise-payload.min.js',
      format: 'umd',
      name: 'compromisePayload',
      plugins: [terser({ keep_classnames: true }), sizeCheck()],
    },
    {
      file: 'builds/compromise-payload.mjs',
      format: 'esm',
      plugins: [terser({ keep_classnames: true }), sizeCheck()],
    },
  ],
}
