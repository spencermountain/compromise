import * as regexpPlugin from 'eslint-plugin-regexp'

export default [
  { ignores: ['**/builds/*', '**/scratch.js', '**/rollup.config.js'] },
  regexpPlugin.configs['flat/recommended'],
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        // Node globals
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        // client-side globals
        self: 'readonly',
        window: 'readonly',
        document: 'readonly',
        fetch: 'readonly',
        URL: 'readonly',
        Event: 'readonly',
      }
    },
    // custom rules setup
    rules: {
      'no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],
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
      'no-duplicate-imports': 'warn',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-multi-assign': 'error',
      'no-self-compare': 'warn',
      'no-sequences': 'warn',
      radix: 'warn',
      'no-shadow': 'error',
      'no-unmodified-loop-condition': 'warn',
      'no-use-before-define': 'warn',
      'no-irregular-whitespace': 'warn',
      'no-console': 'warn',
      'no-mixed-operators': 'off',
      'no-prototype-builtins': 'off',
      'prefer-const': 'warn',
      'regexp/no-super-linear-move': 'warn',
      'regexp/prefer-d': 'off',
      'regexp/prefer-range': 'off',
      'regexp/no-unused-capturing-group': 'off',
    },
  },
  {
    files: ['tests/**/*.test.js'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [{
          group: ['**/src/one.js', '**/src/two.js', '**/src/three.js', '**/builds/**'],
          message: 'Import the tier’s tests/_lib.js so TESTENV=prod exercises the build.',
        }],
      }],
    },
  }
]
