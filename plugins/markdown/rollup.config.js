import terser from '@rollup/plugin-terser'
import sizeCheck from 'rollup-plugin-filesize-check'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import format from './scripts/rollup-format.js'

export default {
  input: 'src/plugin.js',
  plugins: [nodeResolve(), format()],
  output: [
    {
      file: 'builds/compromise-markdown.cjs',
      format: 'umd',
      name: 'compromiseMarkdown',
      plugins: [],
    },
    {
      file: 'builds/compromise-markdown.mjs',
      format: 'esm',
      plugins: [terser()],
    },
    {
      file: 'builds/compromise-markdown.min.js',
      format: 'umd',
      name: 'compromiseMarkdown',
      plugins: [
        terser(),
        sizeCheck({
          expect: 149, // includes the Markdown, GFM, and frontmatter parsers
          warn: 5, // acceptable (+/-)
          throw: 10, // unacceptable (+/-)
        }),
      ],
    },
  ],
}
