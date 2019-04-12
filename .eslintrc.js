'use strict';

module.exports = {
  root: true,
  extends: 'airbnb-base',
  parserOptions: { ecmaVersion: 2019, sourceType: 'script' },
  env: { es6: true, browser: true },
  rules: {
    'no-console': ['warn', {
      allow: ['error', 'warn'],
    }],
  },
};