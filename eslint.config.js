import * as regexpPlugin from "eslint-plugin-regexp"

export default [
  regexpPlugin.configs["flat/recommended"],

  {
    // "ignorePatterns": ["**/builds/*"],
    "ignores": ["**/builds/*"],
    "rules": {
      "comma-dangle": [1, "only-multiline"],
      "quotes": [0, "single", "avoid-escape"],
      "max-nested-callbacks": [1, 4],
      "max-params": [1, 5],
      "consistent-return": 1,
      "no-bitwise": 1,
      "no-empty": 1,
      "no-console": 1,
      "no-duplicate-imports": 1,
      "no-eval": 2,
      "no-implied-eval": 2,
      "no-mixed-operators": 2,
      "no-multi-assign": 2,
      "no-nested-ternary": 1,
      "no-prototype-builtins": 0,
      "no-self-compare": 1,
      "no-sequences": 1,
      "no-shadow": 2,
      "no-unmodified-loop-condition": 1,
      "no-use-before-define": 1,
      "prefer-const": 1,
      "radix": 1,
      "no-unused-vars": 1,
      "regexp/prefer-d": 0,
      "regexp/prefer-w": 0,
      "regexp/prefer-range": 0,
      "regexp/no-unused-capturing-group": 0,
      "eslint-comments/no-unused-disable": 0
    }
  },
]
