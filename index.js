import fs from 'fs';
import program from 'commander';
import showDifference from './src/showDifference.js';

export default program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const getFixturePath = (filepath) => JSON.parse(fs.readFileSync(filepath));
    console.log(showDifference(getFixturePath(filepath1), getFixturePath(filepath2)));
  })
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format');
