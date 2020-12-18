import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import { terser } from "rollup-plugin-terser"
import babel from "rollup-plugin-babel"

import { version } from "./package.json"

const name = "compromise-strict"
const banner = `/* ${name} ${version} GPLv3 */`

export default [
  {
    input: "src/index.js",
    output: [
      {
        file: `builds/${name}.js`,
        format: "umd",
        sourcemap: true,
        name: "compromiseStrict",
        banner,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      babel({
        babelrc: false,
        presets: ["@babel/preset-env"],
      }),
    ],
  },
  {
    input: "src/index.js",
    output: [
      {
        file: `builds/${name}.mjs`,
        format: "esm",
        name: "compromiseStrict",
        banner,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      babel({
        babelrc: false,
        presets: ["@babel/preset-env"],
      }),
    ],
  },
  {
    input: "src/index.js",
    output: [
      {
        file: `builds/${name}.min.js`,
        format: "umd",
        name: "compromiseStrict",
        banner,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      babel({
        babelrc: false,
        presets: ["@babel/preset-env"],
      }),
      terser(),
    ],
  },
]
