import loveConfig from 'eslint-config-love'
import prettierConfig from 'eslint-config-prettier'
import prettier from 'eslint-plugin-prettier'

export default [
  loveConfig,
  { ignores: ['node_modules', 'jest.config.js', 'jest-integration-config.js', 'jest-unit-config.js', 'eslint.config.mjs', 'dist', '.build', '.esbuild', 'coverage', '**/plopfile.js'] },
  { files: ['**/*.js', '**/*.ts', '**/*.tsx'] },
  { plugins: { prettier } },
  {
    rules: {
      ...loveConfig.rules,
      complexity: ['error', { max: 15 }],
      'arrow-body-style': 'off',
      'prettier/prettier': 'error',
      'import/export': 'off',
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'logical-assignment-operators': 'off',
      'max-depth': ['error', { max: 6 }],
      'no-magic-numbers': 'off',
      'no-multi-spaces': ['error'],
      'no-new-wrappers': 'off',
      'no-throw-literal': 'off',
      'object-curly-spacing': ['error', 'always'],
      'prefer-destructuring': 'off',
      'space-before-function-paren': ['error', 'never'],
      //'@typescript-eslint/no-unsafe-type-assertion': 'off', //Remover
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/consistent-type-exports': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/class-methods-use-this': 'off',
      '@typescript-eslint/max-params': 'off',
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/no-import-type-side-effects': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/only-throw-error': 'off',
      '@typescript-eslint/prefer-destructuring': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/return-await': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: true
          }
        }
      ]
    }
  },
  prettierConfig
]
