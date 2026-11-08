import terser from '@rollup/plugin-terser'
import sizeCheck from 'rollup-plugin-filesize-check'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: 'src/plugin.js',
  plugins: [nodeResolve()],
  output: [
    {
      file: 'builds/compromise-unist.cjs',
      format: 'umd',
      name: 'compromiseUnist',
      plugins: [],
    },
    {
      file: 'builds/compromise-unist.min.js',
      format: 'umd',
      name: 'compromiseUnist',
      plugins: [
        terser({ keep_classnames: true }),
        sizeCheck({
          expect: 2,
          warn: 5, // acceptable (+/-)
          throw: 10, // unacceptable (+/-)
        }),
      ],
    },
    {
      file: 'builds/compromise-unist.mjs',
      format: 'esm',
      plugins: [terser({ keep_classnames: true })],
    },
  ],
}
