import program from 'commander';
import genDiff from './src/generateDifference.js';
import parseFilepath from './src/parsers.js';

const stylish = (arg1, arg2) => genDiff(arg1, arg2, 'stylish');
const plain = (arg1, arg2) => genDiff(arg1, arg2, 'plain');

export default program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    if (options.format === 'plain') {
      return console.log(plain(parseFilepath(filepath1), parseFilepath(filepath2)));
    }
    return console.log(stylish(parseFilepath(filepath1), parseFilepath(filepath2)));
  });
