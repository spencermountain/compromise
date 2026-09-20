const ok = 'readonly'

export default [
  { ignores: ['**/builds/*'] },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Node globals
        console: ok,
        process: ok,
        Buffer: ok,
        setTimeout: ok,
        clearTimeout: ok,
        setInterval: ok,
        clearInterval: ok,
        __dirname: ok,
        __filename: ok,
        // client-side globals
        self: ok,
        window: ok,
        document: ok,
        navigator: ok,
        fetch: ok,
        URL: ok,
        Event: ok,
      }
    },
    // custom rules setup
    rules: {
      'no-unused-vars': 'warn',
      'no-empty': 'warn',
      'no-undef': 'error',
      'no-unreachable': 'error',
      'no-dupe-keys': 'error',
      'constructor-super': 'error',
      'no-this-before-super': 'error',

      'comma-dangle': ['warn', 'only-multiline'],
      'max-nested-callbacks': ['warn', 4],
      'max-params': ['warn', 5],
      'consistent-return': 'warn',
      'no-nested-ternary': 'warn',
      'no-bitwise': 'warn',
      'no-console': 'warn',
      'no-duplicate-imports': 'warn',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-mixed-operators': 'error',
      'no-multi-assign': 'error',
      'no-self-compare': 'warn',
      'no-sequences': 'warn',
      'no-shadow': 'error',
      'no-unmodified-loop-condition': 'warn',
      'no-use-before-define': 'warn',
      'prefer-const': 'off',
      radix: 'warn',
    },
  },
]
