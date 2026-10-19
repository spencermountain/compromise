import terser from '@rollup/plugin-terser'
import sizeCheck from 'rollup-plugin-filesize-check'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: 'src/plugin.js',
  plugins: [nodeResolve()],
  output: [
    {
      file: 'builds/compromise-html.cjs',
      format: 'umd',
      name: 'compromiseHtml',
    },
    {
      file: 'builds/compromise-html.mjs',
      format: 'esm',
      plugins: [terser()],
    },
    {
      file: 'builds/compromise-html.min.js',
      format: 'umd',
      name: 'compromiseHtml',
      plugins: [
        terser(),
        sizeCheck({
          expect: 214, // Includes HTML parsing and serialization.
          warn: 5,
          throw: 10,
        }),
      ],
    },
  ],
}
