import terser from '@rollup/plugin-terser'
import sizeCheck from 'rollup-plugin-filesize-check'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: 'src/plugin.js',
  plugins: [nodeResolve()],
  output: [
    {
      file: 'builds/compromise-speech.cjs',
      format: 'umd',
      name: 'compromiseSpeech',
      plugins: [sizeCheck()],
    },
    {
      file: 'builds/compromise-speech.min.js',
      format: 'umd',
      name: 'compromiseSpeech',
      plugins: [terser({ keep_classnames: true }), sizeCheck()],
    },
    {
      file: 'builds/compromise-speech.mjs',
      format: 'esm',
      plugins: [terser({ keep_classnames: true }), sizeCheck()],
    },
  ],
}
