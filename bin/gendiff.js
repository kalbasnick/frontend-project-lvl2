#!/usr/bin/env node
import program from 'commander';
import runGenDiff from '../src/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    switch (options.format) {
      case 'plain':
        return console.log(runGenDiff(filepath1, filepath2, 'plain'));
      case 'json':
        return console.log(runGenDiff(filepath1, filepath2, 'json'));
      case 'stylish':
      default:
        return console.log(runGenDiff(filepath1, filepath2, 'stylish'));
    }
  })
  .allowUnknownOption()
  .parse();
