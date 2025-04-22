const { default: babelJest } = require('babel-jest');

module.exports = babelJest.createTransformer({
  presets: ['next/babel'],
});
