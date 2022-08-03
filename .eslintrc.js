module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jest/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  rules: {
    indent: ['error', 2],
    'no-console': 'off',
    'sort-class-members/sort-class-members': [
      2,
      {
        order: [
          '[static-properties]',
          '[static-methods]',
          '[properties]',
          '[conventional-private-properties]',
          'constructor',
          '[methods]',
          '[conventional-private-methods]',
        ],
        accessorPairPositioning: 'getThenSet',
      },
    ],
  },
  settings: {
    'import/resolver': 'webpack',
  },
  parser: 'babel-eslint',
  plugins: ['react', 'jest', 'sort-class-members'],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
};
