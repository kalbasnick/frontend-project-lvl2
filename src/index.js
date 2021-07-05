import genDiff from './generateDifference.js';
import selectFormat from './formatters/index.js';
import parseFilepath from './parsers.js';

export default (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = parseFilepath(filepath1);
  const file2 = parseFilepath(filepath2);
  const result = genDiff(file1, file2);
  return selectFormat(result, formatName);
};
