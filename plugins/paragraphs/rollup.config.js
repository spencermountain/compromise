import terser from '@rollup/plugin-terser'
import sizeCheck from 'rollup-plugin-filesize-check'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: 'src/plugin.js',
  plugins: [nodeResolve()],
  output: [
    {
      file: 'builds/compromise-paragraphs.cjs',
      format: 'umd',
      name: 'compromiseParagraphs',
      plugins: [sizeCheck()],
    },
    {
      file: 'builds/compromise-paragraphs.min.js',
      format: 'umd',
      name: 'compromiseParagraphs',
      plugins: [terser({ keep_classnames: true }), sizeCheck()],
    },
    {
      file: 'builds/compromise-paragraphs.mjs',
      format: 'esm',
      plugins: [terser({ keep_classnames: true }), sizeCheck()],
    },
  ],
}
