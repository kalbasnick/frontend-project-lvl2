import readFile, { extractFormat, buildFullPathToFile } from './utils.js';
import parseData from './parsers.js';
import buildInnerTree from './innerTreeBuilder.js';
import format from './formatters/index.js';

export default (filePath1, filePath2, formatName = 'stylish') => {
  const fullPathToFile1 = buildFullPathToFile(filePath1);
  const fullPathToFile2 = buildFullPathToFile(filePath2);
  const data1 = parseData(readFile(fullPathToFile1), extractFormat(filePath1));
  const data2 = parseData(readFile(fullPathToFile2), extractFormat(filePath2));

  return format(buildInnerTree(data1, data2), formatName);
};
