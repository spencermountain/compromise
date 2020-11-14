import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import babel from "rollup-plugin-babel";

import { version } from "./package.json";

const name = "compromise-match2";
const banner = `/* ${name} ${version} GPLv3 */`;

export default [
  {
    input: "src/index.js",
    output: [
      {
        file: `dist/${name}.js`,
        format: "umd",
        sourcemap: true,
        name: "compromiseMatch2",
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
        file: `dist/${name}.mjs`,
        format: "esm",
        name: "compromiseMatch2",
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
        file: `dist/${name}.min.js`,
        format: "umd",
        name: "compromiseMatch2",
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
];
