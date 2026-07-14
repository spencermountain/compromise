import { defineConfig, globalIgnores } from "eslint/config"
import * as regexpPlugin from "eslint-plugin-regexp"

export default defineConfig([
  globalIgnores([
    "**/builds/**",
    "**/scratch.js",
    "scripts/**",
    "*.ts",
    "_old/**",
    "_tests/**",
  ]),

  {
    name: "compromise",
    files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
    extends: [regexpPlugin.configs["flat/recommended"]],
    linterOptions: {
      reportUnusedDisableDirectives: "off",
    },
    rules: {
      "comma-dangle": ["warn", "only-multiline"],
      quotes: ["off", "single", "avoid-escape"],
      "max-nested-callbacks": ["warn", 4],
      "max-params": ["warn", 5],
      "consistent-return": "warn",
      "no-bitwise": "warn",
      "no-empty": "warn",
      "no-console": "warn",
      "no-duplicate-imports": "warn",
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-mixed-operators": "error",
      "no-multi-assign": "error",
      "no-nested-ternary": "warn",
      "no-prototype-builtins": "off",
      "no-self-compare": "warn",
      "no-sequences": "warn",
      "no-shadow": "error",
      "no-unmodified-loop-condition": "warn",
      "no-use-before-define": "warn",
      "prefer-const": "off",
      radix: "warn",
      "no-unused-vars": "warn",
      "regexp/prefer-d": "off",
      "regexp/prefer-w": "off",
      "regexp/prefer-range": "off",
      "regexp/no-unused-capturing-group": "off",
    },
  },
])
