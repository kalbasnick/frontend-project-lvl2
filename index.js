import fs from 'fs';
import path from 'path';
import program from 'commander';
import showDifference from './src/showDifference.js';

export default program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const getConvertedPath = (filepath) => JSON.parse(fs.readFileSync(path.resolve(filepath), 'utf-8'));
    console.log(showDifference(getConvertedPath(filepath1), getConvertedPath(filepath2)));
  })
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format');
