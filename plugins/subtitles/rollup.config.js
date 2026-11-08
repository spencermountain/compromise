import terser from '@rollup/plugin-terser'
import sizeCheck from 'rollup-plugin-filesize-check'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: 'src/plugin.js',
  plugins: [nodeResolve()],
  output: [
    {
      file: 'builds/compromise-subtitle.cjs',
      format: 'umd',
      name: 'compromiseSubtitle',
      plugins: [],
    },
    {
      file: 'builds/compromise-subtitle.min.js',
      format: 'umd',
      name: 'compromiseSubtitle',
      plugins: [
        terser({ keep_classnames: true }),
        sizeCheck({
          expect: 21,
          warn: 5, // acceptable (+/-)
          throw: 10, // unacceptable (+/-)
        }),
      ],
    },
    {
      file: 'builds/compromise-subtitle.mjs',
      format: 'esm',
      plugins: [terser({ keep_classnames: true })],
    },
  ],
}
