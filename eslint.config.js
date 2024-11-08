import pluginVue from 'eslint-plugin-vue'
import stylistic from '@stylistic/eslint-plugin'

import tsEslint from 'typescript-eslint'
import typescriptParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'

export default [
  ...pluginVue.configs['flat/recommended'],
  ...tsEslint.configs['recommended'],
  {
    ignores: [ 'dist', '**/**.d.ts' ]
  },
  {
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: typescriptParser
      }
    },
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      'vue/require-default-prop': 'off',
      'vue/require-explicit-emits': 'off',
      'vue/no-deprecated-html-element-is': 'off',
      'vue/no-unused-vars': 'warn',
      'vue/multi-word-component-names': 'off',
      'vue/no-reserved-component-names': 'off',
      '@stylistic/array-bracket-spacing': [ 1, 'always' ],
      '@stylistic/indent': [ 'error', 2 ],
      '@stylistic/object-curly-spacing': [ 1, 'always' ],
      '@stylistic/quotes': [ 1, 'single' ],
      '@stylistic/quote-props': [ 1, 'consistent-as-needed' ],
      '@stylistic/no-trailing-spaces': 'error',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'comma-dangle': [ 'error', 'never' ],
      'semi': [ 'error', 'never' ],
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      'vue/max-attributes-per-line': [ 'error', {
        singleline: {
          max: 4
        },
        multiline: {
          max: 3
        }
      } ]
    }
  }
]