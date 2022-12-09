module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['standard-with-typescript', 'plugin:@typescript-eslint/recommended'],
  overrides: [],
  plugins: [
    '@typescript-eslint/eslint-plugin',
  ],
  root: true,
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'workspaces/server/tsconfig.json',
  },
  ignorePatterns: [
    '.eslintrc.js',
    'src/public/**',
    'dist/**',
    '**/*.e2e-spec.ts'
  ],
  rules: {
    '@typescript-eslint/array-type': 0,
    '@typescript-eslint/dot-notation': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/naming-convention': 0,
    '@typescript-eslint/no-extraneous-class': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/strict-boolean-expressions': 0,
    'no-unused-expressions': 0,
    '@typescript-eslint/no-unused-expressions': 0,
    camelcase: 0,
    '@typescript-eslint/indent': [2, 2],
    'n/no-path-concat': 0,
    '@typescript-eslint/no-unused-vars': [0, {
      argsIgnorePattern: '^_',
      args: 'none'
    }],
    'no-unused-vars': [0, {
      argsIgnorePattern: '^_',
      args: 'none'
    }],
    'no-useless-constructor': 0,
    'object-curly-newline': ['error', {
      ObjectExpression: { multiline: true, minProperties: 3 },
      ObjectPattern: { multiline: true, minProperties: 3 },
      ImportDeclaration: { multiline: true, minProperties: 3 },
      ExportDeclaration: { multiline: true, minProperties: 3 }
    }],
    eqeqeq: 2,
    'prefer-template': 2,
    quotes: [2, 'single'],
    '@typescript-eslint/semi': [2, 'always'],
    'semi': [2, 'always'],
    'semi-style': [2, 'last'],
    'eol-last': 2,
    'comma-dangle': [2, 'always-multiline'],
    '@typescript-eslint/comma-dangle': [2, 'always-multiline'],
    'no-multi-spaces': 2,
    'object-shorthand': [2, 'methods'],
    'keyword-spacing': [2],
    'no-var': 2,
    'object-curly-spacing': [2, 'always'],
    'object-property-newline': [2, {
      allowMultiplePropertiesPerLine: true
    }],
    'array-bracket-newline': [2, { minItems: 2 }],
    'array-bracket-spacing': [2, 'never'],
    'array-element-newline': [2, { minItems: 2 }],
    'space-before-function-paren': [2, {named: 'never'}],
    '@typescript-eslint/space-before-function-paren': [2, {
      named: 'never',
    }],
    'no-unused-expressions': 0,
    'max-len': [2, { code: 120 }]
  }
}
