import program from 'commander';
import genDiff from './generateDifference.js';
import parseFilepath from './parsers.js';

const stylish = (arg1, arg2) => genDiff(arg1, arg2, 'stylish');
const plain = (arg1, arg2) => genDiff(arg1, arg2, 'plain');
const json = (arg1, arg2) => genDiff(arg1, arg2, 'json');

export default () => program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    switch (options.format) {
      case 'plain':
        return console.log(plain(parseFilepath(filepath1), parseFilepath(filepath2)));
      case 'json':
        return console.log(json(parseFilepath(filepath1), parseFilepath(filepath2)));
      case 'stylish':
      default:
        return console.log(stylish(parseFilepath(filepath1), parseFilepath(filepath2)));
    }
  })
  .allowUnknownOption()
  .parse();
