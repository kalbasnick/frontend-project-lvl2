import program from 'commander';
import showDifference from './src/showDifference.js';
import parseFilepath from './src/parsers.js';

export default program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(showDifference(parseFilepath(filepath1), parseFilepath(filepath2)));
  })
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format');
