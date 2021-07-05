import genDiff from './generateDifference.js';
import selectFormat from './formatters/index.js';

export default (filepath1, filepath2, formatName = 'stylish') => {
  const result = genDiff(filepath1, filepath2);
  return selectFormat(result, formatName);
};
