import terser from '@rollup/plugin-terser'
import sizeCheck from 'rollup-plugin-filesize-check'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: 'src/plugin.js',
  plugins: [nodeResolve()],
  output: [
    {
      file: 'builds/compromise-wikipedia.cjs',
      format: 'umd',
      name: 'compromiseWikipedia',
      plugins: [sizeCheck()],
    },
    {
      file: 'builds/compromise-wikipedia.min.js',
      format: 'umd',
      name: 'compromiseWikipedia',
      plugins: [terser({ keep_classnames: true }), sizeCheck()],
    },
    {
      file: 'builds/compromise-wikipedia.mjs',
      format: 'esm',
      plugins: [terser({ keep_classnames: true }), sizeCheck()],
    },
  ],
}
