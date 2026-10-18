import terser from '@rollup/plugin-terser'
import sizeCheck from 'rollup-plugin-filesize-check'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: 'src/plugin.js',
  plugins: [nodeResolve()],
  output: [
    {
      file: 'builds/compromise-dates.cjs',
      format: 'umd',
      name: 'compromiseDates',
      plugins: [],
    },
    {
      file: 'builds/compromise-dates.min.js',
      format: 'umd',
      name: 'compromiseDates',
      plugins: [
        terser({ keep_classnames: true }),
        sizeCheck({
          expect: 132,
          warn: 5, // acceptable (+/-)
          throw: 10, // unacceptable (+/-)
        }),
      ],
    },
    {
      file: 'builds/compromise-dates.mjs',
      format: 'esm',
      plugins: [terser({ keep_classnames: true })],
    },
  ],
}
