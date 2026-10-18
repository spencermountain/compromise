import terser from '@rollup/plugin-terser'
import sizeCheck from 'rollup-plugin-filesize-check'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { readFileSync } from 'node:fs'

const workerAsset = {
  name: 'speed-worker',
  generateBundle() {
    this.emitFile({
      type: 'asset',
      fileName: 'worker.js',
      source: readFileSync(new URL('./src/workerPool/pool/worker.js', import.meta.url), 'utf8'),
    })
  },
}

export default {
  input: 'src/plugin.js',
  plugins: [nodeResolve(), workerAsset],
  output: [
    {
      file: 'builds/compromise-speed.cjs',
      format: 'umd',
      name: 'compromiseSpeed',
      plugins: [],
    },
    {
      file: 'builds/compromise-speed.min.js',
      format: 'umd',
      name: 'compromiseSpeed',
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
      file: 'builds/compromise-speed.mjs',
      format: 'esm',
      plugins: [terser({ keep_classnames: true })],
    },
  ],
}
