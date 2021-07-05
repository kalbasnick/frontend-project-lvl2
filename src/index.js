import genDiff from './generateDifference.js';
import selectFormat from './formatters/index.js';
import parseFilepath from './parsers.js';

export default (filepath1, filepath2, formatName = 'stylish') => {
  const resultOfComparison = genDiff(parseFilepath(filepath1), parseFilepath(filepath2));
  return selectFormat(resultOfComparison, formatName);
};
